const joi = require('joi')
const db = require("../utils/db");

const checkName = async (name) => {
    try {
        const sql = 'SELECT * FROM `products` WHERE `name` = ?'
        const values = [name]
        const [rows] = await db.execute(sql, values)
        return rows
    } catch (err) {
        throw err
    }
}

const storeProduct = joi.object({
    name: joi.string().max(255).required().external(async (name) => {
        const isNameUsed = await checkName(name)
        if (isNameUsed.length !== 0) {
            throw new Error('The name is already taken.')
        }
        return name
    }),
    price: joi.number().min(0).required(),
    description: joi.string().optional().allow(''),
})

const updateProduct = joi.object({
    name: joi.string().max(255).required().external(async (name, context) => {
        const checkNameInDb = await checkName(name)
        if (checkNameInDb.length !== 0) {
            if (checkNameInDb[0].name === name && checkNameInDb[0].id === context) {
                console.log('belong to 1')
                return name
            } else if (checkNameInDb[0].name === name) {
                console.log(context.id)
                console.log('belong to 2')
                throw new Error('The name is already taken.')
            }
        }
        return name
    }),
    price: joi.number().min(0).required(),
    description: joi.string().optional().allow(''),
})

module.exports = { storeProduct, updateProduct }