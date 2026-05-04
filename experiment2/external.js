// External JavaScript File
// This file demonstrates external JavaScript linking

console.log("External JavaScript file (external.js) loaded successfully!");

/**
 * Function defined in external JavaScript file
 * This demonstrates how to link external JS files with HTML
 */
function externalFunction() {
  alert("This function is defined in external.js file!");
  console.log("External function executed");
}

// Additional utility functions
function greetUser(name) {
  return `Hello, ${name}! Welcome to JavaScript programming.`;
}

function calculateSum(a, b) {
  return a + b;
}

// Object with methods
const MathOperations = {
  add: function (a, b) {
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  },
  multiply: function (a, b) {
    return a * b;
  },
  divide: function (a, b) {
    return b !== 0 ? a / b : "Cannot divide by zero";
  }
};

// Class example
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `My name is ${this.name} and I am ${this.age} years old.`;
  }
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    greetUser,
    calculateSum,
    MathOperations,
    Student
  };
}

console.log("All external functions and objects loaded!");
