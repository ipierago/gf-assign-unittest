import { User } from "./entity/User";

import { CreateUserRequest, CreateUserResponse, DeleteUserRequest, DeleteUserResponse } from "./types";

function validateName(name: string): void {
  if (name.length < 3) {
    throw new Error('Name must be at least 3 characters long');
  }
  if (!/^[a-zA-Z]/.test(name)) {
    throw new Error('Name must start with a letter');
  }
}

export const createUser = async (createUserRequest: CreateUserRequest,
  correlationId: string): Promise<CreateUserResponse> => {
  validateName(createUserRequest.name);
  const user = await User.create({ name: createUserRequest.name }).save();
  console.log(`user: ${JSON.stringify(user)}`);
  const createUserResponse: CreateUserResponse = { userId: user.id, correlationId };
  console.log(`createUserResponse: ${JSON.stringify(createUserResponse)}[${correlationId}]`);
  return createUserResponse;
};

export const deleteUser = async (deleteUserRequest: DeleteUserRequest,
  correlationId: string): Promise<DeleteUserResponse> => {
  const user = await User.findOneByOrFail({ id: deleteUserRequest.userId });
  await User.remove(user);
  console.log(`user: ${JSON.stringify(user)}`);
  const deleteUserResponse: DeleteUserResponse = { userId: user.id, correlationId };
  console.log(`deleteUserResponse: ${JSON.stringify(deleteUserResponse)}[${correlationId}]`);
  return deleteUserResponse;
};
