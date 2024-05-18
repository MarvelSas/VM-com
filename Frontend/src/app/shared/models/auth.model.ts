export interface AuthResponseData {
    timestamp: string;
    statusCode: number;
    status: string;
    message: string;
    data: {
      token: string;
    };
  }
  
  export interface JwtPayload {
    sub: string;
    roles: string;
    iat: number;
    exp: number;
  }