# 🚀 GET STARTED - Deploy CRMS to Render

**Welcome!** This guide will help you deploy your College Result Management System to Render in ~15 minutes.

---

## 📸 Deployment Flow

![Deployment Flowchart](See deployment_flowchart image in artifacts)

**Total Time: ~14 minutes**

---

## 🎯 Step-by-Step Instructions

### STEP 1: Create GitHub Repository (2 minutes)

1. **Open browser** and go to: https://github.com/new

2. **Fill in the form**:
   - Repository name: `crms-deployment`
   - Description: `College Result Management System`
   - Visibility: **Public** ✅ (or Private if you prefer)
   - ❌ **DO NOT** check "Add a README file"
   - ❌ **DO NOT** add .gitignore
   - ❌ **DO NOT** choose a license

3. **Click "Create repository"**

4. **Copy the HTTPS URL** shown on the next page:
   ```
   https://github.com/YOUR_USERNAME/crms-deployment.git
   ```

---

### STEP 2: Push Code to GitHub (1 minute)

Open your terminal in the project folder and run:

```powershell
# Add GitHub as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/crms-deployment.git

# Push code
git branch -M main
git push -u origin main
```

**✅ Success!** Your code is now on GitHub!

---

### STEP 3: Set Up MongoDB Atlas (3 minutes)

1. **Go to**: https://www.mongodb.com/cloud/atlas/register

2. **Create account** (or sign in)

3. **Create FREE cluster**:
   - Click "Build a Database"
   - Choose **FREE** (M0) tier
   - Cloud Provider: Any (AWS, Google, Azure)
   - Region: Choose closest to you
   - Cluster Name: `crms-cluster`
   - Click "Create"

4. **Create Database User**:
   - You'll see "Security Quickstart"
   - Username: `crms-admin`
   - Password: Click "Autogenerate Secure Password" and **COPY IT!**
   - Click "Create User"

5. **Add IP Address**:
   - Choose "Cloud Environment"
   - Or manually add: `0.0.0.0/0` (allows all IPs)
   - Click "Finish and Close"

6. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Drivers"
   - Copy the connection string:
     ```
     mongodb+srv://crms-admin:<password>@crms-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **Replace `<password>`** with the password you copied earlier
   - **SAVE THIS STRING!** You'll need it in Step 4

---

### STEP 4: Deploy Backend to Render (5 minutes)

1. **Go to**: https://dashboard.render.com

2. **Sign up/Login** (you can use GitHub to sign in)

3. **Create Web Service**:
   - Click "New +" button (top right)
   - Select "Web Service"
   - Click "Connect GitHub" (authorize Render to access your repos)
   - Find and select `crms-deployment` repository

4. **Configure Service**:
   Fill in these fields:
   - **Name**: `crms-backend`
   - **Region**: Choose your region (e.g., Singapore, Frankfurt, Oregon)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable"
   
   Add these **10 variables** (click "Add Environment Variable" for each):

   ```
   NODE_ENV = production
   PORT = 10000
   MONGODB_URI = <paste your MongoDB connection string from Step 3>
   JWT_SECRET = <generate random 32-character string - see below>
   JWT_EXPIRE = 24h
   FRONTEND_URL = https://crms-frontend.onrender.com
   RATE_LIMIT_WINDOW_MS = 900000
   RATE_LIMIT_MAX = 100
   BCRYPT_ROUNDS = 10
   ```

   **For JWT_SECRET**, use a random 32-character string like:
   ```
   H7k9P2mQxZ4vB8nW1rT5yU3jE6fG9hL0
   ```
   Or generate one at: https://generate-random.org/string

6. **Create Web Service**:
   - Click "Create Web Service" button at bottom
   - Wait 2-5 minutes (you'll see build logs)
   - When done, you'll see ✅ "Live"

7. **Copy Backend URL**:
   - At the top, you'll see your URL like: `https://crms-backend-xxxx.onrender.com`
   - **SAVE THIS URL!** You'll need it!

8. **Test Backend**:
   - Click the URL or open it in browser
   - You should see JSON:
     ```json
     {
       "success": true,
       "message": "CRMS API Server",
       "version": "1.0.0"
     }
     ```
   - ✅ If you see this, backend is working!

---

### STEP 5: Deploy Frontend to Render (3 minutes)

1. **Still in Render Dashboard**, click "New +" → "Static Site"

2. **Select Repository**: Choose `crms-deployment`

