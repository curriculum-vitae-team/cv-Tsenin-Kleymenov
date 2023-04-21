# Curriculum Vitae Project :briefcase:
Curriculum Vitae is a simple application which similar to HRM in different companies.

Here you can see a home page of application :point_down:

![curriculum-vitae](https://user-images.githubusercontent.com/79158730/233462548-e9d92cd9-e5c8-476b-acb2-3c9817a3efad.png)

## How to run the app

1. _Clone the repo:_
   `$ git clone https://github.com/curriculum-vitae-team/cv-Tsenin-Kleymenov.git`
   
2. _Install dependencies:_ `yarn` or `npm install`

3. _Start the dev server:_ `yarn start` or `npm start`

**All secret-values located in `.env` file**

Copy the example env file and make the required configuration changes in the .env file

`cp .env.example .env`

## Database :computer:

To work with the database in our application, we use GraphQL and Apollo Client

To work with queries were used `useQuery()`, `useLazyQuery()`, `useMutation()`.
