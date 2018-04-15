/**
 * Created by ilazaar on 16/01/2018.
 */
import logger from 'winston';
import * as emailHtml from '../constants/emailHtml';
import nodemailer from 'nodemailer';
import {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_PWD,
    SMTP_USER,
    APP_URL
} from '../config';


let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: SMTP_USER, // generated ethereal user
        pass: SMTP_PWD // generated ethereal password
    }
});

const mailer = {
    sendNewReviewMail: function(data) {
        const { SHOPIFY_API_KEY } = process.env;

        data.email = data.email ? "\""+data.email+"\"" : "";
        data.image = data.image ? "<img src='"+APP_URL+"/"+data.image+"'>": "";
        var productLink = data.domain +"/admin/apps/"+SHOPIFY_API_KEY+"/review?id="+data.productId+"&shop="+data.domain;
        var reviewAdded = emailHtml.reviewAdded.replace("{{userName}}",data.name)
            .replace("{{productTitle}}",data.productTitle)
            .replace("{{userEmail}}",data.email)
            .replace("{{message}}",data.title)
            .replace("{{image}}",data.image)
            .replace("{{productLink}}",productLink);

        let mailOptions = {
            from: '"Powerify Admin" <review@powerify.io>',
            to: data.toMail,
            subject: 'New review added',
            html: reviewAdded
        };
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                logger.info("error sending mail ");
            }
            else{
                logger.info("success sending mail");
            }
        });
    }
};

module.exports = mailer;