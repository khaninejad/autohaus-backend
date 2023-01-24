export interface ConfigurationOptions {
  secretKey: string;
  expiresIn: string;
}

export default (): ConfigurationOptions => ({
  secretKey: process.env.SECRETKEY || 'secret',
  expiresIn: process.env.EXPIREIN || '1d',
});
