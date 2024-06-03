// import express from 'express'
const express = require('express');

const router = express.Router()

const { indexUsers, addUser, deleteUser, updateUser, getUser } = require('../controllers/usersController.js')
// import { indexUsers, addUser, deleteUser, updateUser, getUser } from '../controllers/usersController.js'

const { addVerse, updateVerse, deleteVerse } = require('../controllers/verseController.js')
// import { addVerse, updateVerse, deleteVerse } from '../controllers/verseController.js'


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



// Patch route to add a verse by user
router.route('/addVerse/:id').patch(addVerse)

// Patch route to update a verse by user
router.route('/updateVerse/:id').patch(updateVerse) // change userId to id

// Delete route to remove a verse  by user
router.route('/deleteVerse/:id').delete(deleteVerse)


// export default router
module.exports = router;