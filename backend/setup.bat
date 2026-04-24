@echo off
REM Quick Start Script for Where IN THE World Backend (Windows)

echo.
echo 🚀 Starting Where IN THE World Backend Setup...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed
echo.

REM Install dependencies
echo === Installing Dependencies ===
call npm install

echo.
echo === Creating uploads folder ===
if not exist "uploads" mkdir uploads

echo.
echo === Setup Instructions ===
echo 1. Create a .env file in the backend folder with:
echo    MONGO_URI=mongodb://localhost:27017/where_in_the_world
echo    PORT=5000
echo.
echo 2. Make sure MongoDB is running on your system
echo.
echo 3. Start the server:
echo    npm start
echo.
echo ✓ Setup complete! Follow the instructions above to run the project.
echo.
pause
