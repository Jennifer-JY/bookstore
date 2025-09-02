export const redirect = jest.fn();

export const useSearchParams = jest.fn().mockReturnValue({
  get: jest.fn(),
});
