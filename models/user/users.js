mongoose = require('mongoose');
Schema = mongoose.Schema;

// user schema definition
var userSchema = new Schema (
    {

        attributes: {

            name: {
                type: 'string',
                required: true
            },

            title: {
                type: 'string'
            },

            email: {
                type: 'string',
                email: true,
                required: true,
                unique: true
            },

            encryptedPassword: {
                type: 'string'
            }

        }
    }

);

//Exports the userSchema for use elsewhere.
module.exports = mangoose.model('user', userSchema);
