// Import required moddules
const express = require('express');
const router = express.Router()

// Import user controller functions
const { indexUsers, addUser, deleteUser, updateUser, getUser, loginUser } = require('../controllers/usersController.js')

// Import verse controller functions
const { addVerse, updateVerse, deleteVerse } = require('../controllers/verseController.js')

// Define routes for user operations

// Get route to get all user data
router.route('/').get(indexUsers)

// Get route to get a user by id
router.route('/:id').get(getUser)

// Post route to add a user
router.route('/addUser').post(addUser)

// Delete route to delete a user by ID
router.route('/deleteUser/:id').delete(deleteUser)

// Patch route to update user info by ID
router.route('/updateUser/:id').patch(updateUser)


// Define routes for verse operations

// Patch route to add a verse by user
router.route('/addVerse/:id').patch(addVerse)

// Patch route to update a verse by user
router.route('/updateVerse/:id').patch(updateVerse) // change userId to id

// Delete route to remove a verse  by user
router.route('/deleteVerse/:id').delete(deleteVerse)

// Route to check email and password from client
router.route('/login').post(loginUser)

// Export default router
module.exports = router;