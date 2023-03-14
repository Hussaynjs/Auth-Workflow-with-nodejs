const {isTokenValid, attachCookiesToResponse} = require('../utils')
const customError = require('../errors')
const {StatusCodes} = require('http-status-codes')
const Token = require('../models/Token')



const auth = async(req, res, next) => {

    const {accessToken, refreshToken}= req.signedCookies
   // console.log(token);
    

    try {
       if(accessToken){
        const payload = isTokenValid(accessToken)
        req.user = payload.user

       return  next()
       }

       const payload = isTokenValid(refreshToken)

       const existingToken = await Token.findOne({
        user: payload.user.userId,
        refreshToken:payload.refreshToken
       })

       if(!existingToken || !existingToken?.isValid){
        throw new customError.UnauthenticatedError('authentication invalid')
       }
       attachCookiesToResponse({
        res,
        refreshToken:existingToken.refreshToken,
        user:payload.user
       })

       req.user = payload.user

    } catch (error) {
        throw new customError.UnauthenticatedError('authentication invalid')
    }
    
}

const authorizePermissions  = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            throw new customError.UnauthorizedError('unAuthourize to acesss this route')
        }
        next()
    }
}


module.exports = {auth, authorizePermissions}