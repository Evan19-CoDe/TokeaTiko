# TokeaTiko
This is the PLP Project.

TOKEATIKO PLATFORM.


# Event Ticket Store - MERN Stack Application

![Event Ticket Store Screenshot](./screenshot.png)

A full-stack event ticket marketplace built with the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS v4. Users can browse events, purchase tickets, leave reviews, and more.

## Features

- **User Authentication**: Register, login, and profile management
- **Event Listings**: Browse events with images, videos, and location info
- **Shopping Cart**: Add/remove tickets before checkout
- **Payment Processing**: M-Pesa for mobile payments
- **Reviews & Ratings**: Users can leave feedback on events
- **Location Services**: Interactive maps showing event venues
- **Responsive Design**: Works on all device sizes

## Technologies Used

### Frontend
- React.js
- Tailwind CSS v4
- Redux Toolkit (State management)
- React Router (Routing)
- React Leaflet (Maps)
- Formik & Yup (Form validation)
- Axios (HTTP requests)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JSON Web Tokens (Authentication)
- M-Pesa API (Mobile payments)
- Cloudinary (Media storage)

### Development Tools
- Vite (Frontend tooling)
- PNPM (Package manager)
- Postman (API testing)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PNPM (install via `npm install -g pnpm`)
- MongoDB (local or Atlas URI)
- M-Pesa API keys (for payment processing)

### Installation

1. **Clone the repository**
   bash
   git clone https://github.com/Evan19-CoDe/TokeaTiko.git
   cd TokeaTiko

2. **Install Dependencies**
   Install dependencies

   bash
# Install server dependencies
  cd ../server
  pnpm install

# Install client dependencies
  cd ../client
  pnpm install


## Features Implemented
User System
Registration with email/password

JWT-based authentication

Protected routes for authenticated users

Profile management

Event Management
Create, read, update, delete events

Event images and videos upload (using Cloudinary)

Geolocation with address lookup

Event categories and filtering

Shopping Experience
Add/remove tickets to cart

Cart persistence (local storage)

Checkout process

Order history

Payments

M-Pesa integration for mobile payments

Payment confirmation emails (would require email service)

Reviews & Ratings
Leave reviews for attended events

Star rating system

Review moderation

Admin Features
Event management

User management

Sales reporting


## PROJECT STRIUCTURE

event-ticket-store/
├── client/                  # Frontend React application
│   ├── public/              # Static files
│   ├── src/                 # React source files
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── tailwind.config.js   # Tailwind configuration
│   └── vite.config.js       # Vite configuration
│
├── server/                  # Backend Express application
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── server.js            # Server entry point
│   └── .env                 # Environment variables
│
├── .gitignore
└── README.md