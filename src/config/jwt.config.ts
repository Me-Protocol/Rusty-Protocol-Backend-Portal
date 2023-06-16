export const jwtConfigurations = {
  secret: 'topSecret51',
  signOptions: {
    expiresIn: /* 1 month */ 60 * 60 * 24 * 30,
  },
};

export interface JwtPayload {
  email: string;
  id: string;
  phone: string;
  username: string;
  device: string;
}
