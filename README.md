# Notes API with Authentication - Backend Developer Intern Assignment

> **Submission for Backend Developer Intern Position**  
> A production-ready full-stack MERN application demonstrating scalable REST API design with JWT authentication and role-based access control.

## 🎯 Assignment Requirements - ALL IMPLEMENTED ✅

This project fulfills **100% of the requirements** specified in the Backend Developer Intern assignment:

### ✅ Backend (Primary Focus)
- **User Registration & Login** with bcrypt password hashing and JWT authentication
- **Role-Based Access Control** (user vs admin) with middleware protection
- **CRUD APIs** for notes entity with ownership validation
- **API Versioning** (`/api/v1/`) for scalability
- **Error Handling** with appropriate HTTP status codes
- **Input Validation** using express-validator
- **API Documentation** - Interactive Swagger UI + Postman collection
- **Database Schema** - MongoDB with Mongoose (User & Note models)

### ✅ Frontend (Supportive)
- **React.js** with modern Vite tooling
- **Authentication UI** - Login & Registration pages
- **Protected Dashboard** - JWT-based route protection
- **CRUD Operations** - Full note management interface
- **Error/Success Messaging** - Real-time feedback with React Hot Toast

### ✅ Security & Scalability
- **Secure JWT** - Token-based authentication with 7-day expiry
- **Password Security** - Bcrypt hashing with salt rounds
- **Input Sanitization** - express-validator with trim & normalization
- **Security Headers** - Helmet.js configured
- **Rate Limiting** - Upstash Redis (100 req/60s)
- **Scalable Structure** - Modular architecture with clear separation of concerns
- **API Versioning** - Ready for future iterations
- **Environment Configuration** - Proper .env setup

### 📚 Documentation Delivered
- ✅ Comprehensive README with setup instructions
- ✅ API Documentation (Swagger + Postman)
- ✅ Scalability & Architecture notes
- ✅ Quick start guide
- ✅ Environment configuration examples

---

## 🚀 Features

### Backend (Primary Focus)
- ✅ **User Authentication**
  - User registration with password hashing (bcrypt)
  - JWT-based login system
  - Protected routes with token verification
  
- ✅ **Role-Based Access Control**
  - Two user roles: `user` and `admin`
  - Admin can view all notes
  - Users can only manage their own notes

- ✅ **CRUD Operations for Notes**
  - Create, Read, Update, Delete notes
  - Filter notes by category (Personal, Work, Others)
  - User ownership verification

- ✅ **Security & Best Practices**
  - Password hashing with bcrypt
  - JWT token authentication
  - Input validation with express-validator
  - Helmet.js for security headers
  - Rate limiting with Upstash Redis
  - MongoDB injection protection

- ✅ **API Versioning**
  - All routes versioned as `/api/v1/`
  - Easy to extend with new versions

- ✅ **API Documentation**
  - Interactive Swagger UI at `/api-docs`
  - Complete endpoint documentation

### Frontend
- ✅ **React.js with Modern Stack**
  - Vite for fast development
  - React Router for navigation
  - Tailwind CSS + DaisyUI for styling

- ✅ **Authentication UI**
  - Login & Registration pages
  - Protected routes
  - JWT token management
  - Auth context for global state

- ✅ **Notes Management**
  - Create notes with categories
  - Edit and delete notes
  - Filter by category
  - Responsive design

## 📋 Tech Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Validation**: express-validator
- **Security**: Helmet.js
- **Rate Limiting**: Upstash Redis
- **Documentation**: Swagger (swagger-ui-express, swagger-jsdoc)

### Frontend
- **Framework**: React.js with Vite
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS + DaisyUI
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- Upstash Redis account

### Backend Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd MERN
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Create environment file**

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/notes-app
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
```

4. **Start the backend server**
```bash
npm run dev
```

Backend will run on `http://localhost:5001`

### Frontend Setup

1. **Install frontend dependencies**
```bash
cd frontend
npm install
```

2. **Start the frontend dev server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Base URL
- Development: `http://localhost:5001/api/v1`
- Production: `<your-domain>/api/v1`

### Interactive Documentation
Visit `http://localhost:5001/api-docs` for interactive Swagger UI

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "user" // optional, defaults to "user"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

#### Get All Users (Admin Only)
```http
GET /api/v1/auth/users
Authorization: Bearer <token>
```

### Notes Endpoints

All notes endpoints require authentication.

#### Get All Notes
```http
GET /api/v1/notes
Authorization: Bearer <token>

# Optional query parameters
GET /api/v1/notes?category=Personal
```

