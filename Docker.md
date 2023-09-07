# Motiv

#### Running the application for development
* To run the application for development, you need to have the following installed on your machine:
    * Ubuntu 22.04.2 LTS (preferrably)
    * Git
    * NVM (don't really need to because it'll be running on the backend Docker container but it can be useful if we encounter a Docker issue and we need to keep coding).
    * NodeJS (don't really need to because it'll be running on the backend Docker container but it can be useful if we encounter a Docker issue and we need to keep coding).
    * Docker
    * Docker Compose
    * ...
    * For more informations about the tools and their versions check the Technical part on [Notion](https://www.notion.so/Technical-b0b079be97bd4ef183235744489eccd1).

#### Installing Android Studio
* If you want to run the frontend application part on an android emulator, you can either scan the code or install Android Studio. If so, you need to run the following commands:
    * [Set up Android Studio's tools](https://docs.expo.dev/workflow/android-studio-emulator/).

#### Using Docker without needing to use sudo
* To be able to use Docker without `sudo` each time, you need to do the following steps:
* Add the docker group if it doesn't already exist:
    * ```sudo groupadd docker```
* Add the connected user "$USER" to the docker group. Change the user name to match your preferred user if you do not want to use your current user:
    * ```sudo gpasswd -a $USER docker```

#### To run the applications with docker-compose:
* Need to have:
    * PS: maybe you'll need to run the Docker and the docker compose commands with `sudo` if you haven't done the previous steps.
    * To run the application you will not need to do the commands mentioned on the backend part and the frontend ones, Docker compose will take care of all of that. You will only need to run the following command:
        * ```docker-compose up```
    * VERY IMPORTANT: each time we update the code of the frontend or the backend IMAGES (i.e the Dockerfile files) we need to rerun the `docker-compose` command with the following option `--build` so that the docker-compose can rebuild the docker images and containers with the newly updated code, so the full command is:
        * ```docker-compose up --build```

#### Interact with a running container:
* After executing the ```docker-compose up --build``` command you might want to interact with the frontend and/or the backend running containers (i.e execute commands on the terminal on each of these). To do so, first you need to know the ID of the running container that you want to interact with, by running this command on another terminal:
    * ```docker ps -a```
    * The first column contains the ID of containers(s).
    * To interact with the container, you have to use the following command:
        * ```docker attach id-of-container-you-want-to-use```

#### Coding in the Docker environments:
* First, you need to install VSCode if you haven't yet.
* look for the "Remote Development" extension on VSCode, created by Microsoft and install it.
* After installing it you'll see a green bottom at the bottom left of your VSCode, click on it.
* At this step you should have already run the docker-compose command so that your containers are already running.
* you'll get a prompt menu on the top of your IDE, choose "attach to running container" and choose the "/motiv_backend-motiv-app_1" to work on VSCode for the backend.
* Then redo the same thing for the "/motiv_frontend-motiv-app_1" to run the frontend part.
* Once you're connected to the Docker containers on VSCode, you need to go to the project folder and for both the frontend and the backend it's this one: `/usr/src/app` (the one written as the WORKDIR in the Dockerfile).

#### To run the backend part:
* Need to have:
    * node18.12 installed
    * Mongodb installed
    * The mongodb service running on one's local machine.
    * All node modules installed locally by running on the terminal inside the backend folder: `npm install`
* To build the docker image, on the terminal, go to the backend folder and run:
    * ```docker build -t motiv-backend .```
    * This command will build the docker image and give it the name **motiv-backend**
* To run the backend application as Docker container, execute this command:
    * ```docker run -p 3000:3000 motiv-backend```
* The application must be up and running on http://localhost:3000


#### To run the frontend part:
* Need to have:
    * node18.12 installed
    * the expo-cli package is installed globally, using the following command: `npm i -g expo-cli`.
    * All node modules installed locally by running on the terminal inside the frontend folder: `npm install`
* To build the docker image, on the terminal, go to the frontend folder and run:
    * ```docker build -t motiv-frontend .```
    * This command will build the docker image and give it the name **motiv-frontend**
* To run the frontend application as Docker container, execute this command:
    * ```docker run -it -p 19000:19000 -p 19001:19001 -p 19006:19006 motiv-frontend```
* The application must be up and running on the **WEB** (your navigator) on http://localhost:19006



#### Explanations:
* Please check the [following page](Explanations.md) to understand the docker commands in details and you can read the comments in the dockerfiles.