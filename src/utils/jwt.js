const jwt = require('jsonwebtoken')

const createJwt = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token
}

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)


const attachCookiesToResponse = ({res, user, refrshToken}) => {
    const accessTokenJWT = createJwt({payload:{user}})
    const refreshTokenJWT = createJwt({payload:{user, refrshToken}})
    const oneDay = 1000 * 60 * 60 * 24
    const oneMonth = 1000 * 60 * 60 * 24 + 30

    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure:process.env.NODE_ENV === 'production',
        signed: true
    })

    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        expires: new Date(Date.now() + oneMonth),
        secure:process.env.NODE_ENV === 'production',
        signed: true
    })
}

module.exports = {
    createJwt,
    isTokenValid,
    attachCookiesToResponse
}