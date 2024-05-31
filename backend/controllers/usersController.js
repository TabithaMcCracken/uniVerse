import User from '../models/usersModel.js'

// Get Route- works
// http://localhost:3075/users
// Returns first 10 users in order by last name
const indexUsers = async(req,res)=>{
    try {
        // Query with limit and sorting by last name
        const result = await User.find({}).limit(10); 
        if (!result || result.length === 0) {
            return res.status(404).send('Not found');
        }
        res.send(result).status(200);
    } catch (error){
        console.error('Error retrieving users: ', error);
        res.status(500).send('Internal Server Error')
    }
    
}

// POST Route to add User- this works
// http://localhost:3075/users/addUser
// Adds a new user

// To add a user without errors:
// {
//     "firstName": "Emma",
//     "email": "emma@example.com",
//      "passowrd": "asdflkjlaiue",
//     "savedVerses": []
//  }

const addUser = async (req, res) => {
    try {
        const { firstName, email, password, savedVerses } = req.body;
        const newUser = new User({
            firstName,
            email,
            password,
            savedVerses
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
}

// PATCH Route to add Verse- works
// http://localhost:3075/users/addVerse/:id

// id: 665906dca4d25109369cc2a1
// {
//     "book": "Genesis",
//     "chapter": 1,
//     "verse": 1,
//     "text": "In the beginning, God created the heavens and the earth."
//   }

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


// PATCH Route- works
// http://localhost:3075/users/updateUser/:id
// Function to handle updating user data

// id:665906dca4d25109369cc2a1
// {
//     "firstName": "Bob",
//     "email": "bob@example.com",
//     "password": "asdfjasdlfj",
//     "savedVerses": []
//  }

const updateUser = async ({ params: { id }, body }, res) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate(id, { $set: body }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the updated user as the response
        res.status(200).json(updatedUser);

    } catch (error){
        console.error('Error updating user: ', error)
        res.status(500).json({ error: 'Failed to update user '})
    }
}

// DELETE Route- works
// http://localhost:3075/users/deleteUser/:id
// Function to handle DELETE request for deleting a user by ID
const deleteUser = async ({ params: { id } }, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete({ _id: id });
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}; 


export {indexUsers, addUser, updateUser, deleteUser, addVerse }