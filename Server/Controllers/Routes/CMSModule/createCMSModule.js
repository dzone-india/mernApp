const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const errorResponseHelper = require('../../../Helper/errorResponse');
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const moduleSchema = Joi.object({
    position: Joi.string().required(),
    pageName: Joi.string(),
    type: Joi.string(),
    pageUrl: Joi.string().allow(null).allow(''),
    pageTitle: Joi.string().allow(null).allow(''),
    metaTitle: Joi.string().allow(null).allow(''),
    metaKeywords: Joi.string().allow(null).allow(''),
    metaDescription: Joi.string().allow(null).allow(''),
    pageSortDescription: Joi.string().allow(null).allow(''),
    pageDescription: Joi.string().allow(null).allow(''),
    image: Joi.string().allow(null).allow('')
});

function createCMS(Models) {
    async function create(req, res) {
        try {

            let validateData = moduleSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
            }

            // pick data from req.body
            let bodyData = _.pick(req.body, ["position", "pageName", "type", "pageUrl",
                "pageTitle", "metaTitle", "metaKeywords", "metaDescription", "pageSortDescription",
                "pageDescription", "image"]);
            let findData = await Models.CMSDB.findOne({ pageName: bodyData.pageName });

            if (findData) {
                // if data found check 
                throw { status: false, error: true, message: CONSTANTSMESSAGE.ALREADY_EXIST, duplicateModule: true, statusCode: 401 };
            }

            bodyData.image = req.files;

            let saveModule = await new Models.CMSDB(bodyData).save();
            console.log('saveModule is', saveModule)
            res.send({ status: true, message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE });
        }
        catch (e) {
            console.log('saveModule err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in saveModule" });
        }
    }
    return create;
}
module.exports = createCMS;