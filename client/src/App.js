import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Registration from './components/register';
import Login from './components/login';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';
import Home from './components/home';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-task" element={<TaskForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
