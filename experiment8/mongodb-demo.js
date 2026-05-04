// Experiment 8: Database Operations using MongoDB with Node.js
// CRUD Operations: Create, Read, Update, Delete, Query, Sort, Join

const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'studentDB';
const client = new MongoClient(url);

// ============================================
// CRUD OPERATIONS
// ============================================

async function createDocuments(collection) {
  console.log('\n1. CREATE (INSERT) OPERATIONS');
  console.log('-'.repeat(50));

  // Insert one document
  const student1 = {
    name: 'Arjun Nyaupane',
    age: 22,
    course: 'Computer Science',
    email: 'arjun@example.com',
    grades: { math: 85, science: 90, english: 88 },
    enrollmentDate: new Date('2022-01-15')
  };

  const insertOneResult = await collection.insertOne(student1);
  console.log('✓ Inserted one document:', insertOneResult.insertedId);

  // Insert multiple documents
  const students = [
    {
      name: 'Sita Sharma',
      age: 21,
      course: 'Information Technology',
      email: 'sita@example.com',
      grades: { math: 92, science: 88, english: 85 },
      enrollmentDate: new Date('2022-02-20')
    },
    {
      name: 'Ram Thapa',
      age: 23,
      course: 'Software Engineering',
      email: 'ram@example.com',
      grades: { math: 78, science: 82, english: 90 },
      enrollmentDate: new Date('2021-09-10')
    },
    {
      name: 'Gita Poudel',
      age: 20,
      course: 'Computer Science',
      email: 'gita@example.com',
      grades: { math: 95, science: 93, english: 89 },
      enrollmentDate: new Date('2023-01-05')
    },
    {
      name: 'Krishna Adhikari',
      age: 24,
      course: 'Data Science',
      email: 'krishna@example.com',
      grades: { math: 88, science: 91, english: 87 },
      enrollmentDate: new Date('2021-08-15')
    }
  ];

  const insertManyResult = await collection.insertMany(students);
  console.log(`✓ Inserted ${insertManyResult.insertedCount} documents`);

  return insertOneResult.insertedId;
}

async function readDocuments(collection) {
  console.log('\n2. READ (QUERY) OPERATIONS');
  console.log('-'.repeat(50));

  // Find all documents
  console.log('\na) Find all students:');
  const allStudents = await collection.find({}).toArray();
  console.log(`Found ${allStudents.length} students`);
  allStudents.forEach(s => console.log(`  - ${s.name} (${s.course})`));

  // Find with filter
  console.log('\nb) Find Computer Science students:');
  const csStudents = await collection.find({ course: 'Computer Science' }).toArray();
  csStudents.forEach(s => console.log(`  - ${s.name}, Age: ${s.age}`));

  // Find with comparison operators
  console.log('\nc) Find students age >= 22:');
  const olderStudents = await collection.find({ age: { $gte: 22 } }).toArray();
  olderStudents.forEach(s => console.log(`  - ${s.name}, Age: ${s.age}`));

  // Find one document
  console.log('\nd) Find one student:');
  const oneStudent = await collection.findOne({ name: 'Arjun Nyaupane' });
  console.log(`  Found: ${oneStudent.name}, Email: ${oneStudent.email}`);

  // Find with projection (select specific fields)
  console.log('\ne) Find with projection (name and email only):');
  const projected = await collection.find({}, { projection: { name: 1, email: 1, _id: 0 } }).toArray();
  projected.forEach(s => console.log(`  - ${s.name}: ${s.email}`));
}

async function updateDocuments(collection, studentId) {
  console.log('\n3. UPDATE OPERATIONS');
  console.log('-'.repeat(50));

  // Update one document
  console.log('\na) Update one student:');
  const updateOneResult = await collection.updateOne(
    { _id: studentId },
    { $set: { age: 23, email: 'arjun.updated@example.com' } }
  );
  console.log(`✓ Modified ${updateOneResult.modifiedCount} document`);

  // Update multiple documents
  console.log('\nb) Update multiple students (add scholarship field):');
  const updateManyResult = await collection.updateMany(
    { 'grades.math': { $gte: 85 } },
    { $set: { scholarship: true } }
  );
  console.log(`✓ Modified ${updateManyResult.modifiedCount} documents`);

  // Update with $inc (increment)
  console.log('\nc) Increment age by 1 for all students:');
  const incResult = await collection.updateMany(
    {},
    { $inc: { age: 1 } }
  );
  console.log(`✓ Modified ${incResult.modifiedCount} documents`);

  // Update with $push (add to array)
  console.log('\nd) Add hobby to student:');
  const pushResult = await collection.updateOne(
    { name: 'Arjun Nyaupane' },
    { $push: { hobbies: 'Programming' } }
  );
  console.log(`✓ Modified ${pushResult.modifiedCount} document`);
}

