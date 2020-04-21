const { Router } = require("express");
const dataMock = require('../models/task');
const router = Router();
router.post('/api/tasks', async (req, res) => {
    console.log(req.body);
    //res.json({test: 1})
    const task = new dataMock({
        title: req.body.title,
        issues: [
            {
                id: req.body.issues[0].id,
                name: req.body.issues[0].name,
                description: req.body.issues[0].description,
            }
        ]
    });  
    try {
        await task.save();
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
})
router.post('/api/tasks/update-ready', async (req, res) => {
    const data = await dataMock.find().lean()
    id = data[1]._id;
    try {
        await dataMock.updateOne({_id: id}, {$push:{'issues': req.body}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
})
router.post('/api/tasks/update-progress', async (req, res) => {
    const data = await dataMock.find().lean()
    id = data[2]._id;
    try {
        await dataMock.updateOne({_id: id}, {$push:{'issues': req.body}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
})
router.post('/api/tasks/update-finished', async (req, res) => {
    const data = await dataMock.find().lean()
    id = data[3]._id;
    try {
        await dataMock.updateOne({_id: id}, {$push:{'issues': req.body}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
})
router.post('/api/tasks/update', async (req, res) => {
    console.log(req.body);
    const data = await dataMock.find().lean()
    console.log(data[0]._id);
    id = data[0]._id
    try {
        await dataMock.updateOne({_id: id}, {$push:{'issues': req.body}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
    //res.redirect('/api/tasks')
})
router.delete('/api/tasks/update', async (req, res) => {
    console.log(req.body);
    const data = await dataMock.find().lean()
    console.log(data[0]._id);
    id = data[0]._id
    try {
        await dataMock.updateOne({_id: id}, {$pull:{'issues': req.body}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
    //res.redirect('/api/tasks')
})
router.delete('/api/tasks/update-ready', async (req, res) => {
    console.log(req.body);
    const data = await dataMock.find().lean()
    console.log(data[1]._id);
    id = data[1]._id
    try {
        await dataMock.updateOne({_id: id}, {$pull:{'issues': req.body}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
    //res.redirect('/api/tasks')
})
router.delete('/api/tasks/update-progress', async (req, res) => {
    console.log(req.body);
    const data = await dataMock.find().lean()
    console.log(data[2]._id);
    id = data[2]._id
    try {
        await dataMock.updateOne({_id: id}, {$pull:{'issues': req.body}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
    //res.redirect('/api/tasks')
})
module.exports = router