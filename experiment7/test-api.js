// Test script for the Express API
// Run this after starting the server with: node test-api.js

const http = require('http');

const BASE_URL = 'http://localhost:3000';

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body
          });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testAPI() {
  console.log('='.repeat(60));
  console.log('Testing Express RESTful API');
  console.log('='.repeat(60));

  try {
    // Test 1: Get all students
    console.log('\n1. GET /api/students - Get all students');
    const getAllResponse = await makeRequest('GET', '/api/students');
    console.log(`Status: ${getAllResponse.status}`);
    console.log('Response:', JSON.stringify(getAllResponse.data, null, 2));

    // Test 2: Get student by ID
    console.log('\n2. GET /api/students/1 - Get student by ID');
    const getByIdResponse = await makeRequest('GET', '/api/students/1');
    console.log(`Status: ${getByIdResponse.status}`);
    console.log('Response:', JSON.stringify(getByIdResponse.data, null, 2));

    // Test 3: Create new student
    console.log('\n3. POST /api/students - Create new student');
    const newStudent = {
      name: 'Krishna Adhikari',
      age: 24,
      course: 'Data Science'
    };
    const createResponse = await makeRequest('POST', '/api/students', newStudent);
    console.log(`Status: ${createResponse.status}`);
    console.log('Response:', JSON.stringify(createResponse.data, null, 2));

    const newStudentId = createResponse.data.data.id;

    // Test 4: Update student
    console.log(`\n4. PUT /api/students/${newStudentId} - Update student`);
    const updateData = {
      age: 25,
      course: 'Machine Learning'
    };
    const updateResponse = await makeRequest('PUT', `/api/students/${newStudentId}`, updateData);
    console.log(`Status: ${updateResponse.status}`);
    console.log('Response:', JSON.stringify(updateResponse.data, null, 2));

    // Test 5: Get statistics
    console.log('\n5. GET /api/stats - Get statistics');
    const statsResponse = await makeRequest('GET', '/api/stats');
    console.log(`Status: ${statsResponse.status}`);
    console.log('Response:', JSON.stringify(statsResponse.data, null, 2));

    // Test 6: Search students
    console.log('\n6. GET /api/search?q=Science - Search students');
    const searchResponse = await makeRequest('GET', '/api/search?q=Science');
    console.log(`Status: ${searchResponse.status}`);
    console.log('Response:', JSON.stringify(searchResponse.data, null, 2));

    // Test 7: Delete student
    console.log(`\n7. DELETE /api/students/${newStudentId} - Delete student`);
    const deleteResponse = await makeRequest('DELETE', `/api/students/${newStudentId}`);
    console.log(`Status: ${deleteResponse.status}`);
    console.log('Response:', JSON.stringify(deleteResponse.data, null, 2));

    console.log('\n' + '='.repeat(60));
    console.log('All tests completed successfully!');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('Error testing API:', error.message);
    console.log('\nMake sure the server is running: node server.js');
  }
}

testAPI();
