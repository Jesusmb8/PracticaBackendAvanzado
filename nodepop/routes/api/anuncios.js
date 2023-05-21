var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio')
// Obtener todos
router.get("/", async function (req, res, next) {
    try {

        // Paginacion 
        const start = req.query.start;
        const limit = req.query.limit;
        const sort = req.query.sort;
        // Filtros
        const filterByTipo = req.query.venta;
        const filterByTag = req.query.tag;
        const filterByArticulo = req.query.articulo;
        const criteria = {};

        // Tipo, venta o compra
        if (filterByTipo !== undefined) {
            criteria.venta = filterByTipo;
        }

        // Por tag aplica un and
        if (filterByTag) {
            criteria.tags = filterByTag;
            if (filterByTag.length > 1) {
                criteria.tags =
                {
                    $in: filterByTag
                };
            }
        }
        // Filtro por artículo:
        if (filterByArticulo) {
            criteria.articulo =
            {
                $regex: new RegExp(filterByArticulo, 'ig')
            };
        }

        console.log('Criteria', criteria);
        const anuncios = await Anuncio.query(criteria, start, limit, sort);
        // Comprobamos si es api o web
        if (req.originalUrl.startsWith('/api/')) {
            res.json({
                numAnuncios: anuncios.length,
                resultado: anuncios
            });
        } else {
            res.locals.anuncios = anuncios;
            res.render('anuncios');
        }

    } catch (error) {
        next(error);
    }
})



// poder crear un anuncio
router.post("/", async (req, res, next) => {

    // { articulo: 'iPhone 7 plus', tipo: 'Venta', precio: 200.22, imagen: 'iphone7plus.jpg', tags: 'mobile' },

    try {
        // const articulo = req.body.articulo;
        // const tipo = req.body.tipo;
        const anuncioBody = req.body;
        const anuncio = new Anuncio(anuncioBody);
        // Insertamos en BBDD
        const anuncioGuardado = await anuncio.save();
        res.json({
            resultado: 'Anuncio guardado correctamente',
            anuncio: anuncioGuardado
        });
    } catch (error) {
        // Marcamos el código de error
        error.status = 406;
        error.detail = "Es posible que los parámetros enviados no sean válidos."
        next(error);
    }
})


// lista de tags
router.get("/tags", async (req, res, next) => {

    try {
        // Query para ver todos los tags
        const tags = await Anuncio.distinct('tags');
        res.json({ result: tags });
    } catch (error) {
        next(error);
    }

})
module.exports = router;