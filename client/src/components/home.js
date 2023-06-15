import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="container1">
      <h2 className="heading">
        Welcome to Task Management
      </h2>
      <div className="buttonContainer">
        <Link to="/register">
          <button className="button">
            Sign In
          </button>
        </Link>
        <Link to="/login">
          <button className="button">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
