# Where IN THE World - Lost & Found Platform

A college lost-and-found platform built with Node.js, Express, MongoDB, and Tailwind CSS.

## Features

✅ Report lost or found items  
✅ Upload images of items  
✅ Search by item name, description, or location  
✅ Message item owners  
✅ Real-time updates  
✅ Mobile responsive design  
✅ Modern UI with Tailwind CSS  

---

## Tech Stack

- **Frontend**: HTML, Tailwind CSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **File Upload**: Multer

---

## Project Structure

```
where_IN-_THE_world/
├── backend/
│   ├── models/
│   │   ├── item.js           # Item schema
│   │   ├── Message.js        # Message schema
│   │   └── Claim.js          # Claims schema
│   ├── routes/
│   │   ├── itemRoutes.js     # Item endpoints
│   │   ├── messageRoutes.js  # Message endpoints
│   │   └── claimRoutes.js    # Claims endpoints
│   ├── uploads/              # Folder for uploaded images
│   ├── server.js             # Express server
│   ├── .env.example          # Environment variables template
│   └── package.json
├── frontend/
│   ├── index.html            # Homepage
│   ├── report.html           # Report form
│   └── js/
│       ├── app.js            # Main app logic
│       └── report.js         # Report form logic
└── package.json
```

---

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or MongoDB Atlas account) - [Setup Guide](https://docs.mongodb.com/manual/installation/)
- **npm** (comes with Node.js)

---

## Installation

### 1. Clone or Download Project

```bash
cd where_IN-_THE_world
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

**Packages installed:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin requests
- `multer` - File uploads
- `dotenv` - Environment variables

### 3. Install Frontend Dependencies

The frontend uses CDN for Tailwind CSS, so no installation needed. (Optional: if you want local Tailwind, add it to the frontend.)

### 4. Setup Environment Variables

Create a `.env` file in the `backend/` folder:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection:

```env
MONGO_URI=mongodb://localhost:27017/where_in_the_world
PORT=5000
```

**Option A: Local MongoDB**
```
MONGO_URI=mongodb://localhost:27017/where_in_the_world
```

**Option B: MongoDB Atlas (Cloud)**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/where_in_the_world?retryWrites=true&w=majority
```

---

## Running the Project

### 1. Start MongoDB

**If using Local MongoDB:**
```bash
mongod
```

**If using MongoDB Atlas:**
Just ensure your `.env` has the correct connection string.

### 2. Start the Backend Server

```bash
cd backend
npm start
```

Or for development with auto-reload:
```bash
npm install -g nodemon
nodemon server.js
```

You should see:
```
MongoDB Connected
Server Running
```

### 3. Open the Frontend

The frontend is in `frontend/index.html`. You can:

- **Option A**: Open directly in browser
```bash
# From the folder, right-click index.html → Open with Browser
```

- **Option B**: Use a local server (recommended)
```bash
# From root directory
npx http-server ./frontend
# Then open http://localhost:8080
```

---

## API Endpoints

### Items

**POST** `/api/items/report` - Report a lost/found item
```javascript
{
  name: "Alice",
  phone: "+1234567890",
  itemName: "Black Wallet",
  description: "Leather wallet with student ID",
  location: "Library 3rd Floor",
  type: "lost", // or "found"
  image: <file>
}
```

**GET** `/api/items` - Get all items
```javascript
Response: [
  {
    _id: "...",
    name: "Alice",
    phone: "+1234567890",
    itemName: "Black Wallet",
    description: "...",
    location: "...",
    type: "lost",
    image: "filename.jpg",
    createdAt: "2024-01-15T10:30:00Z"
  }
]
```

**GET** `/api/items/:id` - Get a single item by ID

**GET** `/api/items/search/:keyword` - Search items

### Messages

**POST** `/api/messages/send` - Send a message to item owner
```javascript
{
  itemId: "item_id",
  senderName: "Bob",
  senderPhone: "+1234567890",
  message: "I think I have your wallet!"
}
```

**GET** `/api/messages/:itemId` - Get all messages for an item

---

## How to Use

### 1. Report a Lost Item

1. Click **"Report Lost"** button on homepage
2. Fill in the form:
   - Your name & phone
   - Item name (e.g., "Black Wallet")
   - Description (color, brand, features)
   - Location where lost
   - Upload a photo
3. Click **"Report Item"**
4. Redirected to homepage

### 2. Report a Found Item

Same as above, but click **"Report Found"**

### 3. Search for Items

Use the search bar to find items by:
- Item name
- Description
- Location

### 4. Contact Item Owner

1. Find an item you can help with
2. Click **"Message Owner"**
3. Enter your name, phone, and message
4. Click **"Send Message"**

---

## Database Schema

### Item Schema

```javascript
{
  name: String,
  phone: String,
  itemName: String,
  description: String,
  location: String,
  type: String,    // "lost" or "found"
  image: String,   // filename
  createdAt: Date,
  updatedAt: Date
}
```

### Message Schema

```javascript
{
  itemId: String,
  senderName: String,
  senderPhone: String,
  message: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (`mongod` command)
- Check `.env` file has correct `MONGO_URI`
- For Atlas, ensure IP is whitelisted

### Images Not Displaying
- Check `/uploads` folder exists in `backend/`
- Verify multer is saving files correctly
- Check image path in server response

### CORS Error
- Ensure `cors()` middleware is in `server.js`
- Check frontend makes requests to `http://localhost:5000`

### Port Already in Use
- Change `PORT` in `.env` (e.g., `PORT=5001`)
- Or kill process using port 5000

---

## Development Tips

### Add More Fields

To add a field to items (e.g., `category`):

1. Update `backend/models/item.js`:
```javascript
category: String, // Add this
```

2. Update `backend/routes/itemRoutes.js`:
```javascript
category: req.body.category, // Add in POST endpoint
```

3. Update `frontend/report.html`:
```html
<input type="text" id="category" ...>
```

4. Update `frontend/js/report.js`:
```javascript
formData.append("category", document.getElementById("category").value);
```

### Enable Environment Variables File

If `.env` file is not loading:

1. Install dotenv: `npm install dotenv`
2. Add at top of `server.js`:
```javascript
require("dotenv").config();
```

---

## Future Enhancements

- User authentication (login/register)
- Email notifications
- Item match suggestions
- Admin dashboard
- Claim tracking
- Rating system
- Payment integration

---

## License

MIT License - Feel free to use for educational purposes.

---

## Support

For issues or questions:
1. Check server logs for errors
2. Verify MongoDB connection
3. Check browser console for frontend errors
4. Ensure all files are in correct folders

Happy finding! 🎉
