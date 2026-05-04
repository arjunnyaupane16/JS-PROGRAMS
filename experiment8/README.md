# Experiment 8: MongoDB with Node.js

This experiment demonstrates database operations using MongoDB with Node.js, including CRUD operations, queries, sorting, and joins.

## Prerequisites

1. **Install MongoDB**:
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

2. **Install Node.js** (if not already installed)

## Setup Instructions

### Option 1: Local MongoDB

1. Install MongoDB on your system
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB

   # Linux/Mac
   sudo systemctl start mongod
   ```

3. Install dependencies:
   ```bash
   cd experiment8
   npm install
   ```

4. Run the demo:
   ```bash
   npm start
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and get connection string
3. Update the connection URL in `mongodb-demo.js`:
   ```javascript
   const url = 'mongodb+srv://username:password@cluster.mongodb.net/';
   ```
4. Install dependencies and run:
   ```bash
   npm install
   npm start
   ```

## What This Demo Covers

1. **CREATE Operations**:
   - insertOne() - Insert single document
   - insertMany() - Insert multiple documents

2. **READ Operations**:
   - find() - Query documents
   - findOne() - Find single document
   - Filtering with operators ($gte, $lte, $regex, etc.)
   - Projection (selecting specific fields)

3. **UPDATE Operations**:
   - updateOne() - Update single document
   - updateMany() - Update multiple documents
   - $set, $inc, $push operators

4. **DELETE Operations**:
   - deleteOne() - Delete single document
   - deleteMany() - Delete multiple documents

5. **Advanced Queries**:
   - Sorting
   - Limiting results
   - Counting documents
   - Aggregation pipeline

6. **JOIN Operations**:
   - $lookup (similar to SQL JOIN)
   - Joining collections

## Expected Output

The program will:
- Connect to MongoDB
- Create a database and collection
- Insert student records
- Query and filter data
- Update records
- Perform aggregations
- Join collections
- Delete records
- Display results for each operation

## Troubleshooting

**Connection Error**: Make sure MongoDB is running
```bash
# Check MongoDB status
# Windows: services.msc (look for MongoDB)
# Linux/Mac: sudo systemctl status mongod
```

**Module Not Found**: Install dependencies
```bash
npm install
```

**Port Already in Use**: Change the default port or stop other MongoDB instances