#### Get Note by ID
```http
GET /api/v1/notes/:id
Authorization: Bearer <token>
```

#### Create Note
```http
POST /api/v1/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here",
  "category": "Personal" // Personal, Work, or Others
}
```

#### Update Note
```http
PUT /api/v1/notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "content": "Updated content",
  "category": "Work"
}
```

#### Delete Note
```http
DELETE /api/v1/notes/:id
Authorization: Bearer <token>
```

### Health Check
```http
GET /api/v1/health
```

## 🔐 Security Features

1. **Password Security**
   - Passwords hashed with bcrypt (salt rounds: 10)
   - Never stored in plain text

2. **JWT Authentication**
   - Tokens expire in 7 days
   - Stored in localStorage on client
   - Sent via Authorization header

3. **Input Validation**
   - Username: 3-30 characters, alphanumeric + underscore
   - Email: Valid email format
   - Password: Min 6 characters, must contain uppercase, lowercase, and number

4. **Rate Limiting**
   - 100 requests per 60 seconds per IP
   - Prevents abuse and DDoS attacks

5. **Security Headers**
   - Helmet.js configured for security headers
   - CORS properly configured

6. **Authorization**
   - Users can only access their own notes
   - Admins can access all notes
   - Ownership verification on update/delete

## 🏗️ Project Structure

```
MERN/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   └── upstash.js         # Redis rate limiter config
│   │   ├── controllers/
│   │   │   ├── authController.js  # Auth logic
│   │   │   └── notesController.js # Notes CRUD logic
│   │   ├── middleware/
│   │   │   ├── auth.js            # JWT verification
│   │   │   ├── rateLimiter.js     # Rate limiting
│   │   │   └── validators.js      # Input validation rules
│   │   ├── models/
│   │   │   ├── User.js            # User schema
│   │   │   └── Note.js            # Note schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Auth endpoints
│   │   │   └── notesRoutes.js     # Notes endpoints
│   │   └── server.js              # Express app & server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── lib/
│   │   │   ├── axios.js           # API client
│   │   │   └── utils.js
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── CreatePage.jsx
│   │   │   └── NoteDetailPage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 📈 Scalability Considerations

### Current Implementation
1. **Modular Architecture**: Clear separation of concerns (routes, controllers, models)
2. **API Versioning**: Easy to add new API versions without breaking existing clients
3. **Database Indexing**: MongoDB indexes on userId, email for fast queries
4. **Rate Limiting**: Prevents abuse and ensures fair resource usage

### Future Enhancements
1. **Microservices Architecture**
   - Separate auth service
   - Separate notes service
   - API Gateway for routing

2. **Caching Layer**
   - Redis caching for frequently accessed notes
   - Reduced database load
   - Faster response times

3. **Load Balancing**
   - Deploy multiple backend instances
   - Use NGINX or cloud load balancers
   - Horizontal scaling

4. **Database Optimization**
   - Read replicas for scalability
   - Sharding for large datasets
   - Database connection pooling

5. **Message Queues**
   - RabbitMQ or Kafka for async operations
   - Email notifications
   - Background jobs

6. **CDN & Static Assets**
   - CloudFlare or AWS CloudFront
   - Serve frontend from CDN
   - Reduce server load

7. **Monitoring & Logging**
   - Application monitoring (New Relic, Datadog)
   - Centralized logging (ELK stack)
   - Error tracking (Sentry)

8. **Containerization**
   - Docker containers
   - Kubernetes orchestration
   - Easy deployment and scaling

## 🧪 Testing

### Manual Testing
1. Register a new user
2. Login with credentials
3. Create notes with different categories
4. Filter notes by category
5. Edit and delete notes
6. Test as admin user (create admin via MongoDB)

### Testing Admin Features
To create an admin user, update a user in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🚀 Deployment

### Backend Deployment (Example: Render/Railway)
1. Push code to GitHub
2. Connect repository to hosting service
3. Set environment variables
4. Deploy

### Frontend Deployment (Example: Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Configure API base URL for production

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=<production-mongodb-uri>
JWT_SECRET=<strong-production-secret>
UPSTASH_REDIS_REST_URL=<production-redis-url>
UPSTASH_REDIS_REST_TOKEN=<production-redis-token>
```

## 📝 License

MIT License - Feel free to use this project for learning and development.

## 👨‍💻 Author

Built as a Backend Developer Intern assignment demonstrating:
- RESTful API design
- Authentication & Authorization
- Security best practices
- Scalable architecture
- Full-stack development skills

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or feedback, reach out via the repository issues.

---

**Note**: This project demonstrates production-ready code with proper error handling, validation, security measures, and scalability considerations.
