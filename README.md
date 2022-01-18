# Project Title

Library CODE App

## Project Description

A simple “book list” or “bookshelf” web app where a user can login/sign up using Firebase as an authentication service and be able to create “lists” such as favorites or plan-to-read list, etc.. And add/remove books to these lists accordingly.

## Project Stack

Backend : PostgreSQL, Sequelize (ORM), NodeJS, Express, Firebase SDK
Frontend : ReactJS, Firebase
Testing : Jest, Supertest
Deployment : Heroku (Backend), Netlify (Frontend)

## Project Request Flow

![Project architecture](https://drive.google.com/file/d/1Y0gwIT1u86Tp51vuzhuXaIsMMjcRhTGz/view?usp=sharing)

## Project ER Model

![ER Model](https://drive.google.com/file/d/1GOkmgFYUiUaULNbudX7dpsjUhTA5BfsV/view?usp=sharing)

## Project API Endpoints

API Resources
/books/create
/books/:id
/books
/lists : gets all user's lists
/lists/create
/lists/:id
/entries/create
/entries/:id

React App
/signIn : access Firebase pop-up sign-in component, redirects to
/browse : shows all books in database
/profile : view own user profile and lists
/signOut : signs user out, redirects to /signIn

## In the project directory, you can run:

### `npm start`
