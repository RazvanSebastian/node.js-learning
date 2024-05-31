import { ClientSession } from 'mongoose';
import { doInTransaction } from '../core/transactional';
import { UserModel } from '../schema/user/user.schema';
import { hash } from 'bcrypt';
import { ErrorCode } from '../errors/base.error';
import { BadRequestError, NotFoundError } from '../errors/generic.error';
import { User } from '../schema/user/user.model';
import { UserUpdates, mapToMongooseInc } from './model/user.model';

class UserService {
  private UserModel = UserModel;

  public async createUser(user: User): Promise<User> {
    const hashedPassword = await hash(user.credentials.password, 10);
    return doInTransaction(async (session: ClientSession) => {
      const newUser = new this.UserModel({
        ...user,
        credentials: { ...user.credentials, password: hashedPassword },
      });
      await newUser.save({ session });
      return newUser;
    });
  }

  public async updateUser(id: string, userUpdates: UserUpdates) {
    let propertiesUpdates = mapToMongooseInc(userUpdates);
    return doInTransaction(async (session: ClientSession) => {
      const result = await UserModel.findOneAndUpdate(
        { _id: id },
        {
          $set: propertiesUpdates,
        },
        { session, new: true, projection: { 'credentials.password': 0 } }
      ).lean();
      if (result) {
        return result;
      } else {
        throw new NotFoundError(
          `User with id ${id} not found`,
          ErrorCode.NOT_FOUND
        );
      }
    });
  }

  public async deleteUser(id: string) {
    return doInTransaction(async (session: ClientSession) => {
      const result = await this.UserModel.deleteOne(
        { _id: id },
        { session }
      ).lean();
      if (result.deletedCount === 0) {
        throw new BadRequestError(
          `User with id ${id} doesn't exists`,
          ErrorCode.BAD_REQUEST
        );
      }
    });
  }

  public async getUser(id: string): Promise<User> {
    return doInTransaction(async (session: ClientSession) => {
      const result = await this.UserModel.findById(
        id,
        { 'credentials.password': 0 },
        { session }
      ).lean();
      return result;
    });
  }
}

export default UserService;
