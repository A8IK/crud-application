# Overview
This project aimed to create a dynamic data management application using React.js(frontend), Python(backend) and Tailwind CSS. The application features included CRUD operations (Create, Read, Update, Delete) for financial data, pagination, sorting, and styling with Tailwind CSS.

# Features Implemented
Data Management: Implemented CRUD operations using Axios for API interactions also used SQLite.

Form Handling: Managed form inputs for adding and editing data.

Pagination: Implemented pagination to display large datasets efficiently.

Sorting: Sorted data based on year, month, and date criteria.

Styling with Tailwind CSS: Utilized Tailwind CSS for responsiveness.

# Technologies Used
React: Used for building the frontend user interface.

Tailwind CSS: Used for styling and responsive design.

Axios: Used for handling API requests to the backend server.

SQLAlchemy: For simplifies database integration and management which work with SQLite.

# Lessons Learned
1. Learned effective state management in React to ensure data consistency and UI responsiveness.
2. Tailwind CSS utility classes for rapid UI development without custom CSS.
3. Improved skills in handling CRUD operations with Axios and asynchronous JavaScript.
4. Gained insights into designing user-friendly interfaces with attention to usability and aesthetics.
5. As I am first time using python in backend I have learned how to connect and manage lots of data.
6. More understanding about frameworks and libraries such as React, react-charjs2, Flask, and SQLAlchemy.

# Challenges
Data Handling and Synchronization: Data displayed in the frontend (React) remained synchronized with data stored in the backend (Flask with SQLite). This required implementing mechanisms for fetching data, handling updates (CRUD operations), and ensuring that changes made by users in the frontend were accurately reflected in the database. And sorting data is another challenges for me. I just sorted data by year and month only but couldn't make with date properly.

Frontend-Backend Communication: As I am first time using python in backend so I had to research and learn about this connection from different sources. 

User Interface Design and Interaction: Imagination a user-friendly interface (UI) that provides intuitive data entry was challenging. This involved implementing responsive design, ensuring accessibility, and optimizing performance and usability.

Error Handling and Validation: Implementing robust error handling mechanisms both in the frontend and backend was crucial. This included validating user inputs, handling server-side errors (e.g., database query failures), and providing meaningful feedback to users to facilitate smooth interaction and prevent data inconsistencies.


# Getting Started with React App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Getting Start Python

In the project directory (backend) you can run:

## python app.py
You can open the server for check http://127.0.0.1:5000/




