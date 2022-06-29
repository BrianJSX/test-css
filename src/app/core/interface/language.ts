export interface LangugeResponse {
  status: string;
  error_code: number;
  error_type: string;
  message: string;
  data: DataLangugeResponse;
}

export interface DataLangugeResponse {
  token_type: string;
  access_token: string;
  expired_in: number;
}
