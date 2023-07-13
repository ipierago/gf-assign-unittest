import express, { Request, Response } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

import { appDataSource } from "./AppDataSource";
import { createUser, deleteUser } from './services';
import { User } from "./entity/User";
import { CreateUserRequest, DeleteUserRequest } from './types';

const MY_PORT = 30080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/user/', async (req: Request, res: Response) => {
  const correlationId = uuidv4();
  try {
    console.log(`/user/ ${JSON.stringify(req.body)} [${correlationId}]`);
    const users = await User.find();
    res.json({ users });
  } catch (error: any) {
    console.error(`ERROR [${correlationId}]: ${JSON.stringify(error)}`);
    res.status(500).send({ message: `Error [${correlationId}]: ${JSON.stringify(error)}` });
  }
});

app.post('/user/create', async (req: Request, res: Response) => {
  const correlationId = uuidv4();
  try {
    console.log(`/user/create ${JSON.stringify(req.body)} [${correlationId}]`);
    const createUserRequest: CreateUserRequest = req.body;
    const createUserResponse = await createUser(createUserRequest, correlationId);
    res.json(createUserResponse);
  } catch (error) {
    console.error(`ERROR [${correlationId}]: ${error}`);
    res.status(500).send({ message: `Error [${correlationId}]: ${JSON.stringify(error)}` });
  }
});

app.post('/user/delete', async (req: Request, res: Response) => {
  const correlationId = uuidv4();
  try {
    console.log(`/user/delete ${JSON.stringify(req.body)} [${correlationId}]`);
    const deleteUserRequest: DeleteUserRequest = req.body;
    const deleteUserResponse = await deleteUser(deleteUserRequest, correlationId);
    res.json(deleteUserResponse);
  } catch (error) {
    console.error(`ERROR [${correlationId}]: ${error}`);
    res.status(500).send({ message: `Error [${correlationId}]: ${JSON.stringify(error)}` });
  }
});

app.listen(MY_PORT, () => {
  console.log(`Backend running on port ${MY_PORT}`);
});

async function main() {
  try {
    console.log("Initializing database");
    await appDataSource.initialize();
  } catch (error) {
    console.error(error);
    throw error;
  }

}

main();
