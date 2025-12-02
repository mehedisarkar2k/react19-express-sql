# React 19 Monorepo

A fullstack monorepo with React 19 frontend and Express backend.

## Prerequisites

- Node.js 18+
- Yarn 4.x
- Docker (for MongoDB)

## Getting Started

```bash
# Install dependencies
yarn install

# Run both frontend and backend
yarn dev
```

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `yarn dev`          | Run frontend and backend in parallel |
| `yarn dev:frontend` | Run frontend only                    |
| `yarn dev:backend`  | Run backend only (starts MongoDB)    |
| `yarn build`        | Build all workspaces                 |

## Structure

```text
├── frontend/    # React 19 + Vite + TanStack
├── backend/     # Express + MongoDB
└── package.json # Workspace root
```

## Notes

- Only Yarn is allowed as the package manager
- MongoDB runs in Docker on port 27017
- Frontend: `http://localhost:$frontend_port`
- Backend: `http://localhost:$backend_port`
