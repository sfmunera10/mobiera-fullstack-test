# mobiera-fullstack-test
Mobiera's Full Stack Test

# How to run using Docker 

To deploy the full application (at root folder):

    docker-compose -f "docker-compose.yml" up -d --build

**NOTE ON DOTENV FILES**: Real .env files are included in this project's zip packing, but will never be included in this project's repository. There are 3 official .env files with the same variables, located within the root folder, backend folder and ui folder. Before docker-compose up command, check that DATABASE_URL variable uses mysql as host (e.g: mysql://{user}:{password}@mysql:3306/user_directory) inside .env file in backend's directory.

After running compose up, install dependencies and run database migrations at the backend folder using prisma:
(This time, check that DATABASE_URL variable uses localhost as host (e.g: mysql://{user}:{password}@localhost:3306/user_directory) inside .env file in backend's directory.)

    npm install
    npx prisma migrate dev --name init
    npx prisma db seed

To remove all application deployments (at root folder): 

    docker-compose -f "docker-compose.yml" down


## Author 🖌️

- Santiago Múnera

Made with ❤️ by Santiago Múnera.