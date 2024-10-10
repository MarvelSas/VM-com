export interface AuthResponseData {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  token: Token;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  roles: string;
  iat: number;
  exp: number;
}
