# DOCUMENTATION

In this file, You will the documentation of api & database.

## API DOCS

### Basic Paths

- GET `/`: to access homepage.
- GET `/api/health`: health check.
- GET `/api/profile`: user profile.

### Auth Paths

- POST `/api/auth/signup`: to create account.
- POST `/api/auth/login`: to login.
- GET `/api/auth/logout`: to logout.

### User Paths

- GET `/api/users`: to get all users.
- GET `/api/users/{id}`: to get user with a specific id.
- PUT `/api/users/{id}`: to update a user with a specific id.
- DEL `/api/users/{id}`: to delete a user with a specific id.

### Query Paths

- GET `/api/querys`: to get all querys.
- GET `/api/querys/{id}`: to get query with a specific id.
- POST `/api/querys/`: to create a query.
- POST `/api/querys/resolve/{id}`: to resolve a query.

### News Paths

- GET `/api/news`: to get all news.
- POST `/api/news`: to publish a new news.
- DEL `/api/news/{id}`: to delete a news with a specific id.

### Admission Paths

- GET `/api/admission`: to get all admission.
- POST `/api/admission/register`: to create a new admission.

##  DATABASE SCHEME

### query

| Columns  | Datatype    | Constrains        |
| -------- | ----------- | ----------------- |
| id       | integer     | primary-key       |
| fullname | string      | not-null          |
| mobileno | integer(10) | not-null          |
| message  | string      | not-null          |
| resolved | boolean     | default(false)    |

### users

| Columns  | Datatype    | Constrains        |
| -------- | ----------- | ----------------- |
| id       | integer     | primary-key       |
| fullname | string      | not-null          |
| email    | string      | unique & not-null |
| password | string      | not-null          |

### news

| Columns  | Datatype    | Constrains        |
| -------- | ----------- | ----------------- |
| id       | integer     | primary-key       |
| title    | string      | not-null          |
| desc     | string      | not-null          |

## admission

| Columns    | Datatype    | Constrains        |
| ---------- | ----------- | ----------------- |
| id         | integer     | primary-key       |
| fullname   | string      | not-null          |
| mobileno   | integer(10) | not-null          |
| course     | string      | not-null          |
| registerat | string      | not-null          |
