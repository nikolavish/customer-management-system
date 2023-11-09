import { body } from "express-validator";
import validation from "../hooks/validation.js";
import Customer from "../models/customer.js";

export default {
    /**
     * POST `/signin` - REST API
     * Gets the customer if exists and validates the credentials
     * Returns token if success
     */
    signIn: validation([

        body('email')
            .isEmail().withMessage('Invalid E-mail!')
            .notEmpty().withMessage('This field is required!')
            .normalizeEmail(),

        body('password')
            .isString().withMessage('Not a valid argument!')
            .notEmpty().withMessage('This field is required!')

    ], async (req, res) => {
        const customer = await Customer.findOne({ email: req.body.email });

        if (customer) {
            const JWTToken = customer.authenticate(req.body.password);
            if (JWTToken) {
                return res.json({
                    success: true,
                    data: {
                        token: JWTToken
                    }
                });
            }
        }

        return res.json({
            success: false,
            data: {
                reason: 'Invalid credentials!'
            }
        });
    }),

    /**
     * POST `/signup` - REST API
     * Validates needed inputs, checks for unique keys if used
     * creates new document and returns a success message
     */
    signUp: validation([

        body('email')
            .isEmail().withMessage('Invalid E-mail!')
            .notEmpty().withMessage('This field is required!')
            .normalizeEmail(),

        body('password')
            .isStrongPassword({ minLength: 8, minSymbols: 1, minUppercase: 1 }).withMessage('The password is not in the right format!')
            .notEmpty().withMessage('This field is required!'),

        body('name')
            .isAlphanumeric().withMessage('Must be a valid name!')
            .notEmpty().withMessage('This field is required!')

    ], async (req, res) => {

        const isEmailTaken = await Customer.isEmailTaken(req.body.email);

        console.log(isEmailTaken);

        if (!isEmailTaken) {
            let customer = new Customer({
                email: req.body.email,
                name: req.body.name
            });
            customer.setPassword(req.body.password);

            if (await customer.save()) {
                return res.json({
                    success: true
                });
            }

            return res.status(500).json({
                success: false,
                data: {
                    reason: 'Internal server error!'
                }
            });
        }

        return res.status(400).json({
            success: false,
            data: {
                reason: 'E-mail already in use!'
            }
        });
    })
}