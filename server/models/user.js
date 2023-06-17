let mongoose = require('mongoose');

let passportLocalMongoose = require ('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username:
        {
            type : String,
            default : "",
            trim : true,
            require : 'username is required'
        },
        email:
        {
            type : String,
            default : "",
            trim : true,
            require : 'Email is required'
        },
        displayName:
        {
            type : String,
            default : "",
            trim : true,
            require : 'Display name is required'
        },
        created:
        {
            type : Date,
            default : Date. now
            
        },
        update:
        {
            type : Date,
            default : Date. now
            
        }
    },
    {
        collection :'users'
    }
);

//configure for user model

let options = ({missingPasswordError : 'wrong/ Missing password'});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User);
