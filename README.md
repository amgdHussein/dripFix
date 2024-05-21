# DropFix

## Description

DropFix is your solution to unexpected car troubles. Whether you're facing a dead battery, overheating engine, or any other car issue, DropFix
connects you with skilled service providers who come to your location and fix your car on the spot. DropFix also offers on-demand towing services 
to transport your car to the nearest mechanical shop. With a seamless app experience, instant service requests, and reliable
professionals, DropFix ensures you're back on the road in no time. Drive with confidence, knowing that help is just a tap away.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

## Source Folder Structure

```
  src
  │
  ├── core
  │   │
  │   ├── configs
  │   ├── constants
  │   ├── shared
  │   │   ├── dtos
  │   │   ├── entities
  │   │   ├── exceptions/ errors
  │   │   └── ...
  │   │
  │   ├── decorators
  │   ├── providers
  │   ├── guards
  │   ├── middlewares
  │   ├── pipes/ validators: transformation, validation
  │   ├── interceptors
  │   │   ├── logger (debugging)
  │   │   ├── response
  │   │   └── ...
  │   │
  │   └── filters
  │       ├── http exceptions
  │       └── ...
  │
  └── modules
      │
      ├── User
      │   │
      │   ├── domain
      │   │   ├── entities: schema (interface)
      │   │   ├── repositories: logic (abstract class)
      │   │   └── usecases: trigger of the repository specific function
      │   │
      │   ├── infrastructure
      │   │   ├── repositories: the implementation of abstracted repos
      │   │   ├── datasources: incase of multiple datasource db/ cache/ ...
      │   │   └── services: business logic actual implementation
      │   │
      │   └── presentation
      │       ├── dtos/ presenters/ view-models
      │       └── user interceptor
      │
      ├── Driver/Mechanical
      │
      ├── Order
      │
      └── ...
```
