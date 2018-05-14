# Next with AntDesign

AntDesign CRUD implementation built on Next.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project runs on [Next](https://github.com/zeit/next.js/), and [Ant Design](https://ant.design/docs/react/introduce)and [node](https://nodejs.org/en/)

After installation, run `node -v` to make sure node installed correctly. Example

```
$ node -v
v8.9.1
```

### Installing

Run `npm install` to install all project dependencies.

### Serve Project

Run the next with the following command:

```
yarn dev or npm run dev
```

Once its running, head over to your browser to [see Project](http://localhost:3000/).

### Running Tests

To run the project tests, run the following command:

```
yarn test or yarn run test
```

### Deploy on Heroku

You can deploy the project on [Heroku](https://www.heroku.com/) using the following steps:

1.  Create a Heroku Account
2.  On the terminal, run `heroku create` to create a new app
3.  Run `heroku push` to start a deployment on Heroku.
4.  Run `heroku migrate` to run migrations on your production database.
5.  Visit your project URL as assigned by Heroku to see a live deployment of Next with AntDesign.

### Docker

Build the project

`$ docker-compose build`

Create the database:
`$ docker-compose run --rm web bin/rails db:create`

Run the migrations:
`$ docker-compose run --rm web bin/rails db:migrate`

Run the app:
`$ docker-compose up -d`

## Authors

* **Polo** - [polo13999](https://github.com/polo13999)
* **Max** - [LIYINGZHEN](https://github.com/LIYINGZHEN)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
