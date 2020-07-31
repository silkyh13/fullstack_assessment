# fullstack_assessment

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

The stock trading application was made with react, node and express. For the sign up page, I used mysql to store all the information about the user in a user table. The password is hashed with bcrypt for security purposes. It allows a user to login with a verifiable password and this was done with passport.js. You can make investments on the portfolio page. If you input an invalid ticker symbols or if there isn’t enough fund in your account, the purchase will not go through. The portfolio also has a compiled list of all the stocks users own along with their latest prices to indicate performance. The list of transactions shows the history of the investments the user made.

## Technologies

Project is created with:

- axios: 0.19.2
- bcrypt: 4.0.0
- express: 4.17.1
- mysql2: 2.1.0
- passport: 0.4.1
- react: 16.12.0

## Setup

To run this project, install it locally using npm:

```
$ npm install
$ npm run serve
```
