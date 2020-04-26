const { Router } = require("express");
const dataMock = require('../models/task');
const router = Router();
router.post('/api/tasks', async (req, res) => {
    const task = new dataMock({
        title: req.body.title,
        issues: [
        ]
    });  
    try {
        await task.save();
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
})
router.post('/api/tasks/remove', async (req, res) => {
    const data = await dataMock.find().lean();
    const dataReveverse = data.reverse();
    id = dataReveverse[req.body.idx]._id;
    
    try {
        await dataMock.deleteOne({"_id": id});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
})

router.post('/api/tasks/update-progress', async (req, res) => {
    const data = await dataMock.find().lean();
    const dataReveverse = data.reverse()
    id = dataReveverse[req.body.idx]._id;
    delete req.body.idx;
    try {
        await dataMock.updateOne({_id: id}, {$push:{'issues': req.body}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
})
router.post('/api/tasks/edit', async (req, res) => {
    const data = await dataMock.find().lean();
    const dataReveverse = data.reverse()
    id = dataReveverse[req.body.idx]._id;
    delete req.body.idx;
    try {
        await dataMock.updateOne({_id: id}, {$set:{'title': req.body.title}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
})
router.post('/api/tasks/update', async (req, res) => {
    const data = await dataMock.find().lean()
    id = data[data.length - 1]._id
    try {
        await dataMock.updateOne({_id: id}, {$push:{'issues': req.body}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
})
router.delete('/api/tasks/update', async (req, res) => {
    const data = await dataMock.find().lean()
    id = data[0]._id
    try {
        await dataMock.updateOne({_id: id}, {$pull:{'issues': req.body}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
})
router.delete('/api/tasks/update-progress', async (req, res) => {
    const data = await dataMock.find().lean();
    const dataReveverse = data.reverse();
    id = dataReveverse[req.body.idx]._id
    delete req.body.idx;
    try {
        await dataMock.updateOne({_id: id}, {$pull:{'issues': req.body}});
        res.redirect('/api/tasks')
    } catch (e) {
        console.log(e);
    }
})
module.exports = router