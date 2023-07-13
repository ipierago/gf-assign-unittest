# GuildFi Assignment: Unit Test (gf-assign-unittest)

Hello! This simple project includes a backend and a command line tool. The backend provides some simple APIs for interaction with a user database. The command line tool allows you to execute those APIs from the command line when the backend is running.

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

Open another command line and use the command line tool to execute some commands on the backend:

```bash
cd cli
npm run dev ls
npm run dev create-user "foo bar"
npm run dev ls
```

## Assignment

Your assignment is to create a suite of unit tests for the backend services.

The unit tests should be able to be run using the following command:

```bash
cd backend
npm run unittest
```

The preferred testing library is Jest, however, you can use whatever library you would like.

The following is the expected functionality. Some of this functionality does not work and your unit tests should find it.

- Users can be added and deleted
- User names must be at least three characters long and must start with a letter
- User names must be unique

Add any additional test you think would be a good idea.
