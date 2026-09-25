export interface loginRequest {
  email: string;
  password: string;
}

export interface registerRequest {
  email: string;
  password: string;
}

export interface user {
  uuid: string;
  email: string;
}

export interface userState {
  user: user | null;
  loading: boolean;
  error: any | null;
}
