const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
app.use(cors());

// Database 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: '987654',
  port: 5432
});


app.use(bodyParser.json());

// Start the server
const port = 5000;

 // Sign-up endpoint
 app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  //  query
  pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    [name, email, password],
    (error, result) => {
      if (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'User signed up successfully' });
      }
    }
  );
});

  // Sign-in endpoint
  app.post('/signin', (req, res) => {
    const { email, password } = req.body;
  
    
    pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password],
      (error, result) => {
        if (error) {
          console.error('Error occurred executing query', error);
          res.status(500).json({ error: 'Internal server error' });
        } else if (result.rows.length === 0) {
          res.status(401).json({ error: 'Invalid login details' });
        } else {
          res.status(200).json({ message: ' successful' });
        }
      }
    );
  });
 
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
