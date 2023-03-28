const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Express app
const app = express();

// Parse incoming request bodies in a middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define Sequelize database connection

var sequelize = new Sequelize('postgres://postgres:arohyadav@localhost:5432/postgres');

// Define a model for the form data
const Form1 = sequelize.define('Form1', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workexperience: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  jobtitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Create the table in the database
Form1.sync();

// Define a route for handling form submissions
app.post('/submit-form', async (req, res) => {
    try {
      // Extract form data from request body
      const { fullname, email, workexperience, jobtitle, phonenumber } = req.body;
  
      // Create new User instance with form data
      const user = await Form1.create({
        fullname,
        email,
        workexperience,
        jobtitle,
        phonenumber
      });
  
      // Send success response
      res.status(200).json({
        message: 'Form submitted successfully',
        user,
      });
    } catch (error) {
      // Handle error
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
//   app.use(express.static('client'));

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, function () {
        // Logging to console
        console.log(`app running on http://0.0.0.0:${port}`)
    })
