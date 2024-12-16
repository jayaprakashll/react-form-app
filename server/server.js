// const express = require("express");
// //const mysql = require("mysql");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const port = 6000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MySQL Connection
// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "fstask",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("Connected to MySQL");
// });

// // API to Add Employee
// app.post("/api/employees", (req, res) => {
//   const {
//     first_name,
//     last_name,
//     employee_id,
//     email,
//     phone,
//     department,
//     date_of_joining,
//     role,
//   } = req.body;

//   const query = `INSERT INTO employees (first_name, last_name, employee_id, email, phone, department, date_of_joining, role)
//                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

//   db.query(
//     query,
//     [
//       first_name,
//       last_name,
//       employee_id,
//       email,
//       phone,
//       department,
//       date_of_joining,
//       role,
//     ],
//     (err, result) => {
//       if (err) {
//         if (err.code === "ER_DUP_ENTRY") {
//           res
//             .status(400)
//             .json({ error: "Employee ID or Email already exists." });
//         } else {
//           console.error("Error inserting data:", err);
//           res.status(500).json({ error: "Database error." });
//         }
//         return;
//       }
//       res.json({ message: "Employee added successfully" });
//     },
//   );
// });

// // Start Server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4000; // Adjusted port for server

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "fstask",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1); // Exit the process if database connection fails
  }
  console.log("Connected to MySQL database");
});

// API to Add Employee
app.post("/api/employees", (req, res) => {
  const {
    first_name,
    last_name,
    employee_id,
    email,
    phone,
    department,
    date_of_joining,
    role,
  } = req.body;

  // Validate the request body
  if (
    !first_name ||
    !last_name ||
    !employee_id ||
    !email ||
    !phone ||
    !department ||
    !date_of_joining ||
    !role
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `INSERT INTO employees (first_name, last_name, employee_id, email, phone, department, date_of_joining, role)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      first_name,
      last_name,
      employee_id,
      email,
      phone,
      department,
      date_of_joining,
      role,
    ],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ error: "Employee ID or Email already exists." });
        }
        console.error("Database error during insertion:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({ message: "Employee added successfully" });
    }
  );
});

// Test API Endpoint
app.get("/", (req, res) => {
  res.send("Server is running smoothly.");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
