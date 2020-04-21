const {Schema, model} = require('mongoose');

const dataMock = new Schema({
    title: {
        type: String,
        required: true
    },
    issues: [
        {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ]
})
module.exports = model('dataMock', dataMock);