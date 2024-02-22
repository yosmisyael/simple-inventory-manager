const joi = require('joi')
const db = require("../utils/db")

const unique = async (name) => {
    const sql = 'SELECT * FROM `products` WHERE `name` = ?'
    const values = [name]
    const [rows] = await db.execute(sql, values)

    if (rows.length > 0) {
        throw new Error('The name is already taken.')
    }

    return name
}

const storeProduct = joi.object({
    name: joi.string().max(255).required().external(unique),
    price: joi.number().min(0).required(),
    description: joi.string().optional().allow(''),
})

const updateProduct = joi.object({
    name: joi.string().max(255).required(),
    price: joi.number().min(0).required(),
    description: joi.string().optional().allow(''),
})

module.exports = { storeProduct, updateProduct }