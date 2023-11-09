import customer from "../models/customer.js";

/**
 * Middleware handler for validating JWT Token and 
 * keeping the user known to the rest of the handlers
 */
const authenticated = async (req, res, next) => {
    const JWTToken = req.headers.authorization;

    if (JWTToken) {
        const JWTCustomer = await customer.getCustomerByJWT(JWTToken);

        if (JWTCustomer) {
            res.locals.customer = JWTCustomer;
            return next();
        }

        return res.status(401).json({
            success: false,
            data: {
                reason: 'Invalid credentials!'
            }
        });
    }

    return res.status(401).json({
        success: false, data: {
            reason: 'Unauthorized'
        }
    });
}

export default authenticated;