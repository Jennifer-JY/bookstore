export const signIn = jest.fn();
export const signOut = jest.fn();
export const useSession = jest
  .fn()
  .mockReturnValue({ data: null, status: "unauthenticated" });
