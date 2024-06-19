# Source Folder Structure

```
  src
  │
  ├── core
  │   │
  │   ├── auth
  │   ├── constants
  │   ├── decorators
  │   ├── providers
  │   ├── guards
  │   ├── middlewares
  │   ├── pipes
  │   ├── interceptors
  │   ├── filters
  │   ├── interfaces
  │   ├── types
  │   └── utils
  │
  ├── graphql
  │   │
  │   └── schema
  │
  └── modules
      │
      ├── User
      │   │
      │   ├── domain
      │   │   ├── constants
      │   │   ├── entities
      │   │   ├── repositories
      │   │   ├── services
      │   │   └── exceptions
      │   │
      │   ├── infrastructure
      │   │   ├── repositories
      │   │   ├── queues
      │   │   ├── processors
      │   │   └── services
      │   │
      │   ├── application
      │   │   ├── validators
      │   │   └── usecases
      │   │
      │   └── presentation
      │       ├── dtos
      │       ├── controllers
      │       ├── schemas
      │       └── resolvers
      │
      ├── Driver/Mechanical
      │
      ├── Order
      │
      └── ...
```
