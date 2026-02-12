# 📋 Steps to Upload to GitHub

## 1. Initialize Git Repository

```bash
# Navigate to project root
cd C:\Users\asmit\Desktop\MERN

# Initialize git (if not already done)
git init

# Check what will be committed
git status
```

## 2. Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name:** `notes-api-authentication` or `backend-intern-assignment`
3. **Description:** "Full-stack MERN app with JWT authentication & role-based access - Backend Developer Intern Assignment"
4. **Visibility:** Public
5. **DO NOT** initialize with README (we already have one)
6. Click **Create repository**

## 3. Commit Your Code

```bash
# Add all files (respects .gitignore)
git add .

# Commit with meaningful message
git commit -m "Initial commit: Backend Developer Intern assignment - Complete MERN app with JWT auth"

# Rename branch to main (if needed)
git branch -M main
```

## 4. Connect to GitHub

**Replace `YOUR_USERNAME` and `REPO_NAME` with your actual values:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## 5. Verify Upload

1. Go to your GitHub repository
2. Check that files are uploaded
3. **Verify .env is NOT uploaded** (should be in .gitignore)
4. README.md should be displayed on the homepage

## 6. Update Repository Settings (Optional)

### Add Topics
Go to **About** section (top right) and add topics:
- `nodejs`
- `expressjs`
- `mongodb`
- `react`
- `jwt-authentication`
- `rest-api`
- `mern-stack`
- `backend-developer`

### Add Description
```
Full-stack MERN application with JWT authentication, role-based access control, and comprehensive API documentation. Backend Developer Intern Assignment.
```

## 7. Final Checklist ✅

Before submitting:
- [ ] `.env` file is **NOT** in the repository (check .gitignore)
- [ ] README.md is comprehensive and displays properly
- [ ] All code is committed and pushed
- [ ] Repository is public
- [ ] Description and topics are added
- [ ] SUBMISSION.md has your contact information filled in

## 8. Share Repository

**For Email Submission:**
```
Subject: Backend Developer Intern Assignment - [Your Name]

Body:
Hi,

Please find my completed Backend Developer Intern assignment:

GitHub Repository: https://github.com/YOUR_USERNAME/REPO_NAME
Candidate: [Your Name]
Email: [Your Email]

Assignment Highlights:
✅ Full authentication system with JWT & bcrypt
✅ Role-based access control (user/admin)
✅ CRUD operations for notes with ownership validation
✅ API versioning (/api/v1/)
✅ Complete API documentation (Swagger + Postman)
✅ React frontend with protected routes
✅ Comprehensive security & scalability considerations

Setup Instructions: See README.md
API Documentation: Available at /api-docs endpoint
Time Spent: ~3 hours

Looking forward to your feedback!

Best regards,
[Your Name]
```

## Common Issues & Solutions

### Issue: .env file is in repository
```bash
# Remove it from git
git rm --cached backend/.env

# Commit the removal
git commit -m "Remove .env file from tracking"
git push
```

### Issue: Too many files being committed
```bash
# Check what's being tracked
git status

# If node_modules is showing, add to .gitignore:
echo "node_modules/" >> .gitignore

# Remove from git
git rm -r --cached node_modules/
git commit -m "Remove node_modules from tracking"
```

### Issue: Need to update after changes
```bash
git add .
git commit -m "Update: [describe what you changed]"
git push
```

## 🎉 Done!

Your project is now on GitHub and ready for submission!

**Next Steps:**
1. Update [SUBMISSION.md](SUBMISSION.md) with your personal information
2. Test the GitHub repository by cloning it in a different folder
3. Verify setup instructions work correctly
4. Send submission email to: joydip@primetrade.ai, hello@primetrade.ai, chetan@primetrade.ai, sonika@primetrade.ai
