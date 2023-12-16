const {
    Category,
    User
} = require("../models")


class CategoryController {

    static async addCategory(req, res) {
        try {
          // Pengecekan autorisasi untuk role admin
            if (req.UserData.role !== "admin") {
            throw {
                code: 403,
                message: "Unauthorized access",
            };
        }
    
            const { type } = req.body;
    
          // Validasi field type tidak boleh kosong
            if (!type) {
            throw {
                code: 400,
                message: "Field type cannot be empty",
            };
        }
    
          // Membuat kategori baru
            const data = await Category.create({
                type
            });
    
            res.status(201).json({
                category: {
                    id: data.id,
                    type: data.type,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    sold_product_amount: data.sold_product_amount
                }
            });
            } catch (error) {
                res.status(error.code || 500).json(error.message);
        }
    }

    static async getCategoryById(req, res) {
        try {
          // Pengecekan autorisasi untuk role admin
            if (req.UserData.role !== "admin") {
                throw {
                    code: 403,
                    message: "Unauthorized access",
                };
            }
    
            const categoryId = req.params.id;
    
          // Mendapatkan kategori berdasarkan ID
            const category = await Category.findByPk(categoryId);
    
          // Jika kategori tidak ditemukan
            if (!category) {
                throw {
                    code: 404,
                    message: "Category not found",
                };
            }
    
            res.status(200).json({
                category,
            });
            } catch (error) {
            res.status(error.code || 500).json(error.message);
            }
        }

    static async updateCategoryById(req, res) {
            try {
              // Pengecekan autorisasi untuk role admin
                if (req.UserData.role !== "admin") {
                    throw {
                        code: 403,
                        message: "Unauthorized access",
                    };
                }
        
                const categoryId = req.params.id;
                const { type } = req.body;
        
              // Validasi field type tidak boleh kosong
                if (!type) {
                    throw {
                        code: 400,
                        message: "Field type cannot be empty",
                    };
                }
        
              // Mendapatkan kategori berdasarkan ID
                const category = await Category.findByPk(categoryId);
        
              // Jika kategori tidak ditemukan
                if (!category) {
                    throw {
                        code: 404,
                        message: "Category not found",
                    };
                }
        
              // Mengupdate kategori
                await category.update({ type });
        
                res.status(200).json({
                    category,
                });
                } catch (error) {
                    res.status(error.code || 500).json(error.message);
                }
            }

    static async deleteCategoryById(req, res) {
            try {
             // Pengecekan autorisasi untuk role admin
            if (req.UserData.role !== "admin") {
                throw {
                    code: 403,
                    message: "Unauthorized access",
                };
            }
            
                const categoryId = req.params.id;
            
            // Menghapus kategori berdasarkan ID
                const deletedCategory = await Category.destroy({
                where: {
                    id: categoryId,
                },
            });
            
            // Jika kategori tidak ditemukan
            if (!deletedCategory) {
                throw {
                    code: 404,
                    message: "Category not found",
                };
            }
            
                res.status(200).json({
                message: "Category has been successfully deleted",
                });
            } catch (error) {
                res.status(error.code || 500).json(error.message);
            }
        }
    }
                
module.exports = CategoryController