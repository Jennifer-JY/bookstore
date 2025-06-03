"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GuestLoginBtn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleGuest = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/guest-login", {
        method: "POST",
      });
      const data = await res.json();

      if (data && !data.success) {
        alert("Oops, something went wrong, please try again.");
        setLoading(false);
      }
      router.refresh();
      return;
    } catch (err) {
      console.error(err);
      alert("Oops, something went wrong, please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGuest}
      disabled={loading}
      className={`rounded-md w-40 h-8 ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#FF495C]"
      } text-white hover:cursor-pointer`}
    >
      {loading ? "Logging in..." : "Try it out as a guest"}
    </button>
  );
}
