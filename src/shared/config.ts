export interface ConfigurationOptions {
  secretKey: string;
  expiresIn: string;
  db_string: string;
}

export default (): ConfigurationOptions => ({
  secretKey: process.env.SECRETKEY || 'secret',
  expiresIn: process.env.EXPIREIN || '1d',
  db_string: process.env.DB_STRING || 'mongodb://0.0.0.0:27017/nest',
});
