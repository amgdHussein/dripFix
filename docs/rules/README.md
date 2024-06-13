<style>
r { color: Red }
o { color: Orange }
g { color: Green }
b { color: Blue }
y { color: Yellow }
</style>

# Why apply Onion Architecture in NestJs projects?

NestJs is a service-side framework based on NodeJs. NestJs has many built-in features but most importantly for us now is the Dependency Injection and
the possibility to add Dependency inversion which is what we need to apply the Onion Architecture.

# Naming

    “Any fool can write code that a computer can understand. Good programmers write code that humans can understand” — Martin fowler

---

    “Quality means doing it right when no one is looking” — Henry Ford

## [File Naming](https://stackoverflow.com/questions/61666498/file-naming-in-nest-js)

NestJS library used hyphen-separated file naming as its convention.

File Name: <o>file-name-part</o>.<y>type.of.interest</y>.ext as lowercase letters.

- Model `User` **&rarr;** <o>user</o>.<y>entity</y>.ts
- Enum `PaymentMethod` **&rarr;** <o>payment-method</o>.<y>enum</y>.ts
- Class `AppModule` **&rarr;** <o>app</o>.<y>module</y>.ts
- Decorator `CurrentUser` **&rarr;** <o>current-user</o>.<y>decorator</y>.ts
- Class `UserRoleService` **&rarr;** <o>user-role</o>.<y>service</y>.ts
- Class `UserController` **&rarr;** <o>user</o>.<y>controller</y>.ts
- Interface `IUserRepository` **&rarr;** <o>user</o>.<y>repository.interface</y>.ts
- Class `UserPostgresRepository` **&rarr;** <o>user</o>.<y>postgres.repository</y>.ts

## Coding Conventions

#### [Why CamelCase?](https://www.theserverside.com/answer/Camel-case-vs-snake-case-Whats-the-difference#:~:text=When%20multiple%20words%20are%20used,between%20words%20to%20create%20separation.)

