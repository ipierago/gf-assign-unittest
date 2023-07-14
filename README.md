# GuildFi Assignment: Unit Test (gf-assign-unittest)

Hello! In this assignment, you will be asked to create a unit test for a backend service.

The project includes a backend (backend) and a command line tool (cli). The backend provides some simple APIs for creating/delete and modifying users in a database. The command line tool allows you to execute those APIs from the command line when the backend is running.

Follow the instructions in the "Setup" section and then confirm everything is working by following the instructions in the "Running" section. Finally, proceed to the "Assignment" section and follow those instructions.

## Setup

Launch a docker container with a PostGRES database by running the following:

```bash
cd backend
./docker-run-postgres
```

Install packages for backend by running the following:

```bash
cd backend
npm i
```

Install packages for cli by running the following:

```bash
cd cli
npm i
```

## Running

The following sequence will run the backend and make a few calls using the command line tool to test it.

Launch the backend:

```bash
cd backend
npm run dev
```

Open another command line and use the command line tool to execute some commands on the backend.

```bash
cd cli
npm run dev ls
npm run dev create-user "foo bar"
npm run dev ls
npm run dev user-add-money 1 100
npm run dev ls
npm run dev user-spend-money 1 50
npm run dev ls
```

## Assignment

Your assignment is to create a suite of unit tests for the backend services.

The unit tests should be able to be run using the following command:

```bash
cd backend
npm run unittest
```

Some details about the tests:

- Modify the backend/packages.json file and then add your source files.
- The unit tests can call the backend functions directly - they do not need to make REST API calls to a running backend service.
- The preferred testing library is Jest, however, you can use whatever library you would like.

The following is the expected functionality of the backend. Some of this functionality does not work and your unit tests should find it.

- Users can be added and deleted
- User names must be at least three characters long and must start with a letter
- User names must be unique
- Money can be added to a user's balance
- Money can be spent from a user's balance
- Attempts to spend more money than the user have should result in an error
- Attempts to add or spend money from a user that does not exist should result in an error

Add any additional test you think would be a good idea.
