import bcrypt from "bcrypt"
import User from "../models/UserShema.js"
import gentoken from "../utils/auth.js"



export const registerUser = async (req, res, next) => {
    try {

        const { fullName, email, password, occupation } = req.body


        if (!fullName) {
            return res.status(400).json({ message: "Name Field Can't be Empty" });
        }
        if (!email) {
            return res.status(400).json({ message: "email Field Can't be Empty" });
        }
        if (!password) {
            return res.status(400).json({ message: "password Field Can't be Empty" });
        }
        if (!occupation) {
            return res.status(400).json({ message: "Occupation Field Can't be Empty" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email is Already Exist" });
        }

        const hasedPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullName, email, occupation, password: hasedPass
        });

        return res.status(200).json({ message: "Registration Successfully" });

    } catch (error) {
        next(error);
    }
}
export const loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "Email & Password Both Are Required" })
        }


        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User Not registered");
            error.statusCode = 408;
            return next(error);
        }


        const isVerified = await bcrypt.compare(password, user.password);

        if (!isVerified) {
            const error = new Error("Invalid Username or Password");
            error.statusCode = 401;
            return next(error);
        }


        gentoken(user._id, res);

        res.status(200).json({
            message: `WelcomeBack ${user.fullName}`,
            data: user,
        });


    } catch (error) {
        next(error);

    }

}

export const getUserData = async (req, res, next) => {
    const currentUser = req.user;

    if (!currentUser) {
        const error = new Error("User Not Found !! Login Again");
        error.statusCode = 401;
        return next(error);
    }

    try {
        res.status(200).json({
            message: `Welcome Back ${currentUser.fullName}`,
            data: currentUser,
        });


    } catch (error) {
        next(error);

    }


}
export const LogoutUser = async () => { }