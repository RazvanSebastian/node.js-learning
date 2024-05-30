import mongoose, { ClientSession } from 'mongoose';

export const doInTransaction = async <T>(fn: (session: ClientSession) => T) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = (await fn(session)) as T;
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};
