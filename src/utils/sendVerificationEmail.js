const sendEmail = require('./sendEmail')


const sendVerificationEmail = async({name, email, verificationToken, origin}) => {

    // fronntend uri
    const verifyEmail = `${origin}/user/verify-email?email=${email}&token=${verificationToken}`

    const message = `<p>please click on the following link to verify email: <a href="${verifyEmail}">click here</a> </p>`

    return sendEmail({
        to: email,
        subject: 'Email Confirmation',
        html: `<h1>hello ${name}</h1>
        ${message}
        `
    })

}

module.exports = sendVerificationEmail