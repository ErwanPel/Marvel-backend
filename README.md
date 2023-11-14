
<h1 align="center">
Project Marvel - Backend

</h1>

</br>

<p align="center">
	<img alt="Last Commit" src="https://img.shields.io/github/last-commit/ErwanPel/Marvel-backend.svg?style=flat-square">
	<img alt="Licence" src="https://img.shields.io/github/license/ErwanPel/Marvel-backend.svg?style=flat-square">
	<img alt="Star" src="https://img.shields.io/badge/you%20like%20%3F-STAR%20ME-blue.svg?style=flat-square">
</p>




## Overview

This project is a technical test carried out at the "Le Réacteur" bootcamp. This project respects a specification for the functionalities and total freedom for the aesthetic and interactive aspect of the site. 
 

This project manages routes for :

1) user registration and connection.
2) Get a list of 100 characters or comics per page, in alphabetical order.
3) Get information on a specific character or comic.
4) Get a list of favorites.
5) Add or remove an item from the favorites list.

</br>

Backend development uses Node.js and Express.js / MongoDB servers for database management (mongoose package). This server uses 10 routes to perform the above tasks.

</br>
This project uses the Marvel API of bootcamp "Le Reacteur" and requires an API key to obtain the characters and comics.
The "isAuthenticated" middleware ensures that each user has a secure connection to the routes linked to their favorites.
For the "/comics" and "/characters" server routes, is it possible to filter the search result with the query "name" for "/characters" and "title" for "/comics".

## Installation and usage

Be sure, you have installed Node.js : [Node.js](https://nodejs.org/en). You have to install the "LTS" version.

### Running the project

Clone this repository :

```
git clone https://github.com/ErwanPel/Marvel-backend.git
cd Marvel-backend
```

Install packages :

```
npm install

```

When installation is complete, you have to launch  :

```
npx nodemon index.js

```

You can test different server routes with software such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

You can see the client side for this Project Marvel [here](https://github.com/ErwanPel/Marvel-frontend-SASS).

## Star, Fork, Clone & Contribute

Feel free to contribute on this repository. If my work helps you, please give me back with a star. This means a lot to me and keeps me going!
