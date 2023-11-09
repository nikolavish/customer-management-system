import { validationResult } from "express-validator";

/**
 * Output-consistent validation handler with endpoint's final 
 * callback handler if success, or returning the error as response
 */
export default (rules, callback) => async (req, res) => {

    for (let rule of rules) {
        await rule.run(req);
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return callback(req, res);
    }

    return res.status(400).json({
        success: false,
        data: {
            errors: errors.array()
        }
    });
}