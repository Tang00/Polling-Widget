# Polling-Widget

This is the Poll Widget project created as the submission for IGN's Code Foo 2023 program.  
It is a full-stack application that aims to replicate the poll widget on [IGN's website](https://www.ign.com/articles/the-magicians-elephant-review) in dark mode.  
  
## Project Details  
### polling-widget  
The front end React portion of the application.  
This project uses Apollo Client to connect to the GraphQL backend project.  
It uses the [react-countup](https://www.npmjs.com/package/react-countup) package for the percentages animation.
### polling-backend  
The GraphQL API back end portion of the application.  
Built with Apollo Server.  
It uses Sequelize ORM to communicate with the database.
### mysql  
Contains an sql migration script for creating and populating a MySQL database for use with the project.  
### Introduction  
A little intro about me and why I'm excited about the IGN Code Foo internship.  
### Hisui Power Plant  
Some research into the viability of Voltorb as a power source.  
  
## Running the project  
The project requires [Node](https://nodejs.org/en/download), [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), and [MySQL](https://dev.mysql.com/downloads/mysql/). 
To run the migration script, you may need to also download [MySQL Workbench](https://www.mysql.com/products/workbench/) or use the MySQL command line client.  
  
To start the project, first make sure that your MySQL server is running on port 3306 and the poll database has been created and populated.  
  
The backend assumes that the username for the database is `root` and the password is `password`.  
  
You can populate the database by opening MySQL Workbench selecting your database and on the nav bar, select `File` -> `Open SQL Script` and selecting `mysql/database.sql`. Then click on the lightning bolt button to run the script.  
  
Next open 2 terminal windows and navigate one to the polling-widget directory and the other to the polling-backend directory.  
In both terminals, run the `yarn install` and `yarn start` commands to download all dependencies and start the applications.  
  
In a browser window, navigate to `localhost:3000` to view the project.  
  
The application saves your voting history to local storage so you will not be able to vote a second time without emptying local storage.  
To do this, right-click on the page, and select `Inspect`, then switch to the `Storage` tab, right-click on `Local Storage` and select `Delete All`. Refresh the page and you should be able to vote again!
