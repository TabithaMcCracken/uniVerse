import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        index: true
    },
    last_name: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

});

export default mongoose.model('users', userSchema);



// export default mongoose.model('users', usersSchema);
// // Define validation rules
// const validationRules = {
//     $jsonSchema: {
//         bsonType: "object",
//         required: ["id", "firstName", "lastName", "email", "birthday"],
//         properties: {
//             id: {
//                 bsonType: "number",
//                 description: "must be a number and is required"
//             },
//             firstName: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//             },
//             lastName: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//             },
//             email: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//             },
//             birthday: {
//                 bsonType: "date",
//                 description: "must be a date and is required"
//             }
//         }
//     }
// };

// // Enable validation for the users collection
// const UserSchema = new mongoose.Schema({}, { strict: false }); // Define an empty schema to bypass Mongoose schema validation
// UserSchema.index({ "id": 1 }, { unique: true }); // Ensure id uniqueness
// UserSchema.index({ "email": 1 }, { unique: true }); // Ensure email uniqueness
// UserSchema.set('validateBeforeSave', false); // Disable Mongoose validation before saving
// UserSchema.statics.createCollectionWithValidation = async function () {
//     return await mongoose.connection.db.createCollection('users', { validator: validationRules });
// };

// export default mongoose.model('users', UserSchema);