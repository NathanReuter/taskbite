// types.ts
export interface User {
    email: string;
    firstName: string;
    lastName: string;
    token: string;
}

export interface LoginCredential {
    email: string;
    password: string;
}

export interface SignUpCredential {
    email: string;
    password: string;
    name: string;
}
