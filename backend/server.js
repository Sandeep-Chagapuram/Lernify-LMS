import express from 'express'
import mongoose from 'mongoose'
import User from './models/User.js'
import Course from './models/Course.js'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/LMS")



app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email, password: password })
    if (!user) {
        return res.status(401).send('Unauthorized')
    }
    res.json(user)
})

app.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })
    const doc = await user.save()
    
    res.json(doc)
})

app.post('/addcourse', async (req, res) => {
    // console.log(req.body)
    const { title, description, instructor, lessons } = req.body;
    const course = new Course({
        title,
        description,
        instructor,
        lessons
    });
    await course.save();
    res.json(course);
});

app.get('/getcourses', async (req, res) => {
    const courses = await Course.find().populate('instructor', 'name email');
    res.json(courses);
});
app.post('/getInstructorCourses',async(req,res)=>{
    let instructorId
    if(req.body.id!=null || req.body.id!=undefined){
        instructorId = req.body.id
    }else{
        instructorId=req.body.user._id
    }
    // console.log(`instructor is ${req.body.id} , ${req.body.user._id}`);
    
    const courses = await Course.find({instructor:instructorId})
    res.json(courses)
})

app.post("/enroll/:courseId",async(req,res)=>{
    const courseId = req.params.courseId
    const userId = req.body.id
    
    await Course.findByIdAndUpdate(
        courseId,
        {$inc:{enrollments:1}}
    )
    const user = await User.findOne({_id:userId})
    user.enrolledCourses.push(courseId)
    await user.save()
    res.send("enrolled")
})

app.post("/deleteCourse",async(req,res)=>{
    const {_id}=req.body
    await Course.findByIdAndDelete({_id:_id})
    res.send("Deleted course")
})

app.post("/getUserDetails",async(req,res)=>{
    const userId = req.body.id

    const user = await User.findById(userId)
    res.send(user)
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'));