async function deleteDocuments(collection) {
  console.log('\n4. DELETE OPERATIONS');
  console.log('-'.repeat(50));

  // Delete one document
  console.log('\na) Delete one student:');
  const deleteOneResult = await collection.deleteOne({ name: 'Ram Thapa' });
  console.log(`✓ Deleted ${deleteOneResult.deletedCount} document`);

  // Delete multiple documents
  console.log('\nb) Delete students age > 24:');
  const deleteManyResult = await collection.deleteMany({ age: { $gt: 24 } });
  console.log(`✓ Deleted ${deleteManyResult.deletedCount} documents`);
}

async function advancedQueries(collection) {
  console.log('\n5. ADVANCED QUERY OPERATIONS');
  console.log('-'.repeat(50));

  // Sorting
  console.log('\na) Sort by age (descending):');
  const sorted = await collection.find({}).sort({ age: -1 }).toArray();
  sorted.forEach(s => console.log(`  - ${s.name}, Age: ${s.age}`));

  // Limit
  console.log('\nb) Get top 3 students:');
  const limited = await collection.find({}).limit(3).toArray();
  limited.forEach(s => console.log(`  - ${s.name}`));

  // Count
  console.log('\nc) Count documents:');
  const count = await collection.countDocuments({});
  console.log(`  Total students: ${count}`);

  const csCount = await collection.countDocuments({ course: 'Computer Science' });
  console.log(`  Computer Science students: ${csCount}`);

  // Aggregation
  console.log('\nd) Aggregation - Average age by course:');
  const avgAge = await collection.aggregate([
    {
      $group: {
        _id: '$course',
        averageAge: { $avg: '$age' },
        count: { $sum: 1 }
      }
    },
    { $sort: { averageAge: -1 } }
  ]).toArray();

  avgAge.forEach(item => {
    console.log(`  - ${item._id}: Avg Age = ${item.averageAge.toFixed(2)}, Count = ${item.count}`);
  });

  // Text search (requires text index)
  console.log('\ne) Search by name pattern:');
  const searchResults = await collection.find({
    name: { $regex: 'a', $options: 'i' }
  }).toArray();
  searchResults.forEach(s => console.log(`  - ${s.name}`));
}

async function joinOperations(db) {
  console.log('\n6. JOIN OPERATIONS (LOOKUP)');
  console.log('-'.repeat(50));

  // Create courses collection
  const coursesCollection = db.collection('courses');
  await coursesCollection.deleteMany({});

  const courses = [
    { _id: 'CS101', courseName: 'Computer Science', credits: 4, instructor: 'Dr. Smith' },
    { _id: 'IT101', courseName: 'Information Technology', credits: 3, instructor: 'Dr. Johnson' },
    { _id: 'SE101', courseName: 'Software Engineering', credits: 4, instructor: 'Dr. Williams' },
    { _id: 'DS101', courseName: 'Data Science', credits: 4, instructor: 'Dr. Brown' }
  ];

  await coursesCollection.insertMany(courses);
  console.log('✓ Created courses collection');

  // Update students with course IDs
  const studentsCollection = db.collection('students');
  await studentsCollection.updateOne(
    { name: 'Arjun Nyaupane' },
    { $set: { courseId: 'CS101' } }
  );
  await studentsCollection.updateOne(
    { name: 'Sita Sharma' },
    { $set: { courseId: 'IT101' } }
  );

  // Perform lookup (join)
  console.log('\nJoining students with courses:');
  const joinedData = await studentsCollection.aggregate([
    {
      $lookup: {
        from: 'courses',
        localField: 'courseId',
        foreignField: '_id',
        as: 'courseDetails'
      }
    },
    { $match: { courseDetails: { $ne: [] } } },
    { $limit: 5 }
  ]).toArray();

  joinedData.forEach(student => {
    const course = student.courseDetails[0];
    console.log(`  - ${student.name} enrolled in ${course.courseName} (${course.credits} credits)`);
    console.log(`    Instructor: ${course.instructor}`);
  });
}

// ============================================
// MAIN FUNCTION
// ============================================

async function main() {
  try {
    console.log('='.repeat(60));
    console.log('Experiment 8: MongoDB CRUD Operations with Node.js');
    console.log('='.repeat(60));

    // Connect to MongoDB
    await client.connect();
    console.log('✓ Connected to MongoDB server');

    const db = client.db(dbName);
    const collection = db.collection('students');

    // Clear existing data
    await collection.deleteMany({});
    console.log('✓ Cleared existing data');

    // Perform CRUD operations
    const studentId = await createDocuments(collection);
    await readDocuments(collection);
    await updateDocuments(collection, studentId);
    await advancedQueries(collection);
    await joinOperations(db);
    await deleteDocuments(collection);

    // Final count
    const finalCount = await collection.countDocuments({});
    console.log(`\nFinal student count: ${finalCount}`);

    console.log('\n' + '='.repeat(60));
    console.log('All MongoDB operations completed successfully!');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('\n✓ Connection closed');
  }
}

// Run the main function
if (require.main === module) {
  main();
}

module.exports = { main };
