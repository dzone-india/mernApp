const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const errorResponseHelper = require('../../../Helper/errorResponse');
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')


function getDashBoardData(Models) {
    async function totalUsers() {
        return totalUsers = await Models.UserDB.countDocuments({});
    }
    async function activeUsers() {
        return activeUsers = await Models.UserDB.countDocuments({ active: 1 });
    }
    async function sellResidential() {
        return sellResidential = await Models.PropertyDB.countDocuments({ for: 'Sell', pType: 'RESIDENTIAL' });
    }
    async function sellCommercial() {
        return sellCommercial = await Models.PropertyDB.countDocuments({ for: 'Sell', pType: 'COMMERCIAL' });
    }
    async function rentResidential() {
        return rentResidential = await Models.PropertyDB.countDocuments({ for: 'Rent', pType: 'RESIDENTIAL' });
    }
    async function rentCommercial() {
        return rentCommercial = await Models.PropertyDB.countDocuments({ for: 'Rent', pType: 'COMMERCIAL' });
    }
    async function totalBookings() {
        return bookings = await Models.BookingDB.countDocuments({});
    }
    async function openEnquiry() {
        return openEnquiry = await Models.EnquiryDB.countDocuments({ status: true });
    }
    async function closeEnquiry() {
        return closeEnquiry = await Models.EnquiryDB.countDocuments({ status: false });
    }
    async function openSiteVisit() {
        return openSiteVisit = await Models.SiteVisitDB.countDocuments({ status: true });
    }
    async function closeSiteVisit() {
        return closeSiteVisit = await Models.SiteVisitDB.countDocuments({ status: false });
    }
    async function openCallBack() {
        return openCallBack = await Models.ReqCallbackDB.countDocuments({ status: true });
    }
    async function closeCallBack() {
        return closeCallBack = await Models.ReqCallbackDB.countDocuments({ status: false });
    }
    async function openContactWithUs() {
        return openContactWithUs = await Models.ContactUsDB.countDocuments({ isResolved: false });
    }
    async function closeContactWithUs() {
        return closeContactWithUs = await Models.ContactUsDB.countDocuments({ isResolved: true });
    }
    async function allJobApplications() {
        return allJobApplications = await Models.JobApplicationDB.countDocuments({});
    }
    async function openJobApplications() {
        return openJobApplications = await Models.JobApplicationDB.countDocuments({ status: 0 });
    }
    async function closeJobApplications() {
        return closeJobApplications = await Models.JobApplicationDB.countDocuments({ status: 1 });
    }
    async function rejectedJobApplications() {
        return rejectedJobApplications = await Models.JobApplicationDB.countDocuments({ status: 2 });
    }
    async function openSuppliers() {
        return openSuppliers = await Models.SupplierDB.countDocuments({ isActive: true });
    }
    async function closeSuppliers() {
        return closeSuppliers = await Models.SupplierDB.countDocuments({ isActive: false });
    }
    async function openServicesEnquiry() {
        return openServicesEnquiry = await Models.ServiceEnquiryDB.countDocuments({ active: true });
    }
    async function closeServicesEnquiry() {
        return closeServicesEnquiry = await Models.ServiceEnquiryDB.countDocuments({ active: false });
    }

    async function getFun(obj, req, res) {
        try {
            let {
                totalUsers,
                activeUsers,
                sellResidential,
                sellCommercial,
                rentResidential,
                rentCommercial,
                totalBookings,
                openEnquiry,
                closeEnquiry,
                openSiteVisit,
                closeSiteVisit,
                openCallBack,
                closeCallBack,
                openContactWithUs,
                closeContactWithUs,
                allJobApplications,
                openJobApplications,
                closeJobApplications,
                rejectedJobApplications,
                openSuppliers,
                closeSuppliers,
                openServicesEnquiry,
                closeServicesEnquiry
            } = obj;
            let totalUsersCount = await totalUsers();
            let activeUsersCount = await activeUsers();
            let inActiveCount = totalUsersCount - activeUsersCount;

            let results = {
                users: {
                    total: totalUsersCount,
                    active: activeUsersCount,
                    inActive: inActiveCount
                },
                properties: {
                    sell: {
                        residential: await sellResidential(),
                        commercial: await sellCommercial()
                    },
                    rent: {
                        residential: await rentResidential(),
                        commercial: await rentCommercial()
                    }
                },
                booking: await totalBookings(),
                enquiry: {
                    open: await openEnquiry(),
                    close: await closeEnquiry()
                },
                siteVisit: {
                    open: await openSiteVisit(),
                    close: await closeSiteVisit()
                },
                callBack: {
                    open: await openCallBack(),
                    close: await closeCallBack()
                },
                contactWithUs: {
                    open: await openContactWithUs(),
                    close: await closeContactWithUs()
                },
                jobApplications: {
                    all: await allJobApplications(),
                    open: await openJobApplications(),
                    close: await closeJobApplications(),
                    rejected: await rejectedJobApplications()
                },
                suppliers: {
                    open: await openSuppliers(),
                    close: await closeSuppliers()
                },
                servicesEnquiry: {
                    open: await openServicesEnquiry(),
                    close: await closeServicesEnquiry()
                }
            }
            res.send({ status: true, message: "Dashboard Details", data: results });


        }
        catch (e) {
            console.log('Dashboard Details err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in Dashboard Details" });
        }
    }
    let obj = {
        totalUsers,
        activeUsers,
        sellResidential,
        sellCommercial,
        rentResidential,
        rentCommercial,
        totalBookings,
        openEnquiry,
        closeEnquiry,
        openSiteVisit,
        closeSiteVisit,
        openCallBack,
        closeCallBack,
        openContactWithUs,
        closeContactWithUs,
        allJobApplications,
        openJobApplications,
        closeJobApplications,
        rejectedJobApplications,
        openSuppliers,
        closeSuppliers,
        openServicesEnquiry,
        closeServicesEnquiry
    }
    return getFun.bind(null, obj);

}
module.exports = getDashBoardData;