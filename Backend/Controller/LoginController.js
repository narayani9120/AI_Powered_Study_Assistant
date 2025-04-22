const Login = require("../Models/Login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.postuser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await Login.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    const Logindetails = new Login({
      username,
      email,
      password,
    });

    await Logindetails.save();

    res.status(200).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(404).json("No such user exists");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json("Invalid credentials");
    }

    const token = jwt.sign({ user_id: user._id }, "secret key", {
      expiresIn: "2d",
    });
    
    res.status(200).json({ token, email: user.email, username: user.username });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};
