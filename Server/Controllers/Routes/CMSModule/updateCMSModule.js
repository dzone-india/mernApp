const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const errorResponseHelper = require('../../../Helper/errorResponse');
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const moduleSchema = Joi.object({
    id: Joi.string().required(),
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
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = moduleSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
            }

            // pick data from req.body

            let bodyData = _.pick(req.body, ["id", "position", "pageName", "type", "pageUrl",
                "pageTitle", "metaTitle", "metaKeywords", "metaDescription", "pageSortDescription",
                "pageDescription"]);

            let setData = {
                position: bodyData.position,
                pageName: bodyData.pageName,
                type: bodyData.type,
                pageTitle: bodyData.pageTitle,
                pageUrl: bodyData.pageUrl,
                metaKeywords: bodyData.metaKeywords,
                metaTitle: bodyData.metaTitle,
                metaDescription: bodyData.metaDescription,
                pageSortDescription: bodyData.pageSortDescription,
                pageDescription: bodyData.pageDescription
            }
            bodyData.image = req.files;
            setData['image'] = bodyData.image
            let updateModule = await Models.CMSDB.findOneAndUpdate({ _id: bodyData.id }, { $set: setData });
            console.log('updateModule is', updateModule)
            res.send({ status: true, message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS });
        }
        catch (e) {
            console.log('saveModule err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in saveModule" });
        }
    }
    return create;
}
module.exports = createCMS;