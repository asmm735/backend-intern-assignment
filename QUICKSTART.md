# 🚀 Quick Start Guide

## Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- Upstash Redis account (free tier works)

## Setup (5 minutes)

### 1. Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file in backend folder:**
```env
PORT=5001
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=my-super-secret-jwt-key-change-in-production
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

**Get Upstash Redis credentials:**
1. Visit https://console.upstash.com/
2. Create free account
3. Create new database
4. Copy REST URL and TOKEN to .env

**Start backend:**
```bash
npm run dev
```

✅ Backend running on http://localhost:5001

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on http://localhost:5173

## Test the Application

### 1. Register a User
- Open http://localhost:5173/register
- Create account with:
  - Username (3+ chars)
  - Email
  - Password (6+ chars with uppercase, lowercase, number)

### 2. Login
- You'll be auto-logged in after registration
- Or visit http://localhost:5173/login

### 3. Create Notes
- Click "New Note" button
- Add title, content, and select category
- Save note

### 4. Manage Notes
- View all your notes on homepage
- Filter by category using buttons
- Click on a note to edit
- Delete notes using trash icon

### 5. Test Admin Role
To test admin features, manually update a user in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

Admin users can see all notes from all users.

## API Testing

### View API Documentation
Visit http://localhost:5001/api-docs

### Test with Postman
1. Import `Postman_Collection.json`
2. Test endpoints:
   - Register: POST /api/v1/auth/register
   - Login: POST /api/v1/auth/login (saves token automatically)
   - Create Note: POST /api/v1/notes
   - Get Notes: GET /api/v1/notes

## Common Issues

### Backend won't start
- Check if MongoDB is running
- Verify .env file exists with correct values
- Check if port 5001 is available

### Frontend API errors
- Ensure backend is running on port 5001
- Check console for CORS errors
- Verify JWT token is being sent (check Network tab)

### Rate limiting errors
- Check Upstash Redis credentials
- Verify Redis URL and TOKEN in .env
- Free tier allows 10,000 requests/day

## Environment Variables

### Required for Backend
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `UPSTASH_REDIS_REST_URL` - Redis URL
- `UPSTASH_REDIS_REST_TOKEN` - Redis token

### Optional
- `PORT` - Default: 5001
- `NODE_ENV` - Default: development

## Next Steps

1. ✅ Test all CRUD operations
2. ✅ Try category filtering
3. ✅ Test authentication flow
4. ✅ Create admin user and test admin features
5. ✅ Check API documentation at /api-docs
6. ✅ Import Postman collection and test APIs

## Production Deployment

See [README.md](README.md) for detailed deployment instructions.

## Support

For issues or questions:
1. Check [README.md](README.md) for detailed documentation
2. Check [ASSIGNMENT_COMPLETION.md](ASSIGNMENT_COMPLETION.md) for feature locations
3. Check [SCALABILITY.md](SCALABILITY.md) for architecture details

---

**Ready to use!** All features are fully implemented and tested. 🎉
