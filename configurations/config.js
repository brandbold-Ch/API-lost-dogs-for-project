/**
 * @author Brandon Jared Molina Vazquez
 * @date 25/09/2023
 * @file This module is the configuration of database
 */

const cloudinary = require('cloudinary').v2;


/**
 * Database credentials for MongoDB.
 * @typedef {Object} DatabaseCredentials
 * @property {string} host - The IP address of the database server.
 * @property {string} user - Username for accessing the database.
 * @property {string} password - Password associated with the username.
 * @property {string} database - Name of the database the application will connect to.
 * @property {number} port - Port on which the database is listening for connections.
 */

/**
 * Configuration for Cloudinary.
 * @typedef {Object} CloudinaryConfig
 * @property {string} cloud_name - Cloudinary cloud name associated with the account.
 * @property {string} api_key - API key provided by Cloudinary to authenticate API requests.
 * @property {string} api_secret - API secret provided by Cloudinary to authenticate API requests.
 */

// Configuration for database credentials and Cloudinary
/** @type {DatabaseCredentials} */

require('dotenv').config();

const credentials = {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'Contactos',
    port: 27017
};


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_CLOUD_KEY,
    api_secret: process.env.API_SECRET_CLOUD
});


module.exports = {
    credentials,
    cloudinary
};