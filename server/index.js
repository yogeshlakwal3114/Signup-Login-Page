const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const StudentModel = require("./Model/student")

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', true);
mongoose.connect(url, {
   //
}).then(() => {
    console.log("Successfully Connected");
}).catch((err) => {
    console.log("No connection", err);
});


app.post('/register', (req,res) => {
    StudentModel.create(req.body)
    .then(students => res.json(students))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    StudentModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success");
            }else{
                res.json("Incorrect password");
            }
        }else{
            res.json("User Not Found!")
        }
    })
})

app.listen(3001, () => {
  console.log("Databse Connected");
})