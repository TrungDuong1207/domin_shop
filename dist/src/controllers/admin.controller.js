"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const product_model_1 = require("../models/product.model");
const category_model_1 = require("../models/category.model");
const user_model_1 = require("../models/user.model");
const order_model_1 = require("../models/order.model");
class AdminController {
    static async showAdminPage(req, res) {
        res.render("admin/indexAdmin", { nameUser: req.decoded.name });
    }
    static async showAddPage(req, res) {
        let category = await category_model_1.Category.find();
        res.render("admin/addProduct", { category: category, nameUser: req.decoded.name });
    }
    static async addProduct(req, res) {
        try {
            const product = new product_model_1.Product({
                image: req.file.originalname,
                name: req.body.name,
                amount: req.body.amount,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description
            });
            await product.save();
        }
        catch (e) {
            console.log(e.message);
        }
        finally {
            res.redirect("/admin/list-product");
        }
    }
    static async showList(req, res) {
        let countProduct = await product_model_1.Product.count();
        let limit;
        let offset;
        if (!req.query.limit || !req.query.offset) {
            limit = 4;
            offset = 0;
        }
        else {
            limit = parseInt(req.query.limit);
            offset = parseInt(req.query.offset);
        }
        const products = await product_model_1.Product.find().populate('category').limit(limit).skip(limit * offset);
        res.render("admin/productAdmin", { products: products, nameUser: req.decoded.name, counts: countProduct });
    }
    static async showFormUpdate(req, res) {
        let id = req.params.id;
        let category = await category_model_1.Category.find();
        let product = await product_model_1.Product.find({ _id: id }).populate('category');
        res.render("admin/editProduct", { product: product, category: category, nameUser: req.decoded.name });
    }
    static async updateProduct(req, res) {
        try {
            let id = req.params.id;
            await product_model_1.Product.findOneAndUpdate({ _id: id }, { $set: {
                    image: req.file.originalname,
                    name: req.body.name,
                    amount: req.body.amount,
                    price: req.body.price,
                    category: req.body.category,
                    description: req.body.description
                }
            });
        }
        catch (e) {
            console.log(e.message);
        }
        finally {
            res.redirect("/admin/list-product");
        }
    }
    static async deleteProduct(req, res) {
        try {
            let id = req.params.id;
            await product_model_1.Product.findOneAndDelete({ _id: id });
        }
        catch (e) {
            console.log(e.message);
        }
        finally {
            res.redirect("/admin/list-product");
        }
    }
    static formAddUser(req, res) {
        res.render('admin/addClient', { nameUser: req.decoded.name });
    }
    static async addUser(req, res) {
        try {
            let user = new user_model_1.User({
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password
            });
            await user.save();
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            res.redirect('/admin/list-user');
        }
    }
    static async listUser(req, res) {
        let user = await user_model_1.User.find({ role: "user" });
        res.render('admin/client', { user: user, nameUser: req.decoded.name });
    }
    static async formUpdateUser(req, res) {
        let id = req.params.id;
        let user = await user_model_1.User.find({ _id: id });
        res.render("admin/editClient", { user: user, nameUser: req.decoded.name });
    }
    static async updateUser(req, res) {
        try {
            let id = req.params.id;
            await user_model_1.User.findOneAndUpdate({ _id: id }, { $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber
                }
            });
        }
        catch (e) {
            console.log(e.message);
        }
        finally {
            res.redirect('/admin/list-user');
        }
    }
    static async deleteUser(req, res) {
        try {
            let id = req.params.id;
            await user_model_1.User.findOneAndDelete({ _id: id });
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            res.redirect('/admin/list-user');
        }
    }
    static async searchProduct(req, res) {
        try {
            let products = await product_model_1.Product.find({
                name: { $regex: req.query.keyword }
            }).populate('category');
            res.status(200).json(products);
        }
        catch (e) {
            res.json({
                'error': e.message
            });
        }
    }
    static async showOrderlist(req, res) {
        let order = await order_model_1.Order.find().populate('customer');
        res.render('admin/order', { nameUser: req.decoded.name, order: order });
    }
    static async showOrderDetail(req, res) {
        let idOrder = req.params.id;
        let orderCustomer = await order_model_1.Order.findOne({ _id: idOrder }).populate('customer');
        let orderItems = await order_model_1.Order.findOne({ _id: idOrder }).populate('items.product');
        res.render('admin/orderDetail', { nameUser: req.decoded.name, orderCustomer: orderCustomer, orderItems: orderItems });
    }
    static async deleteOrder(req, res) {
        try {
            let id = req.params.id;
            await order_model_1.Order.findOneAndDelete({ _id: id });
            res.redirect('/admin/order-list');
        }
        catch (err) {
            console.log(err);
            res.redirect('/error/500');
        }
    }
    static async updateStatusOrder(req, res) {
        try {
            let id = req.params.id;
            await order_model_1.Order.findOneAndUpdate({ _id: id }, { status: req.body.status });
            res.redirect(`/admin/order-detail/${id}`);
        }
        catch (err) {
            console.log(err);
            res.redirect("/error/500");
        }
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map