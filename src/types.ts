export interface Result {
  success: boolean;
  error?: string | Error;
  data?: string | null;
}
