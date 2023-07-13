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
  userId: number;
  correlationId: string;
}
