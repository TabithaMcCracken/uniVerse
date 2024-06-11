// Import required modules
const User = require("../models/usersModel.js");

// Get Route - Retrieve the first 10 users ordered by last name
// http://localhost:3075/users
const indexUsers = async (req, res) => {
  try {
    // Query with limit and sorting by last name
    const result = await User.find({}).limit(10);
    if (!result || result.length === 0) {
      return res.status(404).send("Not found");
    }
    res.send(result).status(200);
  } catch (error) {
    console.error("Error retrieving users: ", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Route- Retrieve user by ID
// http://localhost:3075/users/:id
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user: ", error);
    res.status(500).send("Internal Server Error");
  }
};

// POST Route to add User
// http://localhost:3075/users/addUser

// To add a user without errors:
// {
//     "firstName": "Emma",
//     "email": "emma@example.com",
//     "passowrd": "asdflkjlaiue",
//     "savedVerses": []
//  }

const addUser = async (req, res) => {
  try {
    const { firstName, email, password, savedVerses } = req.body;
    const newUser = new User({
      firstName,
      email,
      password,
      savedVerses,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error adding user:", error);
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already exists", code: 11000 });
    } else {
      res.status(500).json({ error: "Failed to add user" });
    }
  }
};

// PATCH Route- Update user data
// http://localhost:3075/users/updateUser/:id

// id:665906dca4d25109369cc2a1
// {
//     "firstName": "Bob",
//     "email": "bob@example.com",
//     "password": "asdfjasdlfj",
//     "savedVerses": []
//  }

const updateUser = async ({ params: { id }, body }, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user: ", error);
    res.status(500).json({ error: "Failed to update user " });
  }
};

// DELETE Route- Delete a user by ID
// http://localhost:3075/users/deleteUser/:id

const deleteUser = async ({ params: { id } }, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// POST Route - Login user
// http://localhost:3075/users/login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  trimmedPassword = password.trim();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found: Invalid email or password" });
    }
    console.log("password from db:", user.password);
    console.log("password entered: ", trimmedPassword);

    if (password !== user.password) {
      return res.status(400).json({ message: "Password does not match" });
    }

    res.json({ _id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Export the functions for use in other parts of the application
exports.indexUsers = indexUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;
exports.loginUser = loginUser;
