export interface IJwtPayload {
	jti?: number;
	sub: number;
	iat: number;
	exp: number;
	aud: string;
	iss: string;
	role?: string;
}

export interface IOauthResponse {
	email: string;
	firstName: string;
	lastName: string;
	accessToken: string;
}
