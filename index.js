const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const dataMock = require('./models/task');
const tasksRoutes = require('./routes/tasks');
const routTaskRoutes = require('./routes/rout-task.js');
const keys = require('./keys')
const app = express();
app.use(express.json())
app.get('/api/tasks', async (req, res) => {
  const tasks = await dataMock.find().lean();
  res.status(200).json(tasks.reverse())
})
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/tasks', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
app.get('/api/tasks/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'routing.html'))
})
app.use(express.urlencoded({ extended: true }));
app.use('/', tasksRoutes);
app.use('/:id', routTaskRoutes);
const PORT = process.env.PORT || 3000;
async function start() {
    try {
        await mongoose.connect(keys.url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        app.listen(3000, "127.0.0.1", () => {
            console.log(`Server is running on port ${PORT}`);
        })

    } catch (e) {
        console.log(e);
    }
}
start();
