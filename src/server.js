const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Task = require('./models/task');
const dotenv = require("dotenv");
dotenv.config();
const User = require('./models/User.js');
const app = express();


app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const db = process.env.MONGODB_URI;

// Connection to MongoDB
mongoose.set("strictQuery", false);
try {
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Failed to connect to MongoDB:", error));
} catch (error) {
  console.log("Could not connect to MongoDB:", error);
}


// mongoose
//     .connect("mongodb://0.0.0.0:27017/task-management", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("connection sucessfull!!"))
//     .catch((err) => console.log(err));

const port = process.env.PORT || 5500;


app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.post('/api/v1/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //find the user with the username in db
    const user = await User.findOne({ email: email });
    try {
        if (user == null || password != user.password) {
            //if no user found or password is incorrect
            res
                .status(404)
                .send({ message: "Invalid Username or Password. Try Again!" });
        } else {
            console.log(user);
            res.status(200).send(user);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Error Occured" });
    }

});

app.post('/api/v1/register', async (req, res) => {
    //getting new user data from frontend
    try {

        const userData = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        await userData.save();

        res.status(200).send(userData);
        console.log("done");
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server error" });
    }

});

app.get('/api/v1/users/name', async (req, res) => {
    const email = req.query.email;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            res.status(200).send({
                name: user.name,
                userId: user.userId
            });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server error' });
    }
});

app.get('/api/v1/tasks', async (req, res) => {
    try {
        const { userId } = req.query;

        const tasks = await Task.find({ userId }).exec();

        const formattedTasks = tasks.map((task) => {
            const formattedDate = task.date.toISOString().substring(0, 10);
            return {
                ...task._doc,
                date: formattedDate,
            };
        })

        res.status(200).send(formattedTasks);
        console.log('Tasks fetched successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Internal Server error' });
    }
});

app.post('/api/v1/tasks/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const taskData = new Task({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            date: req.body.date,
            userId: userId
        });

        await taskData.save();

        res.status(200).send(taskData);
        console.log("done");
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server error" });
    }
});

app.put('/api/v1/edittask/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const updatedTask = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            date: req.body.date,
        };

        const taskData = await Task.findOneAndUpdate(
            { _id: userId },
            updatedTask,
            { new: true }
        );

        res.status(200).send(taskData);
        console.log("updated");
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server error" });
    }
});


app.delete('/api/v1/deletetask/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const taskData = await Task.findOneAndDelete({ _id: userId });
        res.status(200).send(taskData);
        console.log("deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server error" });
    }
});


app.listen(port, () =>
    console.log(`Listening on port ${port}...`
    ));

