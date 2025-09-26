1. API Structure and Design Decisions

The backend follows a RESTful API structure:

/api/auth
    POST /register   → Register a new user
    POST /login      → Authenticate a user and return JWT

/api/users
    GET /me          → Get authenticated user profile (JWT required)


Design Decisions:

Separation of concerns: Authentication routes (auth.js) are separate from user-related routes (users.js).

Middleware usage:

authMiddleware ensures that protected routes can only be accessed with a valid JWT.

errorHandler centralizes error handling for consistent responses.

Data validation: Input data is validated using Joi (or a similar validation library) before database operations to maintain data integrity.

Environment-based configuration: Sensitive data like MongoDB URI and JWT secret are stored in .env files, not in code.

2. Authentication Flow and Security

Flow:

User registers via /api/auth/register with email, password, first name, and last name.

Password is hashed using bcrypt before storage in the database.

On login (/api/auth/login):

Email and password are verified.

If valid, a JWT is generated and returned to the client.

Client stores JWT in localStorage or secure cookie and includes it in the Authorization header for protected requests.

Protected routes (like /api/users/me) are accessed by verifying the JWT in authMiddleware.

Security Measures:

Passwords are hashed using bcrypt.

JWTs are signed using a secret key (JWT_SECRET) with a short expiration (2h).

CORS is configured to allow requests only from trusted frontend origins.

Helmet is used for basic HTTP headers security.

Sensitive data is never sent in responses (e.g., password hashes are excluded from user objects).

3. Error Handling

All API responses follow a standard format:

{ "error": "Error message here" }


Validation errors: If user input fails validation, a 400 Bad Request is returned with the relevant message.

Authentication errors: Invalid credentials or missing/expired JWT return 401 Unauthorized.

Database errors: Uncaught exceptions are passed to errorHandler middleware, returning a 500 Internal Server Error.

Not found errors: If a requested resource does not exist (e.g., /api/users/me with invalid ID), a 404 Not Found is returned.
