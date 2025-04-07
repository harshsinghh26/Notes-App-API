# 🗒️ Notes Keeper API

A simple and secure RESTful API to manage personal notes with user authentication. Built using **Node.js**, **Express**, and **MongoDB**.

---

## 📁 Project Features

- User Registration & Login with JWT Auth
- Create, Read, Update, and Delete Notes
- Notes are user-specific and private by default
- Tag-based note categorization
- Filtering and searching support
- RESTful API structure with proper error handling

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (JSON Web Token)
- **Deployment:** Render / Railway / Cyclic

---

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/harshsinghh26/Notes-App-API.git
   cd Notes-App-API
   
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   PORT=8000
   DB_URL=your_mongodb_connection_string
   CORS = your_cors_url
   ACCESS_TOKEN_SECRET = your_secret_key
   ACCESS_TOKEN_EXPIRY = set expiry
   REFRESH_TOKEN_SECRET = your_secret_key
   REFRESH_TOKEN_EXPIRY = set_expiry
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints
### Authentication
- **POST** `/api/v1/users/register` - Register a new user
- **POST** `/api/v1/users/login` - Login with email and password
- **POST** `/api/v1/users/logout` - Logout Current User
- **POST** `/api/v1/notes/createnotes` - Create Notes
- **GET** `/api/v1/notes/getnotes` - Get Notes
- **GET** `/api/v1/notes/getnotesbyid/:id` - Get Notes By Id
- **PUT** `/api/v1/notes/update/:id` - Update Notes Details
- **PUT** `/api/v1/notes/delete/:id` - Delete Notes 

## Testing
Use **Postman** or any API client to test the endpoints.
