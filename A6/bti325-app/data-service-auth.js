// require mongoose and setup the Schema
var exports = module.exports = {};
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

//Define the userSchema
var userSchema = new Schema({
    "userName":{
        "type": String,
        "unique": true
    },
    "password": String,
    "email": String,
    "loginHistory": [{
        "dateTime":Date,
        "userAgent":String
    }]
});

let User; // to be defined on new connection

//Initializes a connection to the mongodb database that's provided within the .env file
exports.initialize = function(){
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection("mongodb+srv://pkhatri4:Subway77@cluster0-atp6l.mongodb.net/test?retryWrites=true&w=majority");

        db.on('error', (err)=>{
            reject(err); // reject the promise with the provided error
        });
        db.once('open', ()=>{
           User = db.model("users", userSchema);
           resolve();
        });
    });
}

/**
 * Saves the userData into mongodb along with a few error checks:
 * @param {Object} - contains the data that the user is requesting to be saved to the database
 * - Checks if userData.password and userData.password2 are matching
 * - Checks if userData.userName is already taken
 * - Checks for any error while saving to db
 */
exports.registerUser = function(userData){
    return new Promise((resolve, reject) => {
        if(userData.password != userData.password2){
            reject('Passwords do not match');
        }else{
            bcrypt.genSalt(10, function(err, salt){
                // generate a "salt" using 10 rounds
                bcrypt.hash(userData.password, salt, function(err, hash){
                    if(err){
                        reject('There was an error encrypting the password');
                    }
                    else {
                        userData.password = hash;
                        let newUser = new User(userData);
                        newUser.save((err) => {
                            if(err){
                                if(err.code == 11000){
                                    reject("User Name already taken");
                                }
                                reject("There was an error creating the user: " + err);
                            }
                            else{
                                resolve();
                            }
                        })
                    }
                })
                
            })
        }     
    });
};
  

/**
 * Checks the existing database for a specific user with the same information as the passed parameter:
 * @param {Object} - contains the user data to be checked within the database
 * - Checks if userData.userName is found
 * - Checks if password mat ches any of the passwords from the matching userName
 */

exports.checkUser = function(userData) {
    return new Promise((resolve, reject) => {
        User.find({userName: userData.userName})
            .exec().then((users) => {
                if(!users){
                    reject('Unable to find user: '+userData.userName);
                }else{
                    bcrypt.compare(userData.password, users[0].password).then((res)=>{
                        if(res===true){
                            users[0].loginHistory.push({dateTime: (new Date()).toString(), userAgent: userData.userAgent});
                            User.update(
                                { userName: users[0].userName },
                                { $set: {loginHistory: users[0].loginHistory }},
                                { multi: false }
                            ).exec().then((() => {
                                resolve(users[0]);
                            })).catch((err) => {
                                reject("There was an error verifying the user: " + err);
                            });
                        } else{
                            reject('Incorrect Password for user: '+userData.userName);
                        }
                    })
                }
            }).catch(() => {
                reject('Unable to find user: '+userData.userName);
            })
    });
}