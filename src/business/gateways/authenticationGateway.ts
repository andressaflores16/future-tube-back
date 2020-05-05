export interface AuthenticationGateway {
  generateToken(input: UserInfoToken): string;
  getUserInfoFromToken(token: string): UserInfoToken;
}

export interface UserInfoToken {
  userId: string;
}
