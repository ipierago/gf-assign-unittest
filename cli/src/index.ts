#!/usr/bin/env node

import { Command } from 'commander';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:30080';

const program = new Command();

program.version('0.0.1');

program
  .command('ls')
  .description('list the contents of the system')
  .action(async () => {
    try {

      const userRes = await axios.get(`${BACKEND_URL}/user`);
      const { users } = userRes.data;
      console.log(`users: ${JSON.stringify(users)}`);

    } catch (error) {
      console.error(error);

    }
  });


program
  .command('create-user <name>')
  .description('create a new user')
  .action(async (name: string) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/user/create`, { name });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('delete-user <userId>')
  .description('delete a user')
  .action(async (userId: number) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/user/delete`, { userId });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('user-add-money <userId> <amount>')
  .description('add money to a user')
  .action(async (userId: number, amount: number) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/user/add-money`, { userId, amount });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('user-spend-money <userId> <amount>')
  .description('spend money to a user')
  .action(async (userId: number, amount: number) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/user/spend-money`, { userId, amount });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);
