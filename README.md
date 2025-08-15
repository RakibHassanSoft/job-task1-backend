# Expense Tracker 
 
A simple full-stack expense tracker application built using **Node.js**, **Express**, **MongoDB**, and **React.js/Next.js**.  
It allows users to add, view, edit, and delete expenses with validation and category-based filtering.  
 
---  
 
## How to Run the Project  
 
### 1️⃣ Clone the Repository  
```bash  
git clone https://github.com/RakibHassanSoft/job-task1-backend.git  
```  
 
### 2️⃣ Setup the Backend  
```bash  
cd backend  
npm install  
```  
Create a `.env` file in the backend folder:  
```env  
PORT=your_port
NODE_ENV=development
CLIENT_URL=your_url

#use any
# railway
#MONGODB_URI=your_url
#mongodb atlas
MONGODB_URI=your_url

# JWT
JWT_ACCESS_SECRET=super_long_random_access_secret
JWT_ACCESS_EXPIRES=your_day
COOKIE_NAME=your_access_token
SALT_ROUNDS=your_sal
```  
Start the backend server:  
```bash  
npm run dev  
```  
 
### 3️⃣ Setup the Backend  
```bash  
npm init  
npm install bcryptjs@^3.0.2 cookie-parser@^1.4.7 cors@^2.8.5 dotenv@^17.2.1 express@^5.1.0 express-rate-limit@^8.0.1 helmet@^8.1.0 http-errors@^2.0.0 joi@^18.0.0 jsonwebtoken@^9.0.2 mongoose@^8.17.1 morgan@^1.10.1 validator@^13.15.15 zod@^4.0.17
npm install --save-dev nodemon@^3.1.0
```  
 
### 4️⃣ Open in Browser  
Visit: **http://localhost:Port/api/v1** to view the app.  
 
---  
 
## Features  
 
### Backend (Node.js + Express + MongoDB)  
- **POST /expenses** → Add a new expense  
- **GET /expenses** → Fetch all expenses  
- **PATCH /expenses/:id** → Update an expense  
- **DELETE /expenses/:id** → Delete an expense  
 
#### Validation Rules  
- `title` → Required, minimum length **3**  
- `amount` → Required, must be a **number > 0**  
- `date` → Required, must be a **valid date**  
- `category` → Optional (e.g., Food, Transport, Shopping, Others)  
 
---  
 

 
## Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Validation:** express-validator / Joi  
- **API Testing:** Postman  
 
---  
 
## Project Structure  
```  
 Server/
  /src
    /user
    /expance
  /config
  /routes
  /utils
  .env
  README.md
  packange.json
  server.js
  app.js
     
```  
 
---  
## Test in postman by this files
```  
 Server/
   auth.postman_collection.json
   Expance.postman_collection.json
     
```  
 
---  
 
## API Endpoints  
 
| Method | Endpoint         | Description        |  
|--------|------------------|-------------------|  
| POST   | `/auth/ragister` | Ragister user     |  
| POST   | `/auth/login`    | Login user        |  
| GET    | `/auth/me`       | Update expense    |  

 

## API Endpoints  
 
| Method | Endpoint        | Description       |  
|--------|----------------|-------------------|  
| POST   | `/expenses`    | Add new expense   |  
| GET    | `/expenses`    | Get all expenses  |  
| PATCH  | `/expenses/:id`| Update expense    |  
| DELETE | `/expenses/:id`| Delete expense    |  
 

