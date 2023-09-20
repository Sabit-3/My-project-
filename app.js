const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // Change as needed

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const MongoClient = mongodb.MongoClient;
const uri = "mongodb://localhost:27017"; // MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Registration Page</title>
        </head>
        <body>
            <form class="form" method="post" action="/register">
                <div class="input-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="example@example.com" required>
                </div>
                <div class="input-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Password" required>
                </div>
                <div class="input-group">
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" required>
                </div>
                <div class="input-group">
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" required>
                </div>
                <div class="input-group">
                    <label for="address">Address:</label>
                    <input type="text" id="address" name="address" placeholder="Address" required>
                </div>
                <div class="input-group">
                    <label for="city">City:</label>
                    <input type="text" id="city" name="city" placeholder="City" required>
                </div>
                <div class="input-group">
                    <button type="submit">Register</button>
                </div>
            </form>
        </body>
        </html>
    `);
});

app.post("/register", (req, res) => {
    // Get user input from the request body
    const userData = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
    };

    client.connect((err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Database connection error.");
            return;
        }

        const db = client.db("mydb"); // Replace with your database name
        const collection = db.collection("users");

        collection.insertOne(userData, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Database error.");
            } else {
                res.status(200).send("Registration successful!");
            }

            client.close();
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