3. **Configure Static Site**:
   - **Name**: `crms-frontend`
   - **Branch**: `main`
   - **Root Directory**: Leave **empty** (or just put `.`)
   - **Build Command**: `echo "No build needed"`
   - **Publish Directory**: `.`

4. **Create Static Site**:
   - Click "Create Static Site"
   - Wait 1-2 minutes
   - When done, you'll see ✅ "Live"

5. **Copy Frontend URL**:
   - Save it like: `https://crms-frontend-xxxx.onrender.com`
   - **This is your main app URL!** 🎉

---

### STEP 6: Update API URLs (2 minutes)

Now connect frontend and backend:

#### 6.1: Update Backend CORS

1. In Render Dashboard → Click `crms-backend` service
2. Go to "Environment" tab (left sidebar)
3. Find `FRONTEND_URL` variable
4. Click "Edit" (pencil icon)
5. **Change to**: Your actual frontend URL from Step 5
   ```
   https://crms-frontend-xxxx.onrender.com
   ```
6. Click "Save Changes"
7. Backend will automatically redeploy (~30 seconds)

#### 6.2: Update Frontend Config

1. On your computer, open `js/config.js`
2. **Line 8**: Update with your backend URL:
   ```javascript
   PRODUCTION_API_URL: 'https://crms-backend-xxxx.onrender.com/api',
   ```
3. Save the file
4. Push to GitHub:
   ```powershell
   git add js/config.js
   git commit -m "Update production API URL"
   git push
   ```
5. Frontend will auto-redeploy (~1 minute)

---

## 🎉 STEP 7: You're Live!

### Your Live URLs:

**🌐 Main App (share this!):**
```
https://crms-frontend-xxxx.onrender.com
```

**🔧 Backend API:**
```
https://crms-backend-xxxx.onrender.com
```

---

## ✅ Test Your Deployment

1. **Open your frontend URL** in browser
2. You should see **CRMS Login Page**
3. **Test login**:
   - If you haven't seeded database, you'll need to create users
   - See "Seed Database" section below

---

## 🌱 Seed Database (Optional but Recommended)

To add default users for testing:

1. Go to Render Dashboard → `crms-backend` service
2. Click "Shell" tab (left sidebar)  
3. Wait for shell to load
4. Run:
   ```bash
   npm run seed
   ```
5. You'll see confirmation message

**Default login credentials**:
- Admin: `admin@college.edu` / `admin123`
- HOD: `hod@college.edu` / `hod123`
- Faculty: `faculty@college.edu` / `faculty123`
- Student: `student@college.edu` / `student123`

**⚠️ IMPORTANT**: Change these passwords immediately after first login!

---

## 🎯 Next Steps

- [ ] Test all features
- [ ] Seed database with default users
- [ ] Change default passwords
- [ ] Add your own students/faculty
- [ ] Share frontend URL with users!

---

## ⚠️ Free Tier Notes

Render's free tier:
- ✅ Completely free
- ⚠️ Services sleep after 15 min of inactivity  
- ⏱️ First request after sleep takes ~30 seconds
- 💡 **Not an issue** - just wait on first load each day

To keep services awake 24/7, upgrade to paid plan ($7/month per service).

---

## 🆘 Troubleshooting

### "Backend Not Starting"
- ✅ Check MongoDB connection string in environment variables
- ✅ Verify password in connection string is correct
- ✅ Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- ✅ Review logs in Render dashboard

### "Frontend Can't Connect"
- ✅ Verify backend URL in `js/config.js` is correct
- ✅ Check backend `FRONTEND_URL` environment variable
- ✅ Open browser console (F12) to see actual errors
- ✅ Make sure both services show "Live" in Render

### "Database Connection Failed"
- ✅ Test connection string format
- ✅ Verify username and password
- ✅ Check MongoDB Atlas cluster is running
- ✅ Confirm network access allows all IPs

### "Service Taking Too Long"
- ⏱️ First deploy can take 3-5 minutes
- ⏱️ Free tier services spin down, first load after sleep takes ~30 sec
- 🔄 Try refreshing after 30 seconds

---

## 📚 Additional Resources

- **Quick Reference**: See `quick-deploy.md`
- **Detailed Guide**: See `deploy-to-render.md`
- **Full Documentation**: See `DEPLOYMENT.md`
- **Project README**: See `README.md`

---

## 🎊 Congratulations!

Your CRMS is now **LIVE ON THE INTERNET**! 🚀

Share your frontend URL with students, faculty, and administrators!

```
🌐 https://crms-frontend-xxxx.onrender.com
```

---

**Questions?** Check the troubleshooting section or review the detailed guides!

**Happy deploying!** 🎉
