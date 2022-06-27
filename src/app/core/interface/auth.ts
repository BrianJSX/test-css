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

export interface UserInfoResponse {
  status: string;
  error_code: number;
  error_type: string;
  message: string;
  data: DataUserInfoResponse;
}

export interface DataUserInfoResponse {
  userId: number;
  username: string;
  enabled: number;
  bscAccount: boolean;
  isAdmin: boolean;
  countryCodes: Array<string>;
  userProfile: {
    fullName: string;
    email: string;
    appNotification: boolean;
    emailNotification: boolean;
    language: string;
    fontSize: string;
    countryCodes: [];
  };
  role: {
    code: string;
    name: string;
  };
  roleTypes: [];
  divisions: [];
}

export interface UserProfileResponse {
  status: string;
  error_code: number;
  error_type: string;
  message: string;
  data: DataUserProfileResponse;
}

export interface DataUserProfileResponse {
  id: number;
  fullName: string;
  email: string;
  appNotification: boolean;
  emailNotification: boolean;
  language: string;
  fontSize: string;
  role: {
    code: string;
    name: string ;
  };
  countryCodes: Array<string>;
}
