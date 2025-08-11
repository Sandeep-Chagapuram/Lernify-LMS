import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['Instructor', 'Learner'], default: 'learner' },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})
export default mongoose.model("User", userSchema)