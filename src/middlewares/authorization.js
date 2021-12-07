const { validatePermission } = require('../services/authorization')

const { decode } = require('../services/token')

const extractToken = ctx => {
    const authorization = ctx.headers.authorization || ''
    return authorization.replace('Bearer ', '')
}

module.exports = requiredPermissions => 
    async (ctx, next) => {
        const token = extractToken(ctx)

        const { permissions } = decode(token)

        if(!validatePermission(permissions, requiredPermissions)) {
            return Promise.reject({
                status: 403,
                message: 'Insufficient permission',
                code: 'FORBIDDEN',
            })
        }

        await next()
    }