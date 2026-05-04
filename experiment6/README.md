# Experiment 6: Node.js Environment Setup and Execution

This experiment demonstrates Node.js basics, REPL usage, NPM packages, and callback functions.

## Prerequisites

Install Node.js from: https://nodejs.org/

Verify installation:
```bash
node --version
npm --version
```

## Running the Program

1. Navigate to the experiment6 folder:
   ```bash
   cd experiment6
   ```

2. Run the program:
   ```bash
   node basic-node.js
   ```

   Or using npm:
   ```bash
   npm start
   ```

## What This Program Demonstrates

1. **Basic Node.js Program**
   - Console output
   - Process information
   - Environment details

2. **Built-in Modules**
   - `fs` - File System operations
   - `path` - Path manipulation
   - `os` - Operating System information

3. **Callback Functions**
   - Simple callbacks
   - Callbacks with parameters
   - Asynchronous callbacks

4. **Asynchronous Operations**
   - setTimeout
   - Non-blocking code execution
   - Event loop demonstration

5. **File System Operations**
   - Writing files
   - Reading files
   - Appending to files

6. **Process Information**
   - Process ID
   - Memory usage
   - Environment variables

## Using Node.js REPL

REPL (Read-Eval-Print Loop) is an interactive shell for Node.js.

Start REPL:
```bash
node
```

Try these commands in REPL:
```javascript
> console.log("Hello from REPL")
> let x = 10
> let y = 20
> x + y
> Math.sqrt(16)
> process.version
> .exit  // to exit REPL
```

## NPM (Node Package Manager)

### Initialize a new project:
```bash
npm init
```

### Install packages:
```bash
# Install locally
npm install express

# Install globally
npm install -g nodemon

# Install as dev dependency
npm install --save-dev jest
```

### Common NPM commands:
```bash
npm install          # Install all dependencies
npm start           # Run start script
npm test            # Run test script
npm list            # List installed packages
npm outdated        # Check for outdated packages
npm update          # Update packages
```

## Expected Output

When you run `node basic-node.js`, you'll see:
- Node.js version and platform information
- Operating system details
- Callback function demonstrations
- Asynchronous operation results
- File system operation confirmations
- Process information
- Event loop demonstration

## Files Created

The program creates a `sample.txt` file in the experiment6 directory to demonstrate file system operations.
