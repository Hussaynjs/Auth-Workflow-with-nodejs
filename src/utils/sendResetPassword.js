const sendEmail = require('./sendEmail')

const sendResetPassword = async({name, email, token, origin}) => {

    const resetPasswordUri = `${origin}/user/reset-passowrd?email=${email}&token=${token}`

    const message = `please click the link to reset your password <a href="${resetPasswordUri}">reset</a>`

    await sendEmail({
        to: email,
        subject: 'Reset Password',
        html: `hello $${name}
         ${message}
        `
    })
}


module.exports = sendResetPassword