export interface CreateUserRequest {
  name: string;
}

export interface CreateUserResponse {
  userId: number;
  correlationId: string;
}

export interface DeleteUserRequest {
  userId: number;
}

export interface DeleteUserResponse {
  correlationId: string;
}

export interface UserAddMoneyRequest {
  userId: number;
  amount: number;
}

export interface UserAddMoneyResponse {
  correlationId: string;
}

export interface UserSpendMoneyRequest {
  userId: number;
  amount: number;
}

export interface UserSpendMoneyResponse {
  correlationId: string;
}
