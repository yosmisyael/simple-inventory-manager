const { getAllProduct, save, findById, update: updateService, remove, countProduct } = require('../services/product-service')

const index = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const totalProducts = await countProduct();
    const totalPages = Math.ceil(totalProducts / 10);

    if ((page < 0 || page > totalPages) && totalProducts !== 0) {
        res.status(404).render('pages/404', {
            layout: 'layouts/main',
            title: 'Not Found',
        })
        return
    }

    const products = await getAllProduct(page)


    res.status(200).render('pages/index', {
        layout: 'layouts/main',
        title: 'Inventory Management',
        products,
        totalPages,
        currentPage: page,
        totalProducts,
    })
}

const create = async (req, res) => {
    res.status(200).render('pages/create', {
        layout: 'layouts/main',
        title: 'Add Product',
        error: null
    })
}

const store = async (req, res) => {
    try {
        const result = await save(req.body)

        if (result.affectedRows === 1) {
            res.redirect('/')
        }
    } catch (err) {
        res.status(200).render('pages/create', {
            layout: 'layouts/main',
            title: 'Add Product',
            error: err.message
        })
    }

}

const edit = async (req, res) => {
    const product = await findById(req.params.id)

    res.status(200).render('pages/edit', {
        layout: 'layouts/main',
        title: 'Edit Product Information',
        product: product[0],
        error: null
    })
}

const update = async (req, res) => {
    try {
        const result = await updateService(req.params.id, req.body)
        if (result.affectedRows === 1) {
            res.redirect('/')
        }
    } catch (err) {
        const product = await findById(req.params.id)
        res.status(200).render('pages/edit', {
            layout: 'layouts/main',
            title: 'Edit Product Information',
            error: err.message,
            product: product[0],
        })
    }


}

const destroy = async (req, res) => {
    const result = await remove(req.params.id)

    if (result.affectedRows === 1) {
        res.redirect('/')
    }
}

module.exports = { index, create, store, edit, update, destroy }