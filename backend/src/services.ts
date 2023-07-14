import { OptimisticLockVersionMismatchError } from 'typeorm';
import { User } from "./entity/User";
import { appDataSource } from "./AppDataSource";
import { CreateUserRequest, CreateUserResponse, DeleteUserRequest, DeleteUserResponse, UserAddMoneyRequest, UserAddMoneyResponse, UserSpendMoneyRequest, UserSpendMoneyResponse } from "./types";

function validateName(name: string): void {
  if (name.length < 3) {
    throw new Error('Name must be at least 3 characters long');
  }
  if (!/^[a-zA-Z]/.test(name)) {
    throw new Error('Name must start with a letter');
  }
}

export const createUser = async (createUserRequest: CreateUserRequest, correlationId: string): Promise<CreateUserResponse> => {
  validateName(createUserRequest.name);
  const user = await User.create({ name: createUserRequest.name }).save();
  console.log(`user: ${JSON.stringify(user)}`);
  const createUserResponse: CreateUserResponse = { userId: user.id, correlationId };
  console.log(`createUserResponse: ${JSON.stringify(createUserResponse)}[${correlationId}]`);
  return createUserResponse;
};

export const deleteUser = async (deleteUserRequest: DeleteUserRequest, correlationId: string): Promise<DeleteUserResponse> => {
  const user = await User.findOneByOrFail({ id: deleteUserRequest.userId });
  await User.remove(user);
  console.log(`user: ${JSON.stringify(user)}`);
  const deleteUserResponse: DeleteUserResponse = { correlationId };
  console.log(`deleteUserResponse: ${JSON.stringify(deleteUserResponse)}[${correlationId}]`);
  return deleteUserResponse;
};

export const userAddMoney = async (request: UserAddMoneyRequest, correlationId: string): Promise<UserAddMoneyResponse> => {
  if (request.amount < 0) {
    throw new Error('Amount must be a positive number');
  }
  User.createQueryBuilder()
    .update(User)
    .set({
      money: () => `"money" + ${request.amount}`
    })
    .where("id = :id", { id: request.userId })
    .execute()
    .then(result => {
      if (result.affected === 0) {
        throw new Error('User does not exist')
      }
    });
  const response: UserAddMoneyResponse = { correlationId };
  console.log(`UserAddMoneyResponse: ${JSON.stringify(response)}[${correlationId}]`);
  return response;
};

export const userSpendMoney = async (request: UserSpendMoneyRequest, correlationId: string): Promise<UserSpendMoneyResponse> => {
  if (request.amount < 0) {
    throw new Error('Amount must be a positive number');
  }
  User.createQueryBuilder()
    .update(User)
    .set({
      money: () => `"money" - ${request.amount}`
    })
    .where("id = :id", { id: request.userId })
    .andWhere("money >= :amount", { amount: request.amount })
    .execute()
    .then(result => {
      if (result.affected === 0) {
        throw new Error('Insufficient funds or user does not exist')
      }
    });
  const response: UserSpendMoneyResponse = { correlationId };
  console.log(`UserSpendMoneyResponse: ${JSON.stringify(response)}[${correlationId}]`);
  return response;
};
