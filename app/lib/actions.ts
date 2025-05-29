"use server";

import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import z from "zod";
import { doesEmailExist, storeUser } from "./data";

/**
 * Referenced registration logic from my planner project
 */
type RegisterState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string[];
  };
  success?: boolean;
};

const userRegisterschema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must include at least one special character"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach the error to this field
  });

export const register = async (
  prevState: RegisterState | undefined,
  formData: FormData
): Promise<RegisterState> => {
  console.log("begin action");
  const validatedFields = userRegisterschema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),

    // Learn: this still needs to be here unless zod would think it is blank and
    // errors: required would appear
    confirmPassword: formData.get("confirmPassword"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedFields.data;
  console.log("validation passed");
  try {
    // Check if user already exists
    const existingUser = await doesEmailExist(email);

    if (existingUser) {
      return {
        errors: { email: ["This email is already registered."] },
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await storeUser(email, hashedPassword);

    // Log new users in
    const redirectTo = formData.get("redirectTo") || "/";

    await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: redirectTo,
    });
    return { success: true };
  } catch (error) {
    if (isNextRedirectError(error)) {
      throw error;
    }

    console.error("Registration error:", error);
    return {
      errors: { general: ["Something went wrong. Please try again."] },
    };
  }
};

function isNextRedirectError(error: unknown): error is { digest: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string" &&
    error.digest.startsWith("NEXT_REDIRECT")
  );
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("redirectTo: " + formData.get("redirectTo"));
    console.log("redirect: " + formData.get("redirect"));
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
