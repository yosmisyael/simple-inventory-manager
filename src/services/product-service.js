const db = require('../utils/db')
const validate = require('../validation/validation')
const validationException = require('../error/validation-error')
const { storeProduct, updateProduct } = require('../validation/product-validation')

const getAllProduct = async (page) => {
    const size = 10
    const offset = (page - 1) * size
    try {
        const sql = 'SELECT * FROM `products` LIMIT ? OFFSET ?'
        const [rows] = await db.execute(sql, [`${size}`, `${offset}`])
        return rows
    } catch (err) {
        throw new validationException(400, err.message)
    }
}

const countProduct = async () => {
    try {
        const sql = 'SELECT * FROM `products`'
        const [rows] = await db.execute(sql)
        return rows.length
    } catch (err) {
        throw new validationException(400, err.message)
    }
}

const findById = async (id) => {
    try {
        const sql = 'SELECT * FROM `products` WHERE `id` = ?'
        const values = [id]
        const [rows] = await db.execute(sql, values)
        return rows
    } catch (err) {
        throw new validationException(400, err.message)
    }
}

const save = async (data) => {
    try {
        const { name, price, description } = await validate(storeProduct, data)
        const sql = 'INSERT INTO `products`(`name`, `price`, `description`) VALUES (?, ?, ?)'
        const values = [name, price, description];
        const [rows] = await db.execute(sql, values)
        return rows
    } catch (err) {
        throw new validationException(400, err.message)
    }
}

const update = async (id, data) => {
    try {
        const { name, price, description } = await validate(updateProduct, data)

        const exist = await findById(id)
        if (exist.length > 0 && exist[0].id !== id) {
            throw new Error('The name is already taken.')
        }

        const sql = 'UPDATE `products` SET `name` = ?, `price` = ?, `description` = ? WHERE `id` = ?'
        const values = [name, price, description, id];
        const [rows] = await db.execute(sql, values)
        return rows
    } catch (err) {
        throw new validationException(400, err.message)
    }
}

const remove = async (id) => {
    try {
        const sql = 'DELETE FROM `products` WHERE `id` = ?'
        const values = [id];
        const [rows] = await db.execute(sql, values)
        return rows
    } catch (err) {
        throw new validationException(400, err.message)
    }
}

module.exports = {
    getAllProduct,
    findById,
    save,
    update,
    remove,
    countProduct
}