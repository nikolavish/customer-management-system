import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import pagination from "../hooks/pagination.js";
import user from "./user.js";

/**
 * Defining customer fields, statics and methods
 */
const schema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    }
    // To be discussed (other details)
}, { timestamps: true });

// Extending pagination query methods
pagination(schema);

/**
 * Checks if input email is already used by someone
 * @param {String} email provided by the incoming request
 * @returns {Boolean} either taken or not
 */
schema.statics.isEmailTaken = async function (email) {
    return !! await this.findOne({ email });
}

/**
 * Validates the JWT token and if successfull,
 * it returns the assigned user
 * @param {String} token provided by the incoming request
 * @returns Either the customer's document or null 
 */
schema.statics.getCustomerByJWT = async function (token) {
    const JWTSecret = process.env.SECRET_KEY || 'defaultkey';

    const parsedToken = JWT.verify(token, JWTSecret);

    const customer = await this.findOne({
        _id: parsedToken._id
    });

    return customer;
}

/**
 * Updates the document's password (set as hash)
 * @param {String} password the password to be hashed
 */
schema.methods.setPassword = function (password) {
    const hashSalt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password, hashSalt);
}

/**
 * Authenticates the user (by validating the password)
 * @param {String} password the password provided by the incoming request
 * @returns {Boolean | String} false if not success; JWT token if success
 */
schema.methods.authenticate = function (password) {
    const JWTSecret = process.env.SECRET_KEY || 'defaultkey';
    const doesPasswordMatch = bcrypt.compareSync(password, this.password);

    if (doesPasswordMatch)
        return JWT.sign({ _id: this._id }, JWTSecret);

    return false;
}

/**
 * Getting users associated with the customer
 */
schema.methods.getUsers = function () {
    return user.find({ customerOf: this._id });
}

export default new mongoose.model('Customer', schema);