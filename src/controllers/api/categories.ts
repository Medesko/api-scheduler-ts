'use strict';
import { Response, Request, NextFunction } from 'express';
import { default as Categories, CategoriesModel } from '../../models/categories.model';
const utils = require('../../helpers/utils');

export = {
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    find: (req: Request, res: Response, next: NextFunction) => {
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    create: (req: Request, res: Response, next: NextFunction) => {
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