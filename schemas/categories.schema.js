const mongoose = require('mongoose');
const { Schema } = mongoose;

const category = new Schema({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

exports.categories = mongoose.model('categories', category);