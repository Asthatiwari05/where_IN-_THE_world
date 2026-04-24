#!/bin/bash
# Quick Start Script for Where IN THE World Backend

echo "🚀 Starting Where IN THE World Backend Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js is installed"

# Check if MongoDB is installed/running (optional check)
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found in PATH. Make sure MongoDB is running separately."
fi

echo ""
echo "=== Installing Dependencies ==="
npm install

echo ""
echo "=== Creating uploads folder ==="
mkdir -p uploads

echo ""
echo "=== Setup Instructions ==="
echo "1. Create a .env file in the backend folder with:"
echo "   MONGO_URI=mongodb://localhost:27017/where_in_the_world"
echo "   PORT=5000"
echo ""
echo "2. Make sure MongoDB is running:"
echo "   mongod  (in another terminal window)"
echo ""
echo "3. Start the server:"
echo "   npm start"
echo ""
echo "✓ Setup complete! Follow the instructions above to run the project."
