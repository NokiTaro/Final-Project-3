const {
    verifyToken
} = require("../utils/jwt")

const {
    User
} = require("../models")


const authentication = async(req, res, next) => {
    try {
        // check header, ada token atau tidak

        const token = req.headers["authorization"]

        if (!token) {
            throw {
                code: 401,
                message: "Token not provided!"
            }
        }

        // verify token
        const decode = verifyToken(token)

        console.log("Decoded Token:", decode);

        // if (!decode || !decode.id || !decode.email || !decode.role) {
        //     throw {
        //         code: 401,
        //         message: "Invalid token",
        //     };
        // }

        const userData = await User.findOne({
            where : {
                id: decode.id,
                email: decode.email,
                role: decode.role
            }
        })

        if (!userData) {
            throw {
                code: 401,
                message: " User Not Found"
            }
        }

        req.UserData = {
            id: userData.id,
            email: userData.email,
            role: userData.role

        }

        next()

    } catch (error) {
        console.log(error);
        res.status(error.code || 401).json(error.message)
    }
}

module.exports = {
    authentication
}