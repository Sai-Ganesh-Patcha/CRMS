# ✅ CRMS Deployment Checklist

Use this checklist to track your deployment progress!

---

## 📋 Pre-Deployment

- [ ] Code is committed to git locally ✅ (Already done!)
- [ ] All deployment guides are created ✅ (Already done!)
- [ ] Read `DEPLOYMENT-SUMMARY.md` to understand what's next

---

## 🚀 Deployment Steps

### 1. GitHub Setup
- [ ] Go to https://github.com/new
- [ ] Create repository named `crms-deployment`
- [ ] Set visibility (Public or Private)
- [ ] Copy repository URL
- [ ] Run: `git remote add origin <URL>`
- [ ] Run: `git branch -M main`
- [ ] Run: `git push -u origin main`
- [ ] Verify code is visible on GitHub

### 2. MongoDB Atlas Setup
- [ ] Go to https://mongodb.com/cloud/atlas
- [ ] Create account or sign in
- [ ] Create FREE M0 cluster
- [ ] Choose cloud provider and region
- [ ] Name cluster: `crms-cluster`
- [ ] Create database user: `crms-admin`
- [ ] Generate and save password securely
- [ ] Add IP address: `0.0.0.0/0` (all IPs)
- [ ] Get connection string
- [ ] Replace `<password>` in connection string
- [ ] Save connection string securely

### 3. Render - Backend Deployment
- [ ] Go to https://dashboard.render.com
- [ ] Sign up or login
- [ ] Connect GitHub account
- [ ] Create "Web Service"
- [ ] Select `crms-deployment` repository
- [ ] Name: `crms-backend`
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Instance Type: Free
- [ ] Add all 10 environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=10000`
  - [ ] `MONGODB_URI=<your_connection_string>`
  - [ ] `JWT_SECRET=<32_char_random_string>`
  - [ ] `JWT_EXPIRE=24h`
  - [ ] `FRONTEND_URL=https://crms-frontend.onrender.com`
  - [ ] `RATE_LIMIT_WINDOW_MS=900000`
  - [ ] `RATE_LIMIT_MAX=100`
  - [ ] `BCRYPT_ROUNDS=10`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (2-5 min)
- [ ] Copy backend URL
- [ ] Test backend URL in browser (should show JSON)

### 4. Render - Frontend Deployment
- [ ] In Render, create "Static Site"
- [ ] Select `crms-deployment` repository
- [ ] Name: `crms-frontend`
- [ ] Root Directory: leave empty
- [ ] Build Command: `echo "No build needed"`
- [ ] Publish Directory: `.`
- [ ] Click "Create Static Site"
- [ ] Wait for deployment (1-2 min)
- [ ] Copy frontend URL
- [ ] Save frontend URL (this is your main app!)

### 5. Update API URLs
- [ ] Go to backend service in Render
- [ ] Edit `FRONTEND_URL` environment variable
- [ ] Change to actual frontend URL
- [ ] Save (backend will redeploy)
- [ ] Wait for backend redeploy (~30 sec)
- [ ] Edit local `js/config.js` file
- [ ] Update `PRODUCTION_API_URL` with backend URL
- [ ] Save file
- [ ] Run: `git add js/config.js`
- [ ] Run: `git commit -m "Update API URL"`
- [ ] Run: `git push`
- [ ] Wait for frontend redeploy (~1 min)

---

## 🧪 Testing

- [ ] Open frontend URL in browser
- [ ] Login page appears
- [ ] Page loads without errors
- [ ] Check browser console (F12) - no errors
- [ ] Test backend API directly (should return JSON)

---

## 🌱 Database Seeding (Optional)

- [ ] Go to backend service in Render
- [ ] Open "Shell" tab
- [ ] Run: `npm run seed`
- [ ] Verify seed completed successfully
- [ ] Test login with default credentials
- [ ] Change all default passwords immediately

---

## 🎉 Post-Deployment

- [ ] All features are working
- [ ] Default passwords changed
- [ ] Frontend URL saved
- [ ] Backend URL saved
- [ ] MongoDB connection string saved securely
- [ ] Share frontend URL with users
- [ ] Document any custom configuration

---

## 📝 Your Deployment Info

Fill this in as you go:

**GitHub Repository**:
```
https://github.com/____________/crms-deployment
```

**MongoDB Connection String**:
```
mongodb+srv://crms-admin:____________@____________.mongodb.net/?retryWrites=true&w=majority
```

**Backend URL** (Render):
```
https://crms-backend-____________.onrender.com
```

**Frontend URL** (Render) - **SHARE THIS!**:
```
https://crms-frontend-____________.onrender.com
```

**JWT Secret** (keep private):
```
____________________________________________
```

---

## 🆘 Troubleshooting

If something goes wrong, check:

- [ ] All environment variables are set correctly
- [ ] MongoDB connection string has correct password
- [ ] MongoDB IP whitelist includes `0.0.0.0/0`
- [ ] Both services show "Live" in Render
- [ ] API URLs are correctly updated
- [ ] Check Render logs for specific errors

---

## ✅ Deployment Complete!

Once all checkboxes are checked, your CRMS is LIVE! 🎉

**Share your frontend URL with:**
- Students
- Faculty
- HOD
- Administrators

---

**Need help?** Refer to:
- `GET-STARTED.md` - Detailed walkthrough
- `quick-deploy.md` - Quick reference
- `DEPLOYMENT-SUMMARY.md` - Overview

**Time to deployment**: ~15 minutes if you follow the checklist! ⏱️
