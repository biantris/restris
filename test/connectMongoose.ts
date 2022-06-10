import mongoose from 'mongoose';

const mongooseOptions = {
  autoIndex: false,
  autoReconnect: false,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
  useCreateIndex: true,
};

export async function connectMongoose() {
  jest.setTimeout(20000);
  return mongoose.createConnection(global.__MONGO_URI__, {
    ...mongooseOptions,
    dbName: global.__MONGO_DB_NAME__,
  });
}
console.log(connectMongoose, 'connectMongoose');
