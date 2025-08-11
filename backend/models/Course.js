import mongoose from 'mongoose'
const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lessons: [String],
    enrollments: { type: Number, default: 0 }
})

export default mongoose.model('Course', courseSchema)