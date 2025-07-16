import bcrypt from "bcrypt"
import User from "../models/UserShema.js"



export const registerUser = async (req, res, next) => {
    try {

        const { fullName, email , password , Occupation
        } = req.body


        if (!fullName) {
            return res.status(400).json({ message: "Name Field Can't be Empty" });
        }
        if (!email) {
            return res.status(400).json({ message: "email Field Can't be Empty" });
        }
        if (!password) {
            return res.status(400).json({ message: "password Field Can't be Empty" });
        }
        if (!Occupation) {
            return res.status(400).json({ message: "Occupation Field Can't be Empty" });
        }

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({ message: "Email is Already Exist" });
        }

        const hasedPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullName, email, Occupation, password: hasedPass
        });

        return res.status(200).json({ message: "Registration Successfully" });

    } catch (error) {
        next(error);
    }
}
export const loginUser = async () => { }
export const LogoutUser = async () => { }