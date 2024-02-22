const ValidationError = require('../error/validation-error')
const validate = async (schema, req) => {
    const result = await schema.validateAsync(req, {
        allowUnknown: false,
        abortEarly: false,
    })

    if (result.err) {
        throw new ValidationError(400, result.err.message)
    } else {
        return result
    }
}

module.exports = validate