/**
 * Created by ilazaar on 08/01/2018.
 */
import logger from 'winston';
import { Models } from '../db';
import multer from 'multer';
import fs from 'fs';
import mailer from '../services/mail';

module.exports = function(app){

    const { Shop, Review } = Models;
    let filePath;
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'react-ui/public/imageReview')
      },
      filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now()+'.jpg')
      }
    });

    var upload = multer({ storage: storage }).single('image');

    app.post('/v1/api/reviewServer',
        (req, res) => {
            upload(req, res,  (err) => {
                res.header("Access-Control-Allow-Origin", "*");
                let result = validateParams(req.body);
                if (err) {
                    result.code = 500;
                    result.message = "Error on uploading image";
                    returnFct(res, result);
                }
                else{
                    filePath = req.file ? req.file.path: undefined;
                    if(result.code === 200){
                        Shop.findOne({ where: {domain: req.body.shop} }).then(shop => {

                            if(shop !== null){
                                const newItem = {
                                    domain: req.body.shop,
                                    productId: req.body.productId,
                                    title: req.body.title,
                                    name: req.body.name,
                                    toMail:req.body.emailAdmin,
                                    productTitle:req.body.productTitle
                                };
                                if(req.body.email){
                                    newItem.email = req.body.email;
                                }
                                if(req.file){
                                    newItem.image = req.file.path.replace("react-ui/public/","");
                                }
                                if(req.body.content){
                                    newItem.content = req.body.content;
                                }
                                if(req.body.stars){
                                    newItem.stars = parseInt(req.body.stars);
                                }

                                Review.create(newItem).then(() => {
                                    result.message = "Saving review";
                                    result.review = newItem;
                                }).catch((e) => {
                                    result.code = 500;
                                    result.message = "Error on saving review";
                                    logger.info(JSON.stringify(e));
                                }).finally(function () {
                                    returnFct(res, result);
                                });
                            }
                            else{
                                result.code = 401;
                                result.message = "Shop doesn't exist on database";
                                returnFct(res, result);
                            }
                        }).catch(function () {
                            result.code = 500;
                            result.message = "Cannot connect to database";
                            returnFct(res, result);

                        })
                    }
                    else{
                        returnFct(res, result);
                    }
                }

            });
        }
    );

    app.get('/v1/api/reviewServer', (req, res) => {
        if(!req.query.shop || !req.query.productId){
            res.status(500).json({
                code:500,
                message:"Params is missing"
            });
        }
        else{
            Review.findAndCountAll({
                where: {
                    domain: req.query.shop,
                    productId: req.query.productId
                },
                order: [['createdAt', 'DESC']]
            }).then(result => {
                res.status(200).json(result);
            }).catch(function () {
                res.status(500).json({
                    code:500,
                    message:"Error fetshing reviews"
                });
            });
        }
    });

    app.delete('/v1/api/reviewServer', (req, res) => {
        if(!req.query.id){
            res.status(500).json({
                code:500,
                message:"Param is missing"
            });
        }
        else{
            Review.destroy({
                where: {
                    id: req.query.id
                }
            }).then(result => {
                logger.info(JSON.stringify(result));
                res.status(200).json(result);
            }).catch(function () {
                res.status(500).json({
                    code:500,
                    message:"Error deleting reviews"
                });
            });
        }
    });

    function returnFct(res, result){
        if(result.code === 200){
            mailer.sendNewReviewMail(result.review);
        }
        else if(filePath){
            fs.unlink(filePath, ()=>{});
        }
        res.status(result.code).json(result);
    }
    function validateParams(query){
        var result = {code : 500};
        if(!query.shop){
            result.message = "shop param is required";
        }
        else if(!query.productId){
            result.message = "productId param is required";
        }
        else if(!query.name){
            result.message = "name param is required";
        }
        else if(!query.title){
            result.message = "title param is required";
        }
        else if(query.email && !validateEmail(query.email)){
            result.message = "Email not valid";
        }
        else{
            result.code = 200;
        }
        return result;
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

};