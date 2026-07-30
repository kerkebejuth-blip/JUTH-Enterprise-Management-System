import type { Token, UserContext } from '../domain';

/** Contract for issuing and validating enterprise IAM tokens. */
export interface TokenService {
  issueAccessToken(context: UserContext): Promise<Token>;
  issueRefreshToken(context: UserContext): Promise<Token>;
  validateToken(token: string): Promise<Token>;
}
