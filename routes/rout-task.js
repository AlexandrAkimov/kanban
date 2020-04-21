const { Router } = require("express");
const dataMock = require('../models/task');
const router = Router();

// router.get('/api/tasks', async (req, res) => {


//     const tasks = await dataMock.find().lean();

//     //res.set('Access-Control-Allow-Origin', '*')
//     // res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
//     // res.setHeader('Content-Type', 'application/json; charset=utf-8');
//     res.status(200).json(tasks)
// })

router.get('/api/tasks/:id', async (req, res) => {
    const tasks = await dataMock.find().lean();
    const targetTask = tasks[0].issues.find(item => item.id === req.params.id)
    //res.json({test: 1})
    res.status(200).json(targetTask) 
    
})

module.exports = router