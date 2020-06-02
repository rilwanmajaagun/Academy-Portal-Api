const express = require("express")
const {
    checkIfUserDoesNotExistBefore,
    createNewUser,
    checkEmailAndPasswordMatch,
    applicationForm,
    checkBatch,
    getUserApplication,
    getUserDetails
} = require("../Functions/userFunction")
const {
    getEmails,
    sendMail
} = require("../nodeMailer/nodemailer")




async function signup(req, res) {
    const { email_address } = req.body;
    try {
        await checkIfUserDoesNotExistBefore(email_address);
        const result = await createNewUser(req.body)
        return res.status(201).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function loginController(req, res) {
    try {
        const result = await checkEmailAndPasswordMatch(req.body);
        return res.status(202).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function applicationController(req, res) {
    const body = "your"
    const subject = "welcome to academy"
    const user_id = res.locals.user.id
    try {
        await checkBatch(user_id, req.body)
        const result = await applicationForm(user_id, req.body)
        email = await getEmails(user_id);
        sendMail(email, body, subject);
        return res.status(201).json(result)
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function getUserApplicationController(req, res) {
    const user_id = res.locals.user.id
    try {
        const result = await getUserApplication(user_id);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function getDetails(req, res) {
    const id = res.locals.user.id
    try {
        const result = await  getUserDetails(id);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}



module.exports = {
    signup,
    loginController,
    applicationController,
    getUserApplicationController,
    getDetails

}