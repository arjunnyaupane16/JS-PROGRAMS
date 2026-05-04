// Experiment 6: Node.js Environment and Execution
// This file demonstrates Node.js basics, REPL, NPM packages, and callback functions

console.log('='.repeat(60));
console.log('Experiment 6: Node.js Environment Setup and Execution');
console.log('='.repeat(60));

// 1. Basic Node.js Program
console.log('\n1. BASIC NODE.JS PROGRAM');
console.log('-'.repeat(40));

const greeting = 'Hello from Node.js!';
console.log(greeting);
console.log(`Node.js version: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log(`Current directory: ${process.cwd()}`);

// 2. Working with Modules
console.log('\n2. WORKING WITH MODULES');
console.log('-'.repeat(40));

// Built-in modules
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('Operating System Info:');
console.log(`  - OS Type: ${os.type()}`);
console.log(`  - OS Platform: ${os.platform()}`);
console.log(`  - Total Memory: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`  - Free Memory: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`  - CPU Cores: ${os.cpus().length}`);

// 3. Callback Functions
console.log('\n3. CALLBACK FUNCTIONS');
console.log('-'.repeat(40));

// Simple callback example
function greetUser(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

greetUser('Arjun', function () {
  console.log('Callback function executed!');
});

// Callback with parameters
function calculate(a, b, operation, callback) {
  const result = operation(a, b);
  callback(result);
}

calculate(10, 5, (x, y) => x + y, (result) => {
  console.log(`Addition result: ${result}`);
});

calculate(10, 5, (x, y) => x * y, (result) => {
  console.log(`Multiplication result: ${result}`);
});

// 4. Asynchronous Operations with Callbacks
console.log('\n4. ASYNCHRONOUS OPERATIONS');
console.log('-'.repeat(40));

// Simulating async operation with setTimeout
console.log('Starting async operation...');

setTimeout(() => {
  console.log('Async operation completed after 1 second!');
}, 1000);

setTimeout(() => {
  console.log('Another async operation completed after 2 seconds!');
}, 2000);

console.log('Async operations initiated (non-blocking)');

// 5. File System Operations (Callbacks)
console.log('\n5. FILE SYSTEM OPERATIONS');
console.log('-'.repeat(40));

// Create a sample file
const sampleData = `Node.js File System Demo
Created at: ${new Date().toISOString()}
This file demonstrates fs module operations.`;

fs.writeFile('sample.txt', sampleData, (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('✓ File "sample.txt" created successfully');

  // Read the file
  fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log('✓ File content read successfully:');
    console.log(data);

    // Append to file
    fs.appendFile('sample.txt', '\nAppended line!', (err) => {
      if (err) {
        console.error('Error appending to file:', err);
        return;
      }
      console.log('✓ Content appended to file');
    });
  });
});

// 6. Working with Path Module
console.log('\n6. PATH MODULE OPERATIONS');
console.log('-'.repeat(40));

const filePath = '/users/arjun/documents/file.txt';
console.log(`Original path: ${filePath}`);
console.log(`Directory name: ${path.dirname(filePath)}`);
console.log(`Base name: ${path.basename(filePath)}`);
console.log(`Extension: ${path.extname(filePath)}`);
console.log(`Parsed path:`, path.parse(filePath));

// 7. Custom Module Example
console.log('\n7. CUSTOM MODULE EXAMPLE');
console.log('-'.repeat(40));

// Math operations module (inline)
const MathOps = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b !== 0 ? a / b : 'Cannot divide by zero'
};

console.log('Math Operations:');
console.log(`  10 + 5 = ${MathOps.add(10, 5)}`);
console.log(`  10 - 5 = ${MathOps.subtract(10, 5)}`);
console.log(`  10 × 5 = ${MathOps.multiply(10, 5)}`);
console.log(`  10 ÷ 5 = ${MathOps.divide(10, 5)}`);

// 8. Event Loop Demonstration
console.log('\n8. EVENT LOOP DEMONSTRATION');
console.log('-'.repeat(40));

console.log('1. Synchronous code');

setTimeout(() => {
  console.log('4. setTimeout callback (macrotask)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise callback (microtask)');
});

console.log('2. More synchronous code');

// 9. Process Information
console.log('\n9. PROCESS INFORMATION');
console.log('-'.repeat(40));

console.log(`Process ID: ${process.pid}`);
console.log(`Node.js Version: ${process.version}`);
console.log(`Memory Usage:`, process.memoryUsage());
console.log(`Uptime: ${process.uptime()} seconds`);

// 10. Environment Variables
console.log('\n10. ENVIRONMENT VARIABLES');
console.log('-'.repeat(40));

console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`PATH: ${process.env.PATH ? 'Available' : 'Not available'}`);

// Final message
setTimeout(() => {
  console.log('\n' + '='.repeat(60));
  console.log('Experiment 6 completed successfully!');
  console.log('='.repeat(60));
}, 2500);
