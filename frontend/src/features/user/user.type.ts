export interface loginFormData {
    email: string;
    password: string;
}

export interface signupFormData {
    email: string;
    name: string;
    password: string;
}

export interface user {
    uuid: string;
    email: string;
    name: string;
    password: string;
}

export interface userState {
    users: user[];
    currentUser: user | null;
    loading: boolean;
    error: any | null;
}