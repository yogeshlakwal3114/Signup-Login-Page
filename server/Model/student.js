const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isChecked: {
        type: Boolean,
        required: true,
    }
});

// Hash password before saving to database
StudentSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const StudentModel = mongoose.model('students', StudentSchema);

module.exports = StudentModel;