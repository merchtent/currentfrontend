export interface claim {
    name: string;
    value: string;
}

export interface userCredentials {
    email: string;
    password: string;
}

export interface newUserCredentials {
    email: string;
    password: string;
    genre: string;
    name: string;
}

export interface authenticationResponse {
    token: string;
    expiration: Date;
}