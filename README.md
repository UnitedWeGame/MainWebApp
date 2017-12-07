# United We Game

## A social networking web app for video gamers.

## Senior Project, University Of Utah 2017
Team members: 
- Logan Gore
- Kelsey Heidarian
- Jackson Murphy
- Chris Weeter


## Instructions to build and run locally

The following instructions are specific to OSX, but will probably also work with most Linux systems.
Also note that you will need to obtain API keys from the team in order to run the secondary server.

The system comprises the following components: 
- Postgres Database
- Spring Server (Main)
- Secondary Java Server (Interfaces with XBox, Steam APIs)
- Node.js Chat Server
- Webpack / React Frontend

## Necessary Installations

### Postgres
1. Install the Postgres app for Mac
2. Using Terminal, add the following environment variable:
  `JDBC_DATABASE_URL=jdbc:postgresql://localhost/jackson?user=jackson&password=`
  substituting "jackson" for the name of your Postgres database.
  
### Webpack
1. Install node and the node package manager (npm) globally to your system if not already installed
2. Install the `webpack` module globally if not already installed (`$ npm install -g webpack`)

### Gradle
1. Install gradle (https://gradle.org/install/)


## Building and Running the App

1. Make sure your Postgres app is up and running
2. Clone UnitedWeGame/ApiWebApp and start it. See "Building and Running ApiWebApp" below.
3. Clone UnitedWeGame/ and start it up
4. Clone this repository and navigate to its root directory from the command line
5. From the root directory, run `$ npm install` to install all library dependencies 
6. When this is finished, run `webpack --watch` 
7. Open a new Terminal tab, and again from the root directory, run `$ gradle build -continuous`
8. Open yet another Terminal tab, and again from the root directory, run `$ gradle bootRun`
    Wait a few moments (typically 15-45 seconds) until a line is printed to the console saying the app has started running on localhost:8080
9. Visit `localhost:8080` in your browser and you will get the homepage

## Building and Running ApiWebApp
1. Clone UnitedWeGame/ApiWebApp
2. Navigate to ApiWebApp project directory
3. Run the following command for Mac to compile the project: 

```
javac -d . -cp "libs/*" src/com/UnitedWeGame/Utils/*.java src/com/UnitedWeGame/APIServer/*.java src/com/UnitedWeGame/InformationObjects/*.java src/com/UnitedWeGame/UserClasses/*.java src/com/UnitedWeGame/Main.java
```

4. Run the following command to start the server: 

```
java -cp ".:libs/*:com/UnitedWeGame" com.UnitedWeGame.Main
```

Note: In order to run this, you will need to put in the Postgres DB credentials into the Property file, along with API tokens for http://xboxapi.com, https://steamcommunity.com/dev, and https://api.igdb.com/.

# Building and Running ChatServer
Chat Server For United We Game

To Run, make sure you have npm installed:

```
npm install
```
```
npm server.js
```
