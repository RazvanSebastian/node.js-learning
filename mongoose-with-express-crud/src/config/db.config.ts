import mongoose, { Connection } from 'mongoose';
import { UserModel } from '../schema/user/user.schema';
import { RoleModel } from '../schema/role/roel.schema';

const models = [UserModel, RoleModel];

const createCollections = async () => {
  await Promise.all(models.map((model) => model.createCollection()));
};

const openDbConnection = async () => {
  let connection: Connection;
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('MongoDB connected');
    await createCollections();
    console.log('MongoDB collections created');
  } catch (error) {
    console.error(`Unable to connect to MongoDB: ${error}`);
  }
  return connection;
};

export default openDbConnection;
