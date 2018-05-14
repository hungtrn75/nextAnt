# Next with AntDesign

[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![DUB](https://img.shields.io/dub/l/vibe-d.svg)

AntDesign CRUD implementation built on Next.

## Stacks

* [x] [next](https://github.com/zeit/next.js/) for SSR `React`.
* [x] [apollo](https://github.com/apollographql) for `GraphQL` client.
* [x] [express](https://github.com/expressjs/express) for web framework.
* [x] [styled-components](https://github.com/styled-components/styled-components) for styling.

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

## Roadmap

[Roadmap](./Learn.md)

## Authors

* Polo Chi - [polo13999](https://github.com/polo13999)
* Max Li - [LIYINGZHEN](https://github.com/LIYINGZHEN)

## License

Licensed under the MIT License, Copyright © 2018-present Polo Chi and Max Li.

See [LICENSE](LICENSE.md) for more information.
