const router = require("express").Router()
const UserController = require("../controllers/UserController")
const { authentication } = require("../middleware/auth")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.put("/:id", authentication, UserController.updateUserById)
router.delete("/:id", authentication, UserController.deleteUserById)
router.patch("/topUp", authentication,UserController.topUp)

module.exports = router
