const db = require('../utils/db')
const validate = require('../validation/validation')
const { storeProduct, updateProduct } = require('../validation/product-validation')

const getAllProduct = async (page) => {
    const size = 10
    const offset = (page - 1) * size
    try {
        const sql = 'SELECT * FROM `products` LIMIT ? OFFSET ?'
        const [rows] = await db.execute(sql, [`${size}`, `${offset}`])
        return rows
    } catch (err) {
        throw err
    }
}

const countProduct = async () => {
    try {
        const sql = 'SELECT * FROM `products`'
        const [rows] = await db.execute(sql)
        return rows.length
    } catch (err) {
        throw err
    }
}

const findById = async (id) => {
    try {
        const sql = 'SELECT * FROM `products` WHERE `id` = ?'
        const values = [id]
        const [rows] = await db.execute(sql, values)
        return rows
    } catch (err) {
        throw err
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
        throw err
    }
}

const update = async (id, data) => {
    try {
        const { name, price, description } = await validate(updateProduct, data)
        const sql = 'UPDATE `products` SET `name` = ?, `price` = ?, `description` = ? WHERE `id` = ?'
        const values = [name, price, description, id];
        const [rows] = await db.execute(sql, values)
        return rows
    } catch (err) {
        throw err
    }
}

const remove = async (id) => {
    try {
        const sql = 'DELETE FROM `products` WHERE `id` = ?'
        const values = [id];
        const [rows] = await db.execute(sql, values)
        return rows
    } catch (err) {
        throw err
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