# DOCUMENTATION

In this file, You will the documentation of api & database.

## Frontend Common Code Reference

### API Call Examples

### 1. Using `fetch` for GET Requests
Fetch is a built-in JavaScript function for making HTTP requests. Here's how to use it for a GET request:

```javascript
// Example: Fetching a list of users
async function getUsers() {
  try {
    const response = await fetch('/api/users'); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Users:', data.result); // Use the data as needed
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Call the function to fetch users
getUsers();
```

### 2. Using `fetch` for POST Requests
When sending data to the API, you need to include a `body` and set the `Content-Type` header.

```javascript
// Example: Adding a new user
async function addUser() {
  try {
    const user = {
      fullname: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Telling the server we're sending JSON
      },
      body: JSON.stringify(user), // Convert the object to a JSON string
    });

    if (!response.ok) {
      throw new Error('Failed to add user');
    }

    const data = await response.json();
    console.log('User added:', data.result); // Use the data as needed
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// Call the function to add a user
addUser();
```

### 3. Using an HTML Form for POST Requests
HTML forms automatically send data to the server. You can use them for simple POST requests.

#### Example HTML Form:
```html
<form action="/api/users" method="POST">
  <label for="fullname">Full Name:</label>
  <input type="text" id="fullname" name="fullname" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required>

  <button type="submit">Submit</button>
</form>
```

### Explanation:
1. The `action` attribute specifies the API endpoint (`/api/users` in this case).
2. The `method` attribute defines the HTTP method (`POST` here).
3. Each input field's `name` attribute matches the expected parameter in the API (e.g., `fullname`, `email`, `password`).

#### Tips for Beginners
1. **Understand API Endpoints**: Know the URL and required parameters for the API you're calling.
2. **Use `console.log`**: It helps you debug and see the response from the server.
3. **Error Handling**: Always include error handling with `try...catch` or check `response.ok`.
4. **Read the API Documentation**: Make sure you understand the request and response structure.

---

## DotEnv File

below given is example `.env` file,
please edit it to suit your need.

```
PORT=8080
JWT_ACCESS_SECRET=testsecret
DB_PATH=./mydatabase.sqlite
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

---

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

---

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
| content  | string      | not-null          |

## admission

| Columns    | Datatype    | Constrains        |
| ---------- | ----------- | ----------------- |
| id         | integer     | primary-key       |
| fullname   | string      | not-null          |
| mobileno   | integer(10) | not-null          |
| course     | string      | not-null          |
| registerat | string      | not-null          |
