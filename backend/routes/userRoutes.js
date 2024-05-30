import express from 'express'
const router = express.Router()

import { indexUsers, addUser, deleteUser, updateUser } from '../controller/usersController.js'

// Get route to get all user data- done
router.route('/').get(indexUsers)

// Post route to add a user
router.route('/addUser').post(addUser)

// DELETE route to delete a user by ID
router.route('/deleteUser/:id').delete(deleteUser)

// Patch route to update user info by ID
router.route('/updateUser/:id').patch(updateUser)

export default router