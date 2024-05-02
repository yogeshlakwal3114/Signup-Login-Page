const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');    // For authentication : decrypt and encrypt the password
const jwt = require('jsonwebtoken');  // securely transmitting information between parties as a JavaScript Object Notation (JSON) object
const cors = require("cors")
const StudentModel = require("./Model/student")

const dotenv = require('dotenv');     // for .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

/*....................Connect to Database.................... */
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', true);
mongoose.connect(url, {
    //
}).then(() => {
    console.log("Successfully Connected");
}).catch((err) => {
    console.log("No connection", err);
});


/*......................Signup API............................ */
app.post('/register', async (req, res) => {
    try {
        const newStudent = await StudentModel.create(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/* ......................Login API........................ */
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    StudentModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, data) => {
                    //if error than throw error
                    if (err) throw err

                    //if both match than you can do anything
                    if (data) {
                        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

                        return res.status(200).json({ msg: "Success", token });
                    } else {
                        return res.status(401).json({ msg: "Invalid credencial" })
                    }
                })
            } else {
                return res.status(400).json("User Not Found!")
            }
        })
})

app.listen(3001, () => {
    console.log("Databse Connected");
})