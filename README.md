# sf-movies
San Francisco Movie Locations

This project is based on the Uber coding challenge to make a service that displays where movies have been filmed in San Francisco. 

I've implemented the project in a single page using the Google Maps API and DataSF: Film Locations. 
The user will get a smattering of locations on loading the page. 
The reason for this is the limited API usage for my particular google account. 
To scale up and display all movie locations at once, only the google account would need to be updated.
The user can search the map by title, actors, year or location. 
The search terms are gathered in a Mongo database for review on how to enhance usability in future release. 

This project is full-stack with focus on the frontend. 
The site was developed using vanilla Javascript for the frontend and Node, Express, and Mongo on the backend. 

I initially created a search bar that displayed the results as the user typed. 
However this wasn't very useful and would slow down the interface. 
The final addition to the app was a traditional submit button. 
Future versions of the project will include Ubers final implementation recommendation for autocomplete of search terms.  

All public work can be found at https://github.com/raqlol/
The final release of San Francisco Movie Locations can be found at http://sfmovies.raqlol.com
