# Recipe Finder

This project is a full-stack application that allows users to search for recipes and save their favorites. The frontend is built with React and TypeScript, and the backend is built with Express and Prisma.

## Project Structure

The project is divided into two main directories: `frontend` and `backend`.

### Frontend

The frontend is a React application built with TypeScript and Vite. It includes components for displaying recipes and a modal for viewing recipe details.

### Backend

The backend is an Express server that interacts with a PostgreSQL database through Prisma. It provides endpoints for searching recipes and managing favorite recipes.

## Setup

### Frontend

1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server.

### Backend

1. Navigate to the `backend` directory.
2. Run `npm install` to install dependencies.
3. Set up your `.env` file with your database URL and API key.
4. Run `npm start` to start the server.

## API

The backend provides the following endpoints:

- `GET /api/recipes/search`: Search for recipes.
- `GET /api/recipes/:id/summary`: Get the summary of a specific recipe.
- `POST /api/recipes/favourite`: Save a recipe to the favorites.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
