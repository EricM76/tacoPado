let controller = {
    home: (req, res, next) => {
        if(!req.session.cart){
            req.session.cart = [];
        } 

        res.render('index');
    },
    contacto: (req, res, next) => {
        res.render('contacto');
    },
    menu: (req, res, next) =>{
        res.render('menu');
    },
    beneficios: (req, res, next) => {
        res.render('beneficios');
    }
}

module.exports = controller