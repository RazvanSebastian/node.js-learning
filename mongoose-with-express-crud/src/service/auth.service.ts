import { compare } from 'bcrypt';
import { ClientSession } from 'mongoose';
import { JWT, SECRET_KEY } from '../config/security.config';
import { doInTransaction } from '../core/transactional';
import { UserModel } from '../schema/user/user.schema';
import { ErrorCode } from '../errors/base.error';
import { AuthenticationError } from '../errors/generic.error';
import { UserEntity } from '../schema/user/user.model';

export class AuthService {
  private UserModel = UserModel;

  async authenticate(username: string, password: string) {
    const user = await this.findUser(username);
    const isUserValid =
      user &&
      (await this.verifyPasswordsMatching(password, user.credentials.password));
    if (isUserValid) {
      return this.buildJwt(
        user._id,
        user.credentials.username,
        user.employeeDetails.role
      );
    } else {
      throw new AuthenticationError(
        'Invalid username or password',
        ErrorCode.INVALID_CREDENTIALS
      );
    }
  }

  private buildJwt(id: string, username: string, role: string) {
    return JWT.sign({ username }, SECRET_KEY, {
      expiresIn: '1d',
      algorithm: 'HS256',
      subject: id.valueOf(),
      issuer: 'node.js learning service',
    });
  }

  private async verifyPasswordsMatching(password: string, hash: string) {
    return await compare(password, hash);
  }

  private async findUser(username: string): Promise<UserEntity> {
    return await doInTransaction(async (session: ClientSession) => {
      const result = await this.UserModel.findOne(
        {
          'credentials.username': username,
        },
        {
          '_id': 1,
          'credentials.username': 1,
          'credentials.password': 1,
          'employeeDetails.role': 1,
        },
        { session }
      ).exec();
      return result;
    });
  }
}