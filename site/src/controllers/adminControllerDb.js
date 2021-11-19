const db = require('../database/models/index')
const {Op} = require ('sequelize')
const { validationResult } = require('express-validator')


module.exports = {
    // List - Product's List
    list: (req,res) => {
        db.products.findAll()
        .then(productos => {
            res.render('admin', {products : productos})
        })
        .catch(err=> {
            console.log('Error al requerir los productos de la base de datos '+ err)
        })
    },
    // Create - Form to create
	create: (req, res) => {
		res.render('create')
	},
    // Create -  Method to store
    store: (req,res) => {
        let errors = validationResult(req);
                // Para validar la imagen
        if (req.fileValidationError) {
            let images = {
                param: "images",
                msj: "Solo se permiten imágenes"
            }
            errors.errors.push(images)
        }
        const { title, description, price, calories, total_fat, carb, protein, transfat, saturatedfat, cholesterol, sodium, sugars, fiber, subcategory} = req.body

        let images = req.file ? req.file.filename : 'default-img.jpg';

        db.product.create ({
            title,
            description,
            price,
            calories,
            total_fat,
            carb,
            protein,
            transfat, 
            saturatedfat, 
            cholesterol, 
            sodium,
            sugars,
            fiber,
            img : images,
            Id_subcategory: subcategory
        })
        .then(() =>{
            res.redirect(`/products/detail/${product.id}`)
        })
        .catch(err=> {
            res.send(error)
        })
    },
    // Update - Form to edit
    edit: (req, res) => {

        db.Product.findByPk(req.params.id)
            .then((product) => {
                res.render("admin/editProduct", {
                    product
                })
            })
            .catch((error) => {
                res.send(error)
            })

    },
    update: (req, res, next) => {
        
        const { title, price, category, subcategory, description } = req.body;

        let img = req.files[0] ? req.files[0].filename : undefined;

        db.Product.update({
            title,
            price,
            subcategoryId: subcategory,

        },
            {
                where: {
                    id: req.params.id
                }
            })
            .then((result) => {
                res.redirect(`/products/detail/$(req.params.id)`)
            })
            .catch((error) => {
                res.send(error)
            })
    },
    deleteWine: (req, res) => {

        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                return res.redirect("/admin/products")
            })
            .catch((error) => {
                res.send(error)
            })
    }
}