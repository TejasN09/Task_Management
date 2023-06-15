import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import TaskCard from './taskCard';
import TaskForm from './taskForm';
import Nav from './navbar';
import '../styles/taskCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

const styles = {
    backgroundColor: '#cccccc',
    minHeight: '100vh',
    width: '100%',
}

const TaskList = () => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const nameParam = urlParams.get('name');
        const userIdParam = urlParams.get('userId');

        setName(nameParam);
        setUserId(userIdParam);
        fetchTasks(userIdParam);
    }, [userId]);


    const fetchTasks = async (userId) => {
        try {
            const response = await fetch(`/api/v1/tasks?userId=${encodeURIComponent(userId)}`);
            const data = await response.json();
            const updatedTasks = data.map(task => ({ ...task, id: task.id }));
            setTasks(updatedTasks);
            // console.log('Tasks:', updatedTasks);
        } catch (error) {
            console.log(error);
        }
    };


    const handleEdit = async (task) => {
        const updatedTask = {
            name: task.name,
            description: task.description,
            status: task.status,
            date: task.date,
        };

        try {
            // Make a PUT request to update the task
            const response = await fetch(`/api/v1/edittask/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                const updatedTasks = tasks.map((t) => (t._id === task._id ? updatedTask : t));
                setTasks(updatedTasks);
                console.log('Task updated:', updatedTask);
            } else {
                console.log('Failed to update task');
            }
        } catch (err) {
            console.log(err);
        }
        console.log('Edit task:', task);
    };

    const handleDelete = async (task) => {
        try {
            // Make a DELETE request to delete the task
            const response = await fetch(`/api/v1/deletetask/${task._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the task from the tasks array
                const updatedTasks = tasks.filter((t) => t._id !== task._id);
                setTasks(updatedTasks);
                console.log('Task deleted:', task);

                window.location.reload();
            } else {
                console.log('Failed to delete task');
            }
        } catch (err) {
            console.log(err);
        }
        console.log('Delete task:', task);
    };

    const handleComplete = async (task) => {
        const updatedTask = { ...task, status: 'Completed' };

        try {
            console.log('Updating task:', task);
            console.log('Updated task:', updatedTask);

            const response = await fetch(`/api/v1/edittask/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                const updatedTasks = tasks.map((t) => (t._id === task._id ? updatedTask : t));
                setTasks(updatedTasks);
                console.log('Task status updated:', updatedTask);
            } else {
                console.log('Failed to update task status');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleFormSubmit = async (task) => {
        // Handle form submission logic here
        // Retrieve form input values from formData and perform necessary actions
        try {
            const response = await fetch(`/api/v1/tasks/${task.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                setUserId(task.userId);
                // fetchTasks(userId);
                console.log('added');
            } else {
                console.log('failed');
            }
        } catch (err) {
            console.log(err);
        }
        console.log(task);
        setShowForm(false);
        fetchTasks(task.userId);
    };



    const handleFormClose = () => {
        setShowForm(false);
    };

    const handleAdd = () => {
        setShowForm(true);
    };

    // console.log(userId)
    return (
        <div style={styles}>
            <Nav name={name} />
            <h2 style={{ fontWeight: 'bold' }}><FontAwesomeIcon icon={faTasks} /> Conquer Your Tasks</h2>
            {
                tasks.length === 0 ? (
                    <>
                        <p>No tasks available. Add a task to get started.</p>
                        {showForm && <TaskForm onClose={handleFormClose} onSubmit={handleFormSubmit} />}
                        <Button className="add-button rounded-circle" onClick={handleAdd}>+</Button>
                    </>
                ) : (
                tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onComplete={handleComplete}
                        userId={userId}
                    />
                ))
                )
            }
            {showForm && <TaskForm onClose={handleFormClose} onSubmit={handleFormSubmit} userId={userId} />}
            <Button className="add-button rounded-circle" onClick={handleAdd}>+</Button>
        </div>
    );
};

export default TaskList;
