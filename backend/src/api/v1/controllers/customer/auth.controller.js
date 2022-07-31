import { createCustomer, findCustomer } from "../../services/customer"
import { error, generateToken, passwordCompare, objectValidatorEscape } from "../../utils"
import { customerSignUpValidation, signInValidation } from "../../validations"
import jwt from 'jsonwebtoken'
import { config } from '../../../../config';

function authController() {
    return {

        signIn: async (req, res) => {
            const { email, password } = req.body;

            // Validate all information
            const validation = signInValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //find a customer using email
            const user = await findCustomer({ $or: [{ email }, { phone: email }] });
            if (!user) return error().resourceError(res, 'Invalid Credentials', 401);

            const passwordMatch = await passwordCompare(password, user);
            if (!passwordMatch) return error().resourceError(res, 'Invalid Credentials', 401);

            if(user.merchant && !user.active) return error().resourceError(res, 'Your Account has not active! Please contact the Admin.', 401);

            const token = generateToken(user);
            return res.status(200).json({ token });
        },

        signUp: async (req, res) => {
            // De-Structure data from req.body
            const { email, phone } = req.body;

            // Validate all information
            const validation = customerSignUpValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //find a customer is assigned to the same email
            const user = await findCustomer({ email });
            if (user) return error().resourceError(res, 'Email already exists. Please choose a different Email', 409);


            //find a customer is assigned to the same phone
            const match = await findCustomer({ phone });
            if (match) return error().resourceError(res, 'Phone Number already exists. Please choose a different Phone Number', 409);

            //malicious data refactor
            const refactor_data = await objectValidatorEscape(req.body);

            // save into mongo db
            await createCustomer(refactor_data);
            return res.status(201).json({ message: 'Registration Successful' });
        },

        //Cookie Authentication
        authenticate: async (req, res) => {
            const token = req.header('Authorization');
            if (!token) return res.status(403).json(false);
            try {
                const verify_token = jwt.verify(token, config?.jwt?.key);
                const customer = await findCustomer({ _id: verify_token._id })
                if (!customer) return res.status(401).json(false);
                if(customer?.merchant && !customer?.active){
                    return res.status(401).json(false);
                }
                return res.status(200).json(true);
            } catch (err) {
                return res.status(401).json(false);
            }
        },
    }
}
export { authController };