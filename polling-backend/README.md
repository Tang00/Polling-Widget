# Polling Backend

This is the backend portion of the project. It is a GraphQL API created with Apollo server.  
It utilizes the Sequelize ORM to connect to a MySQL database.  
The queries here are used to populate the poll data on the front end and the mutation is for adding votes to each response option.  
  
## Run
This project requires Node and Yarn.  
Open a new terminal window and navigate to the polling-backed project folder.  
Install the dependencies by running the `yarn install` command.  
Start up the project by running `yarn start`.
The backend defaults to running on localhost:4000. If you navigate there in a web browser, you can play around with directly making queries and mutations.
