import jwt from "jsonwebtoken"

const gentoken = (userId, res) => {
    const token = jwt.sign({ ID: userId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    res.cookies("IDcard", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        sameSites: "lax",

    })
}

export default gentoken;
