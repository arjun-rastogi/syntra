const connection = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body; // Assuming you're extracting the values from the request body

    let hashedPassword = await bcrypt.hash(password, 10);
    let query = "INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)";
    connection.query(query, [name, email, hashedPassword], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to sign up." });
      } else {
        let userId = results.insertId; // Get the ID of the inserted user

        let token = jwt.sign({ id: userId, name: name }, "your-secret-key", {
          expiresIn: "1h",
        });

        res.status(200).json({ message: "User created.", token: token });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to sign up." });
  }
};

exports.Signin = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let query = "SELECT * FROM USERS WHERE email = ?";
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error(error);
        res.status(500).json({ message: "Unable to sign in." });
      } else if (results.length === 0) {
        res.status(404).json({ message: "Email not found." });
      } else {
        const user = results[0];
        let match = await bcrypt.compare(password, user.password);
        if (!match) {
          res.status(401).json({ message: "Invalid password" });
        } else {
          let token = jwt.sign(
            { id: user.id, name: user.name },
            "your-secret-key",
            {
              expiresIn: "1h",
            }
          );
          res
            .status(200)
            .json({ message: "Signin successfully. ", token: token });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to sign in." });
  }
};
