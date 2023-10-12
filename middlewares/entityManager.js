/**
 * @author Brandon Jared Molina Vazquez
 * @date 30/09/2023
 * @file This module is for user middleware.
 */

const userControllers = require('../controllers/userControllers');
const dogsControllers = require('../controllers/dogsControllers');

/**
 * Middleware to check if a user with the specified ID exists.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */

const checkUserExists = async (req, res, next) => {
    try {
        const user = await userControllers.getUser(req.params.id);

        if (user) {
            next();
        } else {
            res.status(404).json({'message': 'Not found user'});
        }

    } catch (error) {
        res.status(500).json({'message': error.message});
    }
};

/**
 * Middleware to check if a post with the specified ID or dog name exists in the user's array.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */

const checkMyPostExists = async (req, res, next) => {
    try {
        if (req.query.dog) {
            const post = await dogsControllers.getMiddlewareMyPost(req.params.id, req.query.dog);

            if (post['my_lost_dogs'].length){
                next();
            } else {
                res.status(404).json({'message': 'Not found post'});
            }

        } else if (req.query.id) {
            const post = await dogsControllers.getMyPostById(req.params.id, req.query.id);
            if (post){
                next();
            } else {
                res.status(404).json({'message': 'Not found post'});
            }

        } else {
            res.status(404).json({'message': 'You need to define the query to get the dog'});
        }

    } catch (error) {
        res.status(500).json({'message': error.message})
    }
};

/**
 * Middleware to check if a post with the specified ID or dog name exists in other users' arrays.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */

const checkOtherPostExists = async (req, res, next) => {
    try {
        if (req.query.dog) {
            const post = await dogsControllers.getMiddlewareOtherPost(req.params.id, req.query.dog);
            if (post['the_lost_dogs'].length){
                next();
            } else {
                res.status(404).json({'message': 'Not found post'});
            }

        } else if (req.query.id) {
            const post = await dogsControllers.getOtherPostById(req.params.id, req.query.id);
            if (post){
                next();
            } else {
                res.status(404).json({'message': 'Not found post'});
            }

        } else {
            res.status(404).json({'message': 'You need to define the query to get the dog'});
        }

    } catch (error) {
        res.status(500).json({'message': error.message})
    }
};

/**
 * General endpoint middleware for custom endpoint validation.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */

const generalEndpoint = async (req, res, next) => {
    try {

        if (req.url.substring(0, 19) === '/api/dogs/lost/board') {

            if (req.query.owner && req.query.dog) {
                next();
            } else {
                res.status(404).json({'message': 'Parameters: owner=true or false; dog=id'})
            }

        }
        else if (req.url.substring(0, 14) === '/api/dogs/lost') {

            if (req.query.owner) {
                next();
            }else {
                res.status(404).json({'message': 'You must set the owner parameter to false or true'})
            }

        }
        else {
            next();
        }

    } catch (error) {
        res.status(500).json({'message': error.message})
    }
}

module.exports = {
    checkUserExists,
    checkMyPostExists,
    checkOtherPostExists,
    generalEndpoint
};
