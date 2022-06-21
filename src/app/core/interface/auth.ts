export interface AuthResponse {
  status: string;
  error_code: number;
  error_type: string;
  message: string;
  data: {
    token_type: string;
    access_token: string;
    expired_in: number;
  };
}
