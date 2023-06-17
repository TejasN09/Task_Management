import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { BsPencil, BsTrash, BsCheck } from 'react-icons/bs';
import '../styles/taskCard.css';
import { BASE_URL } from '../services/helper';

const TaskCard = ({ task, onEdit, onDelete, onComplete, userId }) => {
  const { name, description, date } = task;
  let { status } = task;
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDate, setEditedDate] = useState(date);
  const [editedStatus, setEditedStatus] = useState(status);
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState('');

  // console.log(userId)
  useEffect(() => {
    fetchTasks(userId);
  }, [userId]);

  const fetchTasks = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks?userId=${encodeURIComponent(userId)}`);
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    if (editMode) {
      const editedTask = {
        ...task,
        name: editedName,
        description: editedDescription,
        date: editedDate,
        status: editedStatus,
      };
      onEdit(editedTask);
    }
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    onDelete(task);
  };

  const handleComplete = () => {
    const completedTask = { ...task, status: 'completed' };
    status = 'completed';
    onComplete(completedTask);
  };


  return (
    <div className="main">
      <Card className="task-card">
        {editMode ? (
          <Form.Control
            style={{ backgroundColor: '#2b2b2b', color: 'white' }}
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          <div className="task-name">{name}</div>
        )}
        <div className="task-details" style={{marginBottom:"15px"}}>
          {editMode ? (
            <Form.Control
              style={{ backgroundColor: '#2b2b2b', color: 'white' }}
              as="input"
              rows={2}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          ) : (
            <div className="task-description">{description}</div>
          )}
          <div className="task-actions">
            <Button variant="dark" size="sm" onClick={handleEdit}>
              {editMode ? <BsCheck /> : <BsPencil />}
            </Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              <BsTrash />
            </Button>
            <Button variant="success" size="sm" onClick={handleComplete}>
              <BsCheck />
            </Button>
          </div>
        </div>
        {editMode ? (
          <Form.Control
            style={{ backgroundColor: '#2b2b2b', color: 'white' }}
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
        ) : (
          <div className="task-date">{date}</div>
        )}
        <div className="task-status">{status}</div>
      </Card>
    </div>
  );
};

export default TaskCard;
