const {
    Product,
    Category
} = require("../models");

class ProductController {
    static async createProduct(req, res) {
        try {
            const {
                title,
                price,
                stock,
                CategoryId
            } = req.body;

            // Validasi kategori
            const category = await Category.findByPk(CategoryId);
            if (!category) {
                throw {
                    code: 404,
                    message: "Category not found",
                };
            }

            const data = await Product.create({
                title,
                price,
                stock,
                CategoryId,
            });

            res.status(201).json({
                product: {
                    id: data.id,
                    title: data.title,
                    price: `Rp ${new Intl.NumberFormat("id-ID").format(data.price)}`,
                    stock: data.stock,
                    CategoryId: data.CategoryId,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                },
            });
        } catch (error) {
            res.status(error.code || 500).json(error.message);
        }
    }

    static async getAllProducts(req, res) {
        try {
            const products = await Product.findAll({
                include: Category,
            });

            const formattedProducts = products.map((product) => ({
                id: product.id,
                title: product.title,
                price: `Rp ${new Intl.NumberFormat("id-ID").format(product.price)}`,
                stock: product.stock,
                CategoryId: product.CategoryId,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            }));

            res.status(200).json({
                products: formattedProducts,
            });
        } catch (error) {
            res.status(error.code || 500).json(error.message);
        }
    }

    static async updateProductById(req, res) {
        try {
            const {
                price,
                stock,
                title
            } = req.body;
            const productId = req.params.productId;

            const product = await Product.findByPk(productId);

            if (!product) {
                throw {
                    code: 404,
                    message: "Product not found",
                };
            }

            await product.update({
                price,
                stock,
                title,
            });

            res.status(200).json({
                product: {
                    id: product.id,
                    title: product.title,
                    price: `Rp ${new Intl.NumberFormat("id-ID").format(product.price)}`,
                    stock: product.stock,
                    CategoryId: product.CategoryId,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                },
            });
        } catch (error) {
            res.status(error.code || 500).json(error.message);
        }
    }

    static async getProductById(req, res) {
        try {
            const productId = req.params.productId;

            const product = await Product.findByPk(productId, {
                include: Category,
            });

            if (!product) {
                throw {
                    code: 404,
                    message: "Product not found",
                };
            }

            res.status(200).json({
                product: {
                    id: product.id,
                    title: product.title,
                    price: `Rp ${new Intl.NumberFormat("id-ID").format(product.price)}`,
                    stock: product.stock,
                    CategoryId: product.CategoryId,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                },
            });
        } catch (error) {
            res.status(error.code || 500).json(error.message);
        }
    }

    static async deleteProductById(req, res) {
        try {
            const productId = req.params.productId;

            const deletedProduct = await Product.destroy({
                where: {
                    id: productId,
                },
            });

            if (!deletedProduct) {
                throw {
                    code: 404,
                    message: "Product not found",
                };
            }

            res.status(200).json({
                message: "Product has been successfully deleted",
            });
        } catch (error) {
            res.status(error.code || 500).json(error.message);
        }
    }
}

module.exports = ProductController;