When browser-based programming with HTML and JavaScript first emerged, [snake case](https://en.wikipedia.org/wiki/Snake_case) was a common approach to
variable and method naming. But as object-oriented derivations of JavaScript, such as TypeScript, AngularJS and Node.JS, gained popularity, **camel
case has become the standard**.

#### [Clean Code Considerations](https://medium.com/@pabashani.herath/clean-code-naming-conventions-4cac223de3c6)

1.  Choose descriptive names

    > Use a descriptive name for an intent that can reveal its intention.

    |                            | Do                        | Like                                         | Not Like                            |
    | :------------------------: | ------------------------- | -------------------------------------------- | ----------------------------------- |
    |          Variable          | Use nouns and properties  | `let availableLeaveBalance`                  | `let d;` // available leave balance |
    |          Function          | Use verbs                 | `getUser, getTotalCount, updateCustomerName` |                                     |
    |          Callback          | Use referenced parameter  | `(snapShot) => {}`                           | `(s) => {}`                         |
    |           Class            | Use nouns and adjectives  | `Customer, Product, and Student`             | `AppUser`                           |
    | Abstract Class (Interface) | Use `I` before class name | `IProductService`                            | `ProductServiceInterface`           |

2.  Unambiguous names

    > You can use a single letter as variable

    |  With   | Var                                   |
    | :-----: | ------------------------------------- |
    | Counter | `let c = 0;`                          |
    |  Lists  | `let a = [1, 2, 3], b = [4, 5, 6];`   |
    |  Loop   | `let i = 0, j = i + 1 and k = j + 1;` |

3.  Avoid encodings

    > Don’t append prefixes or type information.

    | Do              | Don't              |
    | --------------- | ------------------ |
    | `let accounts;` | `let accountList;` |
    | `let queries;`  | `let queryList;`   |
    | `let name;`     | `let nameString;`  |
    | `let salary;`   | `let salaryFloat;` |

4.  Meaningful Distinctions

    > Use the same word for the same purpose across the codebase.

    Combined Examples for Consistency

    - add, get, update, replace, remove, query
    - create, fetch, modify, overwrite, delete, filter
    - insert, retrieve, change, set, destroy, search
    - save, find, edit, renew, erase, select
    - new, read, adjust, substitute, drop, scan

    > I will go with these terms: **create, fetch, update, overwrite, delete, search**

    |          function           | input                               | output            | Purpose                                                     | Do                               | Don't                                                    |
    | :-------------------------: | ----------------------------------- | ----------------- | ----------------------------------------------------------- | -------------------------------- | -------------------------------------------------------- |
    |     <o>fetch</o>Object      | `id`                                | `object`          | To retrieve a specific document by id                       | `fetchArticle(id)`               | `getArticle(id)/ retrieveArticle(id)/ readArticle(id)`   |
    |     <o>create</o>Object     | `object`                            | `id`              | To add a new document                                       | `createArticle(article)`         | `addArticle(article)`                                    |
    |     <o>delete</o>Object     | `id`                                | `void/boolean`    | To remove a specific document by id                         | `deleteArticle(id)`              | `removeArticle(id)/ dropArticle(id)/ destroyArticle(id)` |
    |     <o>update</o>Object     | `object`                            | `object`          | To update a specific document & retrieve it                 | `updateArticle(article)`         | `changeArticle(article)`                                 |
    |   <o>overwrite</o>Object    | `object`                            | `object`          | To update a specific document & retrieve it                 | `overwriteArticle(article)`      | `renewArticle(article)`                                  |
    | <o>search</o>Object<o>s</o> | `page, limit, query params, sortBy` | `List of objects` | To retrieve **N** of objects with/without filter the output | `searchArticles(limit, queries)` | `getAll()/ getArticles()/ findArticles()`                |

5.  Replace magic values with named constants

    > When you are using some constant values define them using searchable words.

    - Constants written in UPPERCASE separated with underscore.
    - Global variables ( ex. `PI`, `MAX_IMAGE_WIDTH` ), saved inside <y>core/constants/magic-numbers.constants.ts</y>.
    - Critical configurations ( ex. `GCLOUD_PRIVATE_KEY`, `GCLOUD_PROJECT_ID`), saved inside <y>.env(file)</y>.
    - **Enum Categories(keys)** written as constants with their values ( ex. `enum PaymentMethod {PAYPAL = 'paypal', STRIPE = 'stripe'}`).

# General rules

1. Every class/ function must be documented.
2. Every class/ function must be [unit-tested](https://docs.nestjs.com/fundamentals/testing).
3. The date is stored as a ISO Date String not a number within the entire project.

## ESLint Rules

<!-- TODO: UPDATE -->
<!-- - [Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean](https://typescript-eslint.io/rules/no-inferrable-types)
- [Disallow the use of variables before they are defined](https://typescript-eslint.io/rules/no-use-before-define)
- [Disallow unused variables](https://typescript-eslint.io/rules/no-unused-vars)
- [Warn usage of the any type](https://typescript-eslint.io/rules/no-explicit-any)
- [Allow any typed values in template expressions](https://typescript-eslint.io/rules/restrict-template-expressions)
- [Disallow dot notation](https://typescript-eslint.io/rules/dot-notation)
- [Prevents conditionals where the type is always truthy or always falsy](https://typescript-eslint.io/rules/no-unnecessary-condition)
- [Naming Convention](https://typescript-eslint.io/rules/naming-convention/)
  - Enforce that all variables are either in camelCase or UPPER_CASE
  - Enforce that variable and function names are in camelCase
  - Enforce that class and interface names are in PascalCase
  - boolean variables
  - Prefer identifying each enums member format as upper case
  - Require that interface names be prefixed with I
- [Require a consistent member declaration order](https://typescript-eslint.io/rules/member-ordering)
- [Require explicit accessibility modifiers on class properties and methods](https://typescript-eslint.io/rules/explicit-member-accessibility)
- [Consistent with type definition either [interface/ type]](https://typescript-eslint.io/rules/consistent-type-definitions)
- [Prefer initializing each enums member value](https://typescript-eslint.io/rules/prefer-enum-initializers)
- [Disallow unnecessary constructors](https://typescript-eslint.io/rules/no-useless-constructor)
- [Require explicit return types on functions and class methods](https://typescript-eslint.io/rules/explicit-function-return-type)
- [Requires any function or method that returns a Promise to be marked async](https://typescript-eslint.io/rules/promise-function-async)
- [Disallow async functions which have no await expression](https://typescript-eslint.io/rules/require-await) -->
