const mongoose = require('mongoose');
const express = require('express');


const task = {
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    status:{
        type: String,
    },
    userId: {
        type: String,
        ref: 'User', 
        required: true
    }

};

const Task = mongoose.model('Task', task);

module.exports = Task;



