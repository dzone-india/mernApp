const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const errorResponseHelper = require("../../../Helper/errorResponse");
const CONSTANTSMESSAGE = require("../../../Helper/constantsMessage");
const moduleSchema = Joi.object({
  propertyId: Joi.string().empty("").required(),
  imageKey: Joi.string().empty("").required(),
  fileName: Joi.string().empty("").required(),
});

function deletePropertyImageRequest(Models) {
  async function deleteImage(req, res) {
    try {
      // validate data using joi
      let validateData = moduleSchema.validate(req.body);
      if (validateData.error) {
        throw {
          status: false,
          error: validateData,
          message: CONSTANTSMESSAGE.INVALID_DATA,
        };
      }

      // pick data from req.body
      let bodyDataPropImage = _.pick(req.body, [
        "propertyId",
        "imageKey",
        "fileName",
      ]);

      if (
        bodyDataPropImage.imageKey !== "mainImage" &&
        bodyDataPropImage.imageKey !== "exteriorView" &&
        bodyDataPropImage.imageKey !== "livingRoom" &&
        bodyDataPropImage.imageKey !== "badrooms" &&
        bodyDataPropImage.imageKey !== "bathrooms" &&
        bodyDataPropImage.imageKey !== "kitchen" &&
        bodyDataPropImage.imageKey !== "floorPlan" &&
        bodyDataPropImage.imageKey !== "masterPlan" &&
        bodyDataPropImage.imageKey !== "other"
      ) {
        throw {
          status: false,
          error: "invalid Image key",
          message: "invalid Image key",
        };
      }
      const pImageData = await Models.PImageDB.findOne({
        propertyId: new ObjectId(bodyDataPropImage.propertyId),
      });
      console.log("pImageData", pImageData);
      pImageData[bodyDataPropImage.imageKey] = pImageData[
        bodyDataPropImage.imageKey
      ].filter((imageObj) => imageObj.filename !== bodyDataPropImage.fileName);
      console.log(
        "pImageData[bodyDataPropImage.imageKey]",
        pImageData[bodyDataPropImage.imageKey]
      );
      await Models.PImageDB.findOneAndUpdate(
        {
          propertyId: new ObjectId(bodyDataPropImage.propertyId),
        },
        {
          [bodyDataPropImage.imageKey]: pImageData[bodyDataPropImage.imageKey],
        }
      );
      res.send({
        status: true,
        propertyId: bodyDataPropImage.propertyId,
        message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
      });
    } catch (e) {
      console.log("saveModule err", e);
      await errorResponseHelper({
        res,
        error: e,
        defaultMessage: "Error in saveModule",
      });
    }
  }
  return deleteImage;
}
module.exports = deletePropertyImageRequest;
