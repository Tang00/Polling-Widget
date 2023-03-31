# Polling Widget

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is the front-end portion of the project. It aims to replicate the polling widget found on IGN articles such as [The Magicians Elephant Review](https://www.ign.com/articles/the-magicians-elephant-review) and [Cocaine Bear Review](https://www.ign.com/articles/cocaine-bear-review). The widget appears with the dark mode color scheme.  

## Running the project
This project requires Node and Yarn to be installed.  
  
In a terminal window:  
The dependencies need to be installed by running `yarn install`.  
Start up the project by running `yarn start`.  
Next open up your preferred browser and go to `localhost:3000`.  
  
5 different poll widgets should appear on the screen.  
After voting in a poll. The poll will only show the results screen. If you want to reset, right-click in the window and press `Inspect`. In the console, navigate to the storage tab. Right-click on `Local Storage` and select `Delete All` to remove the array of voted polls from your local storage. Refresh the page and the polls should be available to vote on again!
