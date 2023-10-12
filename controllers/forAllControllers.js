/**
 * @author Brandon Jared Molina Vazquez
 * @date 25/09/2023
 * @file This module is for creating application services.
 */

const forAllServices = require('../services/forAllServices');
const service = new forAllServices();

/**
 * Get all the lost dogs
 * @async
 * @function
 * @returns {Promise<Array>}
 * */

exports.getAllLostDogs = async (isOwner) => {
    return await service.getAllLostDogs(isOwner);
};

/**
 * Get user and dog information.
 * @async
 * @function
 * @param {string} id - ID user
 * @param {string} dog_id - Dog ID identifier
 * @param {boolean} isOwner - Flag to determine if the user is the owner
 * @returns {Promise<Array>} - A promise that resolves to an array.
 */

exports.getUserAndDog = async (id, dog_id, isOwner) => {
    return await service.getUserAndDog(id, dog_id, isOwner);
};
