/**
 * @author Brandon Jared Molina Vazquez
 * @date 26/09/2023
 * @file This module is responsible for creating the user model.
 * @module authSchema
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const petsSchema = require('./pets');

/**
 * Schema to store information about a user.
 * @typedef {Object} UserSchema
 * @property {string} name - Name of the user.
 * @property {string} lastname - Last name of the user.
 * @property {string} cellphone - User's phone number.
 * @property {string} email - User's email address.
 * @property {Array} my_networks - Array that stores user's social media networks.
 * @property {Array} my_lost_dogs - Array that stores lost dogs associated with the user.
 * @property {Array} the_lost_dogs - Array that stores lost dogs associated with other users.
 */

/**
 * Mongoose schema for the user model.
 * @type {mongoose.Schema}
 */

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    cellphone: {
        type: String,
        required: true,
        unique: true,
        maxLength: 10,
        minLength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    my_networks: {
        type: Array,
        required: false,
        default: [
            {platform: 'instagram', user: ''},
            {platform: 'facebook', user: ''},
            {platform: 'twitter', user: ''},
            {platform: 'linkedin', user: ''},
            {platform: 'tiktok', user: ''},
            {platform: 'threads', user: ''},
            {platform: 'whatsapp', user: ''}
        ]
    },
    my_lost_pets: [petsSchema],
    the_lost_pets: [petsSchema]
});

/**
 * Mongoose model for the user model.
 * @type {mongoose.Model<UserSchema>}
 */

const User = mongoose.model('user', userSchema);
module.exports = User;
