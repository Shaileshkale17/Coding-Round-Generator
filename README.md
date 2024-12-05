# Coding Round Generator

A web-based application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to generate coding challenges for different technologies, difficulty levels, and topics. This project helps software developers practice coding interviews and challenges by providing a randomized task generator with customizable filters.

## Features

- **Challenge Filters**:

  - Technology (Python, JavaScript, MERN Stack, etc.)
  - Difficulty (Easy, Medium, Hard)
  - Topic (Algorithms, Data Structures, CRUD, etc.)

- **Randomized Task Generator**: Based on selected filters, a random coding challenge will be displayed.

- **Task Details**: Shows challenge description, tags, and estimated time to complete.

- **Modern UI**: Built with React.js for a smooth user experience.

## Technologies Used

- **Frontend**:
  - React.js
  - Redux (for state management, if applicable)
  - Axios (for API calls)
  - CSS/SCSS (for styling)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (to store tasks and user data)

## Getting Started

Follow these steps to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) - JavaScript runtime environment
- [MongoDB](https://www.mongodb.com/try/download/community) - Database to store coding tasks and user data (local or cloud)
- [npm](https://www.npmjs.com/) - Node package manager

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/coding-round-generator.git
   cd coding-round-generator
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Set up MongoDB:**

   - Create a `config.env` file in the backend directory with the following variables:

     ```
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

   - If you're using MongoDB Atlas, get your connection string from the [MongoDB Atlas Dashboard](https://www.mongodb.com/cloud/atlas).

4. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Run the Application**

   - Start the backend server:

     ```bash
     cd backend
     npm start
     ```

   - Start the frontend development server:

     ```bash
     cd frontend
     npm start
     ```

   Your app should now be running at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

### Usage

- When the application starts, you’ll see a form with options to select technology, difficulty, and topic.
- Select your filters and click "Generate" to see a random coding task based on your selection.
- The task will show its title, description, tags, and estimated completion time.

### Example API (Backend)

The backend provides an API to get coding tasks:

- **GET /api/tasks** - Fetch all tasks
- **GET /api/tasks/random** - Fetch a random task based on selected filters
- **POST /api/tasks** - Add a new task to the database (for admin or developer use)

## Folder Structure

```
coding-round-generator/
├── backend/
│   ├── controllers/           # Contains logic to handle API requests
│   ├── models/                # Database models for MongoDB
│   ├── routes/                # API routes
│   ├── config/                # Configuration files (e.g., MongoDB URI)
│   ├── server.js              # Backend entry point (Express app)
│   └── package.json           # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # React pages (Home, Task details)
│   │   ├── App.js             # Main entry point for React
│   │   ├── index.js           # React DOM rendering
│   │   └── package.json       # Frontend dependencies
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore file
```

## Deployment

### Deploying to Heroku

1. **Create a Heroku account** and [install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
2. **Create a new app** on Heroku:

   ```bash
   heroku create coding-round-generator
   ```

3. **Add environment variables** for MongoDB URI:

   ```bash
   heroku config:set MONGO_URI=your_mongodb_connection_string
   ```

4. **Push your code to Heroku**:

   ```bash
   git push heroku master
   ```

5. **Open the app**:

   ```bash
   heroku open
   ```

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, create a new branch, and submit a pull request.

### Bug Fixes and Features

- Report issues via GitHub issues page.
- Submit pull requests for enhancements, bug fixes, or features.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---
