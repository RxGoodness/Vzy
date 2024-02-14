Project
Clone the repository at https://github.com/RxGoodness/Vzy.git and run `npm install` to install the dependencies and run `npm run start`.

ABOUT THE PROJECT

📄 Vzy Assessment API Documentation
This template contains a boilerplate for documentation that you can quickly customize and reuse.
🔖 Task Summary

Task 1: Build API Endpoints This task involves developing API endpoints to interact with MongoDB Atlas, facilitating user registration, authentication, and user record updates. Register and Authenticate Users.
The code has been pushed to github https://github.com/RxGoodness/Vzy.git
and deployed on on render https://vzy-assessment.onrender.com
ENDPOINTS
POST /auth/signup: Register new users with the system. Requires providing necessary user details like username, email,password (compulsory), firstname and lastname (optional). An access_token (which expires in 1min is generated) and a refresh token which can be used to generate another access_token. The refresh token have longer expiration(1 day)
POST /auth/login: Authenticate existing users by providing their credentials (email and password). Upon successful authentication, an access token valid for one minute is generated and returned alongside regresh token(as in signup). This access token must be included as an authentication header in subsequent requests.
Get User Records GET /users: Allows users to view their user records. Requires providing the user's access token to get the ID. User can view insensitive information (excluding password)
Update User Records PUT /users: Allows users to update their user records. Requires providing the user's access token to get the ID and the updated user details. User can update his firstname and lastname.
Admin Update User Records PATCH /users/:user_id: Allows authorized users(admin) to update other users record. Only access_level 2 user can perform this operation. Requires providing the user's access token to get the ID and the updated user details. User can update a user access_level, email and username.
Admin Delete User Records DELETE/users/user_id: Allows authorized users(admin) to update other users record. Only access_level 2 user can perform this operation. Requires providing the user's access token to get the ID and the delete user details.
Task 2: Implement Stripe Webhook
This task involves setting up an endpoint to receive requests from the Stripe webhook, verifying successful payment events, and updating user statuses accordingly in the database. Stripe Webhook Integration POST /webhook/stripe: Accepts requests from the Stripe webhook, specifically handling (successful) payment events. Upon receiving a payment event from Stripe, the system verifies its authenticity. If the payment event is verified, the user status in the database is updated to "paid."


