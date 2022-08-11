export const config = {
  PORT: process.env.PORT || 9000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/physio-back',
  JWT_SECRET: process.env.JWT_KEY || 'secret_key',
};