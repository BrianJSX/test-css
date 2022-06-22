export interface LoginResponse {
  status: string;
  error_code: number;
  error_type: string;
  message: string;
  data: DataLoginResponse;
}
export interface DataLoginResponse {
  token_type: string;
  access_token: string;
  expired_in: number;
}

export interface UserCountryResponse {
  status: string;
  error_code: number;
  error_type: string;
  message: string;
  data: Array<string>;
}
