import User from '../models/usersModel.js'

// Get Route
// http://localhost:3050/users
// Returns first 10 users in order by last name
const indexUsers = async(req,res)=>{
    try {
        // Query with limit and sorting by last name
        const result = await User.find({}).sort({last_name: 1}).limit(10); 
        if (!result || result.length === 0) {
            return res.status(404).send('Not found');
        }
        res.send(result).status(200);
    } catch (error){
        console.error('Error retrieving users: ', error);
        res.status(500).send('Internal Server Error')
    }
    
}

// POST Route
// http://localhost:3050/users/addUser
// Adds a new user

// To get an error with a duplicate id use:
// {
//     "user_id": 1,
//     "first_name": "Joey",
//     "last_name": "Billings",
//     "email": "joe.schmoe@example.com",
//     "birthday": "06-15-1999"
// }

// To get an error with a duplicate email use:
// {
//     "user_id": "116",
//     "first_name": "Johny",
//     "last_name": "Doe",
//     "email": "johny.doe45899@example.com",
//     "birthday": "06-15-1999"
// }

// To add a user without errors:
// {
//     "user_id": "128",
//     "first_name": "mary",
//     "last_name": "kay",
//     "email": "marykay@example.com",
//     "birthday": "06-15-1999"
// }

const addUser = async (req, res) => {
    try {
        const { user_id, first_name, last_name, email, birthday } = req.body;
        const newUser = new User({
            user_id,
            first_name,
            last_name,
            email,
            birthday
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
}


// PATCH Route
// http://localhost:3050/users/updateUser/:id
// Function to handle updating user data

// id:66382cfb95499a3c011969b3
// {
//     "user_id": "1",
//     "first_name": "bob",
//     "last_name": "kay",
//     "email": "mikeky@example.com",
//     "birthday": "06-15-1999"
// }

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

// DELETE Route
// http://localhost:3050/users/deleteUser/:id
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


export {indexUsers, addUser, updateUser, deleteUser } // Can add more functions