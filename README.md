# ToMove

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Requirements

- Npm 9+
- Node.js 18+
- NX 13.10.1+

## Setup the workspace

First, install the dependencies:

```
npm install
```

Then, create a new `.env` file in "apps/frontend" and add the following content:

```Properties
VITE_BACKEND_URL="http://localhost:3000" # Replace the value with the URL of the backend
```

Do the same for the backend (optional):

```Properties
HOST="localhost"
PORT="3000"
```

You're now ready to start the application!

## Environment variables

```Properties
NODE_ENV               # The environment the app is running in (Default: development, Choices: development, test, production)
HOST                   # The host the app is running on (Default: localhost)
PORT                   # The port the app is running on (Default: 3000)
DATABASE_FILE          # The path to the SQLite database file (Default: local.db)
MAX_CREDITS            # The maximum credits a user can have (Default: 100)
CREDIT_RECALC_INTERVAL # The interval in milliseconds to recalculate credits (Default: 600000)
EXECUTION_INTERVAL     # The interval in milliseconds to execute actions (Default: 15000)
FRONTEND_URL           # The frontend URL to allow CORS (Default: http://localhost:4200)
```

## Start the application

Run `npx nx start backend` to start the development backend.
Run `npx nx start frontend` to start the development frontend.
Run `npx nx studio backend` to start the Drizzle Studio (friendly interface to interact with the database).

Happy coding!

## Build for production

Run `npx nx build backend` to build the backend. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

Run `npx nx build frontend` to build the frontend. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
