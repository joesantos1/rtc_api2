const express = require('express')
const nodemailer = require('nodemailer');

//CONFIGURAÇÕES NODEMAILER
const transporter = nodemailer.createTransport({
    host: 'smtp.umbler.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports = transporter