const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController")
const { authentication } = require("../middleware/auth")

router.post("/", authentication, CategoryController.addCategory)
router.get("/:id", authentication, CategoryController.getCategoryById)
router.put("/:id", authentication, CategoryController.updateCategoryById)
router.delete("/:id", authentication, CategoryController.deleteCategoryById)

module.exports = router