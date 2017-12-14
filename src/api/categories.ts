'use strict';
import { Response, Request, NextFunction } from 'express';
import { default as Categories, CategoriesModel } from '../models/categories.model';
const utils = require('../../helpers/utils');

export = {
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    findAll: (req: Request, res: Response, next: NextFunction) => {
        Categories.find().then((categories) => {
            res.status(200).json(categories);
        }).catch((next));
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    create: (req: Request, res: Response, next: NextFunction) => {
        const categories = new Categories({
            name: req.body.name,
            img: req.body.img || undefined
        });
        Categories.findOne({name: req.body.name}).then((categories) => {
            if (categories === null) {
                categories.save().then(savedObj => {
                    res.status(201).json(savedObj);
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                res.status(409).json({code: 'existingCategories', message: 'categories already exist'});
            }
        }).catch((next));
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    put: (req: Request, res: Response, next: NextFunction) => {
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    delete: (req: Request, res: Response, next: NextFunction) => {
    },
};