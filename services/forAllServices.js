/**
 * @author Brandon Jared Molina Vazquez
 * @date 26/09/2023
 * @file This module interacts with the database and provides
 * functionality to unauthenticated users
 */

const User = require('../models/user');

/**
 * Class that provides services related to the application.
 * @class
 */

class ForAllServices {

    constructor() {};

    /**
     * Get information about a user and a specific dog based on ownership.
     * @async
     * @function
     * @param {string} id - User identifier.
     * @param {string} dog_id - ID of the dog.
     * @param {boolean} isOwner - Indicates if the user is the owner.
     * @returns {Promise<Array||Object>} A Promise that resolves to an array containing information about the user and the specific dog.
     */

    async getUserAndDog(id, dog_id, isOwner){
        let user; let dog;
        if (isOwner === 'true') {
            user = await User.findOne({_id: id}, {the_lost_dogs: 0, _id:0, my_lost_dogs: 0, __v: 0});
            dog = await User.findOne(
                {_id: id},
                {my_lost_dogs: {$elemMatch: {_id: dog_id}}}
            );

            if (dog['my_lost_dogs'][0]){
                return [user, dog['my_lost_dogs'][0]];
            } else {
                return []
            }
        }

        else if (isOwner === 'false') {
            user = await User.findOne({_id: id}, {the_lost_dogs: 0, _id:0, my_lost_dogs: 0, __v: 0});
            dog = await User.findOne(
                {_id: id},
                {the_lost_dogs: {$elemMatch: {_id: dog_id}}}
            );

            if (dog['the_lost_dogs'][0]){
                return [user, dog['the_lost_dogs'][0]];
            } else {
                return []
            }
        } else {
            return {'message': 'You must specify the user, dog and if it is the owner in false or true'};
        }

    };

    /**
     * Get information about all lost dogs based on ownership.
     * @async
     * @function
     * @param {boolean} isOwner - Indicates if the user is the owner.
     * @returns {Promise<Array||Object>} A Promise that resolves to an array containing information about lost dogs.
     */

    async getAllLostDogs(isOwner){

        if (isOwner === 'true') {
            return User.aggregate([
                {
                    $unwind: "$my_lost_dogs"
                },
                {
                    $addFields: {
                        "my_lost_dogs.owner": "$_id"
                    }
                },
                {
                    $replaceRoot: { newRoot: "$my_lost_dogs" }
                },
                {
                    $project: {
                        _id: 0,
                        dog_name: 1,
                        gender: 1,
                        age: 1,
                        last_seen: 1,
                        description: 1,
                        image: 1,
                        size: 1,
                        breed: 1,
                        date: 1,
                        lost_date: 1,
                        found: 1,
                        owner: 1,
                        tags: 1
                    }
                }
            ]);
        } else if (isOwner === 'false') {
            return User.aggregate([
                {
                    $unwind: "$the_lost_dogs"
                },
                {
                    $addFields: {
                        "the_lost_dogs.owner": "$_id"
                    }
                },
                {
                    $replaceRoot: { newRoot: "$the_lost_dogs" }
                },
                {
                    $project: {
                        _id: 1,
                        dog_name: 1,
                        gender: 1,
                        age: 1,
                        last_seen: 1,
                        description: 1,
                        image: 1,
                        size: 1,
                        breed: 1,
                        date: 1,
                        lost_date: 1,
                        found: 1,
                        owner: 1,
                        tags: 1
                    }
                }
            ]);
        } else {
            return {'message': 'Illegal query, must be true or false'};
        }
    };
}

module.exports = ForAllServices;
