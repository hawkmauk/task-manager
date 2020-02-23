
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.EMAILAPIKEY)

const sendWelcomeEmail = (email, name) => {
    try{
        sgMail.send({
            to: email,
            from: 'michael@runcrypto.com',
            subject: 'Thanks for joining in!',
            text: `Welcome to the app, ${name}. Let mem know how you get along with the app`
        })    
    }catch(e){
        console.log(`Could not send email ${e}`)
    }
}

const sendCancelEmail = (email, name) => {
    try{
        sgMail.send({
            to: email,
            from: 'michael@runcrypto.com',
            subject: 'Sorry to see you go',
            text: `Farewell from the app, ${name}.  Please let us know what we could have done better`
        })
    }catch(e){
        console.log(`Could not send email ${e}`)
    }
    
}
module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}