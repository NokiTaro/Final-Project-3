const {
    User
} = require("../models")

const {
    generateToken,
} = require("../utils/jwt")

const {
    comparePassword
} = require("../utils/bcrypt")


class UserController {
    

    static async register(req, res) {

        const formatToRupiah = (value) => {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
        };

        try {
            const {
                full_name,
                password,
                gender,
                email
            } = req.body

            const data = await User.create({
                full_name,
                password,
                gender,
                email,
                role: "customer"
            })
            const balanceInRupiah = formatToRupiah(data.balance);

            res.status(201).json({
                user: {
                id: data.id,
                full_name: data.full_name,
                email: data.email,
                gender: data.gender,
                balance: balanceInRupiah,
                },
            });

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async login(req, res) {
        try {
            const {
                email,
                password,
            } = req.body

            // find di database
            const data = await User.findOne({
                where:{
                    email: email
                }
            })

            
            if (!data) {
                throw {
                    code: 404,
                    message: "User not registered!"
                }
            }

            // compare password
            const isValid = comparePassword(password, data.password)


            if (!isValid) {
                throw {
                    code: 401,
                    message: "Incorrect password!"
                }
            }

            // generate token
            const token = generateToken({
                id: data.id,
                email: data.email,
                password: data.password,
                role: data.role
            })

            res.status(200).json({
                token
            })
        } catch (error) {
            res.status(error.code || 500).json(error)
        }
    }

    static async updateUserById (req, res) {
        try {
            const {
                full_name,
                email
            } = req.body

            const [rowCount, [data]] = await User.update({
                full_name,
                email
            }, {
                where: {
                    id: req.UserData.id
                },
                returning: true
            })

            if (rowCount === 0) {
                throw{
                    code: 404,
                    message: "Data Not Found"
                }
            }
            res.status(201).json({
                user: {
                id: data.id,
                full_name: data.full_name,
                email: data.email,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                },
            })
        } catch (error) {
            res.status(error.code || 500).json(error.message)
        }
    }

    static async deleteUserById(req, res){
        try {

            const data = await User.destroy({
                where: {
                    id : req.UserData.id
                }
            })
            if (!data) {
                throw{
                    code: 404,
                    message: "Data Not Found"
                }
            }

            res.status(200).json("Your account has been deleted")
        } catch (error) {
            res.status(error.code || 500).json(error.message)
        }
    }

    static async topUp(req, res) {

        const formatToRupiah = (value) => {
            return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR",}).format(value);
        };
        try {
            const {
                balance
            } = req.body

            const userData = await User.findByPk(req.UserData.id);

            if (!userData) {
                throw {
                    code: 404,
                    message: "User not found",
                };
            }

            const newBalance = userData.balance + parseInt(balance);

            await userData.update({ balance: newBalance });

            const formattedBalance = formatToRupiah(newBalance);

            res.status(200).json({
                message: `Your balance has been successfully updated to Rp ${formattedBalance}`,
            });
        } catch (error) {
            res.status(error.code || 500).json(error.message);
        }
    }
}

module.exports = UserController