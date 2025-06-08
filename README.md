# AUTH APP
A full-stack authentication app built with the MERN stack (MongoDB, Express.js, React, Node.js). Features include user signup, login, email verification, and password reset.

## Tech Stack
- **Frontend**: React, Zustand, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB
- **Deployment**: Vercel 

## Deployment
- Push to GitHub and deploy on Vercel.
- Note: backend not working in vercel so perfer to download and test on localhost

## Features
- User authentication (signup, login)
- Email verification
- Password reset

## Project Structure
mern-auth-project/
├── backend/          # Express.js backend
│   ├── config.env    # Environment variables 
│   ├── server.js     # Entry point
│   ├── routes/       # API routes
│   ├── controllers/  # Route controllers
│   └── models/       # Mongoose models
├── frontend/         # React frontend
│   ├── src/          # Source code
│   │   ├── pages/    # React components for pages
│   │   ├── components/ # Reusable components
│   │   └── store/    # Zustand state management
│   └── public/       # Static assets
└── README.md         # Project documentation

## Local Installation and Testing

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mern-auth-project.git
cd mern-auth-project
```

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Build the frontend
cd frontend
npm run build
cd ..

# Start the application (backend and frontend)
npm start

## License
This project is licensed under the MIT License.


## UI/UX
![Login](<Screenshot 2025-04-04 094659.png>)!
![Forget Password](<Screenshot 2025-04-04 094715.png>)!
![Sign Up](<Screenshot 2025-04-04 094745.png>)!
