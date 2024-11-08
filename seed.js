require('dotenv').config();
const mongoose = require('mongoose');
const Class = require('./models/Class');
const Teacher = require('./models/Teacher');
const Student = require('./models/Student');

const classesData = require('./data/classes.json');
const teachersData = require('./data/teachers.json');
const studentsData = require('./data/students.json');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    seedDatabase(); // Call the async function to seed the database
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

// Define the async function for seeding
async function seedDatabase() {
  try {
    // Clear existing data
    await Class.deleteMany({});
    await Teacher.deleteMany({});
    await Student.deleteMany({});
    console.log('Existing data cleared');

    // Insert teachers
    const teachers = await Teacher.insertMany(teachersData);
    console.log('Teachers inserted');

    // Insert classes with teacher IDs
    classesData[0].teacherId = teachers[0]._id;
    classesData[1].teacherId = teachers[1]._id;
    const classes = await Class.insertMany(classesData);
    console.log('Classes inserted');

    // Insert students with class IDs
    studentsData[0].classId = classes[0]._id;
    studentsData[1].classId = classes[1]._id;
    const students = await Student.insertMany(studentsData);
    console.log('Students inserted');

    // Update classes with student IDs
    await Class.findByIdAndUpdate(classes[0]._id, { $push: { studentList: students[0]._id } });
    await Class.findByIdAndUpdate(classes[1]._id, { $push: { studentList: students[1]._id } });
    console.log('Database seeding completed');

  } catch (error) {
    console.error('Error during database seeding', error);
  } finally {
    mongoose.connection.close();
  }
}
