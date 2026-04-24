# 🚀 Quick Start Guide - Where IN THE World

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Create `.env` File
Create a file named `.env` in the `backend/` folder:

```env
MONGO_URI=mongodb://localhost:27017/where_in_the_world
PORT=5000
```

Or use MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/where_in_the_world?retryWrites=true&w=majority
PORT=5000
```

### Step 3: Start MongoDB
**Windows:**
```bash
mongod
```

**Mac/Linux:**
```bash
brew services start mongodb-community
```

### Step 4: Start the Backend Server
```bash
npm start
```

Expected output:
```
MongoDB Connected
Server Running
```

### Step 5: Open the Frontend
Open this file in your browser:
```
frontend/index.html
```

Or use a local server:
```bash
npx http-server ./frontend
```

---

## ✅ What's Included

| Feature | Status |
|---------|--------|
| Report Lost Items | ✓ |
| Report Found Items | ✓ |
| Image Upload | ✓ |
| Search Items | ✓ |
| Message Owner | ✓ |
| MongoDB Database | ✓ |
| Mobile Responsive | ✓ |
| Modern UI | ✓ |

---

## 📁 Project Endpoints

```
GET  /api/items              - Get all items
POST /api/items/report       - Report a lost/found item
GET  /api/items/:id          - Get single item
GET  /api/items/search/:keyword - Search items

POST /api/messages/send      - Send message to owner
GET  /api/messages/:itemId   - Get messages for item
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB Connection Error | Ensure MongoDB is running + check `.env` |
| Images not showing | Check `/uploads` folder exists |
| Port 5000 in use | Change `PORT` in `.env` |
| CORS Error | Should be auto-enabled, check server.js |

---

## 💡 Next Steps

- Add user authentication
- Deploy to Heroku/Railway
- Add email notifications
- Create admin dashboard
- Add item categories

---

**Questions?** Check the full README.md file for detailed documentation.
