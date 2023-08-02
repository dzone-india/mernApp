const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const errorResponseHelper = require('../../../Helper/errorResponse');
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const SendMessage = require('../../../Helper/sendSms');

const path = require('path');
const sendSupplierMailHelper = require('../../../Helper/sendSupplierMailHelper');

const moduleSchema = Joi.object({
    propertyType: Joi.string().required(),
    name: Joi.string().required(),
    mobile: Joi.number().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    propertyAddress: Joi.string().required(),
    propertyCity: Joi.string().required(),
    propertyState: Joi.string().required(),
    propertyLocation: Joi.string().required(),
    budget: Joi.number().required(),
    totalArea: Joi.number().required(),
    floor: Joi.string().required(),
    message: Joi.string().required()
});

function createServicesEnquiry(Models) {
    async function create(req, res) {
        try {

            let validateData = moduleSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
            }

            // pick data from req.body
            let bodyData = _.pick(req.body, ["propertyType", "name", "mobile", "email", "address", "city",
                "state", "propertyAddress", "propertyCity", "propertyState", "propertyLocation", "budget",
                "totalArea", "floor", "message"]);

            bodyData.image = req.files;
            let saveModule = await new Models.ServiceEnquiryDB(bodyData).save();
            console.log('saveModule is', saveModule)
            if (saveModule) {
                await sendMessageToAdmin(Models, bodyData);
                await sendMessageToClient(Models, bodyData);
                await sendMail(Models, bodyData)
            }
            res.send({ status: true, message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE });
        }
        catch (e) {
            console.log('saveModule err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in saveModule" });
        }
    }
    return create;
}
async function sendMail(Models, data) {
    try {
        let filePath = path.join(__dirname, '/../../../Template/booknow.html');
        let replacements = {
            name: `${_.capitalize(data.name)}`,
            mobile: data.mobile,
            email: data.email,
            address: data.address,
            propertyType: data.propertyType,
            state: data.state,
            city: data.city,
            propertyAddress: data.propertyAddress,
            propertyCity: data.propertyCity,
            propertyState: data.propertyState,
            propertyLocation: data.propertyLocation,
            budget: data.budget,
            totalArea: data.totalArea,
            floor: data.floor,
            message: data.message
        }

        //let info = await prepareTemplateAndMailHelper({ filePath, replacements, to: data.email, subject: "New Supplier Request For VCC" });
        let attachments = '';
        let info = await sendSupplierMailHelper({ filePath, replacements, to: "info@vishalconstructioncompany.com", subject: "New Booking from VCC", attachments, from: data.email });
        return info;
    }
    catch (e) {
        console.log('error', e);
    }
}
const siteMobile = async (Models) => {
    let result = await Models.AddressDB.findOne({ active: true })
    console.log('result is', result)
    if (result) {
        return result.mobile;
    } else {
        return 9802953333;
    }
};
const sendMessageToClient = async (Models, bodyData) => {
    let clientMessage = 'Hello ' + bodyData.name + ', \n';
    let clientMobile = bodyData.mobile;
    let mobile = await siteMobile(Models);
    clientMessage += 'Your Service Request Received. We will get back to you at the earliest For any query Call ' + mobile + '\n';
    clientMessage += 'Regards, \n';
    clientMessage += 'Vishal Construction Company \n';
    clientMessage += 'VCCFLT';

    console.log('clientMessage is', clientMessage);
    await SendMessage({
        senderID: 'VCCFLT',
        templateID: '1207163679313251183',
        mobile: clientMobile,
        message: clientMessage,
    });
};

const sendMessageToAdmin = async (Models, bodyData) => {
    let mobile = await siteMobile(Models);
    // let PropertyData = await getPropertyDetails(Models, bodyData.propertyId);
    // console.log('PropertyData in sendMessage is', PropertyData)
    let message = 'Hello Vishal Properties, \n';
    message += bodyData.name + ' Requested a Service Enquiry. \n';
    //message += ' Please call back (Mobile:-  ' + bodyData.mobile + ' )  \n';
    message += 'Email:  ' + bodyData.email + ' \n';
    message += 'Property Type:  ' + bodyData.propertyType + ' \n';
    message += 'Property Address: ' + bodyData.address + ' \n';
    message += 'Customer Address: ' + bodyData.address + '  \n';
    message += 'Customer City: ' + bodyData.city + ' \n';
    message += 'Customer State: ' + bodyData.state + ' \n';
    message += 'Property Details:- \n';
    message += 'Property City: ' + bodyData.propertyCity + '\n';
    message += 'Property State: ' + bodyData.propertyState + ' \n';
    message += 'Property Location : ' + bodyData.propertyLocation + ' \n';
    message += 'Budget: ' + bodyData.country + ' \n';
    message += 'Total Area: ' + bodyData.city + ' \n';
    message += 'Floor: ' + bodyData.state + '  \n';
    message += 'Message: ' + bodyData.message + ' \n';
    message += 'Regards, \n';
    message += 'Vishal Construction Company';
    message += 'VCCFLT';
    //let message = 'Hello, Vishal Propertie&nbsp; A New Request For Site Visit&nbsp;Name : ' + bodyData.name + '&nbsp;Mobile : ' + bodyData.phone + '&nbsp;Email : ' + bodyData.email + '&nbsp;Time ' + bodyData.time + 'Message By:- Dzone india.&nbsp;Thanks';
    console.log('message is', message);
    await SendMessage({
        senderID: 'VCCFLT',
        templateID: '1207163679298339487',
        mobile: mobile,
        message
    });
};
module.exports = createServicesEnquiry;