// models/Class.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  year: { type: Number, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  studentFees: Number,
  studentList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  maxStudents: { type: Number, default: 30 }
});

module.exports = mongoose.model('Class', classSchema);
