import User from '../models/usersModel.js'

// PATCH Route to add Verse- works
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
        console.log(req.params.userId)
       
        // Extract verse data from request body
        const { book, chapter, verse, text, practiceAttemps, progress, dateSaved } = req.body;
    
        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Add the new verse to the user's savedVerses array
        user.savedVerses.push({ book, chapter, verse, text, practiceAttemps, progress, dateSaved });
    
        // Save the updated user data back to the database
        await user.save();
    
        // Respond with the updated user data
        res.status(201).json(user);
      } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
      }
}


// PATCH Route to add Verse- works
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

const updateVerse = async(req,res) =>{
    const { userId } = req.params;
    const { book, chapter, verse, practiceAttempts, progress, dateSaved } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const savedVerse = user.savedVerses.find(
        v => v.book === book && v.chapter === chapter && v.verse === verse
      );
  
      if (!savedVerse) {
        return res.status(404).send('Saved verse not found');
      }
  
      savedVerse.practiceAttempts = practiceAttempts;
      savedVerse.progress = progress;
      savedVerse.dateSaved = dateSaved;
  
      await user.save();
  
      res.send('Saved verse updated successfully');
    } catch (error) {
      res.status(500).send('Error updating saved verse: ' + error.message);
    }
}

export { addVerse, updateVerse }