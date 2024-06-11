// Import required modules
const User = require("../models/usersModel.js");

// PATCH Route to add a verse to a user's saved verses
// http://localhost:3075/users/addVerse/:id

// id: 665906dca4d25109369cc2a1
// {
//     "book": "Matthew",
//     "chapter": 11,
//     "verse": 28,
//     "practiceAttempts": 4,
//     "progress": 75,
//     "dateSaved": "2024-06-29T10:00:00Z"
//  }

const addVerse = async (req, res) => {
  try {
    // Extract user ID from request parameters
    const userId = req.params.id;
    console.log(req.params.userId);

    // Extract verse data from request body
    const {
      book,
      chapter,
      verse,
      text,
      practiceAttempts,
      progress,
      dateSaved,
    } = req.body;

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new verse to the user's savedVerses array
    user.savedVerses.push({
      book,
      chapter,
      verse,
      text,
      practiceAttempts,
      progress,
      dateSaved,
    });

    // Save the updated user data back to the database
    await user.save();

    // Respond with the updated user data
    res.status(201).json(user);
  } catch (error) {
    console.error("Error adding verse:", error);
    res.status(500).json({ error: error.message });
  }
};

// PATCH Route to update a saved verse in a user's saved verses
// http://localhost:3075/users/updateVerse/:id

// id: 665906dca4d25109369cc2a1
// {
//     "book": "Matthew",
//     "chapter": 11,
//     "verse": 28,
//     "practiceAttempts": 4,
//     "progress": 75,
//     "dateSaved": "2024-06-29T10:00:00Z"
//  }

const updateVerse = async (req, res) => {
  const { id } = req.params;
  const { book, chapter, verse, practiceAttempts, progress, dateSaved } =
    req.body;

  try {
    // Find the user in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find the saved verse in the user's savedVerses array
    const savedVerse = user.savedVerses.find(
      (v) => v.book === book && v.chapter === chapter && v.verse === verse
    );

    if (!savedVerse) {
      return res.status(404).send("Saved verse not found");
    }

    // Update the saved verse with new data
    savedVerse.practiceAttempts = practiceAttempts;
    savedVerse.progress = progress;
    savedVerse.dateSaved = dateSaved;

    // Save the updated user data back to the database
    await user.save();

    res.status(200).send("Saved verse updated successfully");
  } catch (error) {
    console.error("Error updating saved verse: ", error);
    res.status(500).send("Error updating saved verse: " + error.message);
  }
};

// DELETE Route to remove a saved verse from a user's saved verses
// http://localhost:3075/users/deleteVerse/:id'

// id: 665906dca4d25109369cc2a1
// {
//     "book": "Matthew",
//     "chapter": 11,
//     "verse": 28,

//  }
const deleteVerse = async (req, res) => {
  const { id } = req.params;
  const { book, chapter, verse } = req.body;

  try {
    // Find the user in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find the index of the verse to be deleted in the user's savedVerses array
    const verseIndex = user.savedVerses.findIndex(
      (v) => v.book === book && v.chapter === chapter && v.verse === verse
    );

    if (verseIndex === -1) {
      return res.status(404).send("Saved verse not found");
    }

    // Remove the verse from the array
    user.savedVerses.splice(verseIndex, 1);

    // Save the updated user data back to the database
    await user.save();

    res.status(200).send("Saved verse deleted successfully");
  } catch (error) {
    console.error("Error deleting saved verse:", error);
    res.status(500).send("Error deleting saved verse: " + error.message);
  }
};

// Export the functions for use in other parts of the application
exports.addVerse = addVerse;
exports.updateVerse = updateVerse;
exports.deleteVerse = deleteVerse;
