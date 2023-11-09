import mongoose from "mongoose";
import pagination from "../hooks/pagination.js";

/**
 * Defining user fields, statics and methods
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
    customerOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
    // To be discussed (other details)
}, { timestamps: true });

// Extending pagination query methods
pagination(schema);

export default new mongoose.model('User', schema);