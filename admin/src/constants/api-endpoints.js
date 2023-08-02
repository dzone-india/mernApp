/**
 * All the API Endpoints should be register here
 */
const API_ENDPOINTS = {
  BASE_URL: "https://api.vishalconstructioncompany.com/",

  LOGIN_ENDPOINT: "/users/login",
  REGISTER_ENDPOINT: "/users/signup",
  FORGOT_ENDPOINT: "/users/forgotPassword",
  NEW_PASSWORD_ENDPOINT: "/users/setNewPassword",
  RESET_PASSWORD_ENDPOINT: "/users/setResetPassword",
  USER_VERIFICATION_ENDPOINT: "/users/verification",

  MODULERIGHTS_ENDPOINT: "/menuModule/getAllMenuList",
  //menu module
  MENULIST_ENDPOINT: "menuModule/getAllMenuList",
  MENUADD_ENDPOINT: "menuModule/createMenu",
  MENU_STATUS_UPDATE_ENDPOINT: "menuModule/updateMenuStatus",
  MENU_UPDATE_ENDPOINT: "menuModule/updateMenu",
  MENU_DATA_ENDPOINT: "menuModule/getMenuData",
  MENU_DATA_ENDPOINT: "menuModule/getMenuData",
  // user Module

  USER_ROLELIST_ENDPOINT: "role/userRoleList",
  USER_LIST_ENDPOINT: "users/getAllUser",
  USER_ADD_ENDPOINT: "users/createUser",
  USER_STATUS_UPDATE_ENDPOINT: "users/updateUserStatus",
  USER_UPDATE_ENDPOINT: "users/updateUser",
  USER_DATA_ENDPOINT: "users/getUser",
  USER_DELETE_ENDPOINT: "users/deleteUser",

  ENQUIRY_LIST_ENDPOINT: "enquiry/getEnquiryRequest",
  ENQUIRY_STATUS_UPDATE_ENDPOINT: "enquiry/updateEnquiryStatusRequest",

  CALLBACK_LIST_ENDPOINT: "callback/getCallbackRequest",
  CALLBACK_STATUS_UPDATE_ENDPOINT: "callback/updateCallbackStatusRequest",

  REVIEW_LIST_ENDPOINT: "review/getReviewRequest",
  REVIEW_STATUS_UPDATE_ENDPOINT: "review/updateReviewStatusRequest",

  //career module
  CAREER_LIST_ENDPOINT: "career/getAllCareer",
  CAREER_ADD_ENDPOINT: "career/createCareer",
  CAREER_STATUS_UPDATE_ENDPOINT: "career/updateCareerStatus",
  CAREER_UPDATE_ENDPOINT: "career/updateCareer",
  CAREER_DELETE_ENDPOINT: "career/deleteCareer",
  CAREER_DATA_ENDPOINT: "career/getCareerDetail",

  CAREER_APPLICATION_LIST_ENDPOINT: "career/JobApplications",
  CAREER_APPLICATION_STATUS_UPDATE_ENDPOINT: "career/updateApplicationStatus",

  //blog module
  BLOG_LIST_ENDPOINT: "blog/getAllBlog",
  BLOG_ADD_ENDPOINT: "blog/createBlog",
  BLOG_STATUS_UPDATE_ENDPOINT: "blog/updateBlogStatus",
  BLOG_UPDATE_ENDPOINT: "blog/updateBlog",
  BLOG_DELETE_ENDPOINT: "blog/deleteBlog",
  BLOG_DATA_ENDPOINT: "blog/getBlogDetail",

  //Dashboard module
  DASHBOARD_DATA_ENDPOINT:"home/dashboard",
  //Role module
  ROLE_ADD_ENDPOINT: "role/createUserRole",
  ROLE_LIST_ENDPOINT: "role/userRoleList",
  ROLE_STATUS_UPDATE_ENDPOINT: "role/updateStatusUserRole",
  ROLE_UPDATE_ENDPOINT: "role/createUserRole",
  ROLE_DELETE_ENDPOINT: "role/userRoleDelete",
  ROLE_DATA_ENDPOINT: "role/userRoleDetails",

  //BOOKING module
  BOOKING_LIST_ENDPOINT: "booking/getBookingList",
  BOOKING_STATUS_UPDATE_ENDPOINT: "booking/updateBookingStatus",

  //Site visit
  SITEVISIT_LIST_ENDPOINT: "sitevisit/getSiteVisitRequest",
  SITEVISIT_STATUS_UPDATE_ENDPOINT: "sitevisit/updateSiteVisitStatusRequest",

  //Contact us
  CONTACTUS_LIST_ENDPOINT: "contactus/getContactUsList",
  CONTACTUS_STATUS_UPDATE_ENDPOINT: "contactus/updateContactUsStatus",

  //property
  PROPERTY_LIST_ENDPOINT: "property/getAllProperty",
  PROPERTY_ADD_ENDPOINT: "property/createPropertyRequest",
  PROPERTY_IMAGE_ENDPOINT: "property/uploadImage",

  PROPERTY_UPDATE_ENDPOINT: "property/updateProperty",
  PROPERTY_DATA_ENDPOINT: "property/getPropertyDetail",
  PROPERTY_DELETE_ENDPOINT: "property/deleteProperty",
  PROPERTY_STATUS_UPDATE_ENDPOINT: "property/updatePropertyStatusRequest",

  //ABOUT module
  ABOUTUS_LIST_ENDPOINT: "home/homeAbout",
  ABOUTUS_UPDATE_ENDPOINT: "home/updateAboutSection",
  ABOUTUS_ADD_ENDPOINT: "home/createAboutSection",
  ABOUTUS_DATA_ENDPOINT: "home/homeAbout",

  //slider module
  SLIDER_LIST_ENDPOINT: "slider/getSliderList",
  SLIDER_ADD_ENDPOINT: "slider/createSlider",
  SLIDER_STATUS_UPDATE_ENDPOINT: "slider/updateSliderStatus",
  SLIDER_UPDATE_ENDPOINT: "slider/updateSlider",
  SLIDER_DELETE_ENDPOINT: "slider/deleteSlider",
  SLIDER_DATA_ENDPOINT: "slider/getSliderDetail",

  //DEALING module
  DEALING_LIST_ENDPOINT: "home/getDealingList",
  DEALING_ADD_ENDPOINT: "home/createDealingIn",
  DEALING_STATUS_UPDATE_ENDPOINT: "home/updateDealingInStatusHelper",
  DEALING_DELETE_ENDPOINT: "home/deleteDealingIn",
  DEALING_DATA_ENDPOINT: "home/getDealingInDetails",
  DEALING_UPDATE_ENDPOINT: "home/updateDealingIn",

  //dealing item module
  DEALING_ITEM_LIST_ENDPOINT: "home/getDealingItemList",
  DEALING_ITEM_ADD_ENDPOINT: "home/createDealingInItem",
  DEALING_ITEM_STATUS_UPDATE_ENDPOINT: "home/updateDealingInItemStatusHelper",
  DEALING_ITEM_DELETE_ENDPOINT: "home/deleteDealingItem",
  DEALING_ITEM_DATA_ENDPOINT: "home/getDealingItem",
  DEALING_ITEM_UPDATE_ENDPOINT: "home/updateDealingInItem",

  //service module
  SERVICE_LIST_ENDPOINT: "home/getServiceList",
  SERVICE_ADD_ENDPOINT: "home/createService",
  SERVICE_STATUS_UPDATE_ENDPOINT: "home/updateServiceStatusHelper",
  SERVICE_DELETE_ENDPOINT: "home/deleteService",
  SERVICE_DATA_ENDPOINT: "home/getServiceDetail",
  SERVICE_UPDATE_ENDPOINT: "home/updateService",

  //service item module
  SERVICE_ITEM_LIST_ENDPOINT: "home/getServiceItemList",
  SERVICE_ITEM_ADD_ENDPOINT: "home/createServiceItem",
  SERVICE_ITEM_STATUS_UPDATE_ENDPOINT: "home/updateServiceItemStatus",
  SERVICE_ITEM_DELETE_ENDPOINT: "home/deleteServiceItem",
  SERVICE_ITEM_DATA_ENDPOINT: "home/getServiceItem",
  SERVICE_ITEM_UPDATE_ENDPOINT: "home/updateServiceItem",

  //building module
  BUILDING_LIST_ENDPOINT: "builder/getBuildingList",
  BUILDING_ADD_ENDPOINT: "builder/createBuilding",
  BUILDING_STATUS_UPDATE_ENDPOINT: "builder/updateBuildingStatus",
  BUILDING_DELETE_ENDPOINT: "builder/deleteBuildingItem",
  BUILDING_UPDATE_ENDPOINT: "builder/updateBuilding",
  BUILDING_DATA_ENDPOINT: "builder/getBuildingItem",

  //team module
  TEAM_LIST_ENDPOINT: "team/getTeamList",
  TEAM_ADD_ENDPOINT: "team/createTeamMember",
  TEAM_STATUS_UPDATE_ENDPOINT: "team/updateTeamMemberStatus",
  TEAM_UPDATE_ENDPOINT: "team/updateTeamMember",
  TEAM_DELETE_ENDPOINT: "team/deleteTeamMember",
  TEAM_DATA_ENDPOINT: "team/getTeamMemberDetail",

  //address module
  ADDRESS_ADD_ENDPOINT: "home/createVishalAddress",
  ADDRESS_UPDATE_ENDPOINT: "home/updateVishalAddress",
  ADDRESS_DATA_ENDPOINT: "home/getVishalAddress",

  //social module
  SOCIAL_ADD_ENDPOINT: "home/createSocialMedia",
  SOCIAL_UPDATE_ENDPOINT: "home/updateSocialMedia",
  SOCIAL_DATA_ENDPOINT: "home/getSocialMedia",

  //feedback module
  FEEDBACK_LIST_ENDPOINT: "feedback/getFeedbackList",
  FEEDBACK_ADD_ENDPOINT: "feedback/createFeedback",
  FEEDBACK_STATUS_UPDATE_ENDPOINT: "feedback/updateFeedbackStatus",
  FEEDBACK_UPDATE_ENDPOINT: "feedback/updateFeedback",
  FEEDBACK_DELETE_ENDPOINT: "feedback/deleteFeedback",
  FEEDBACK_DATA_ENDPOINT: "feedback/getFeedbackDetails",

  //director module
  DIRECTOR_LIST_ENDPOINT: "team/getDirectorList",
  DIRECTOR_ADD_ENDPOINT: "team/createDirector",
  DIRECTOR_STATUS_UPDATE_ENDPOINT: "team/updateDirectorStatus",
  DIRECTOR_UPDATE_ENDPOINT: "team/updateDirector",
  DIRECTOR_DELETE_ENDPOINT: "team/deleteDirector",
  DIRECTOR_DATA_ENDPOINT: "team/getDirectorDetail",

  //construction module
  CONSTRUCTION_LIST_ENDPOINT: "constructionProcess/getAllConstructionProcess",
  CONSTRUCTION_ADD_ENDPOINT: "constructionProcess/createConstructionProcess",
  CONSTRUCTION_STATUS_UPDATE_ENDPOINT:
    "constructionProcess/updateConstructionProcessStatus",
  CONSTRUCTION_UPDATE_ENDPOINT: "constructionProcess/updateConstructionProcess",
  CONSTRUCTION_DELETE_ENDPOINT: "constructionProcess/deleteConstructionProcess",
  CONSTRUCTION_DATA_ENDPOINT:
    "constructionProcess/getConstructionProcessDetail",

  //investwithus module
  INVESTWITHUS_LIST_ENDPOINT: "investWithUs/getAllInvestWithUs",
  INVESTWITHUS_ADD_ENDPOINT: "investWithUs/createInvestWithUs",
  INVESTWITHUS_STATUS_UPDATE_ENDPOINT: "investWithUs/updateInvestWithUsStatus",
  INVESTWITHUS_UPDATE_ENDPOINT: "investWithUs/updateInvestWithUs",
  INVESTWITHUS_DELETE_ENDPOINT: "investWithUs/deleteInvestWithUs",
  INVESTWITHUS_DATA_ENDPOINT: "investWithUs/getInvestWithUsDetail",

  //news letter module
  NEWSLETTER_LIST_ENDPOINT: "newsLetter/getAllNewsLetter",
  NEWSLETTER_STATUS_UPDATE_ENDPOINT: "newsLetter/updateNewsLetterStatus",
  NEWSLETTER_DELETE_ENDPOINT: "newsLetter/deleteNewsLetter",

  //aboutPage module
  ABOUTPAGE_LIST_ENDPOINT: "aboutPage/getAboutPageList",
  ABOUTPAGE_ADD_ENDPOINT: "aboutPage/createAboutPage",
  ABOUTPAGE_STATUS_UPDATE_ENDPOINT: "aboutPage/updateAboutPageStatus",
  ABOUTPAGE_UPDATE_ENDPOINT: "aboutPage/updateAboutPage",
  ABOUTPAGE_DELETE_ENDPOINT: "aboutPage/deleteAboutPageData",
  ABOUTPAGE_DATA_ENDPOINT: "aboutPage/getAboutPageDetail",

  //fiance module
  FINANCE_LIST_ENDPOINT: "finance/getFinanceList",
  FINANCE_ADD_ENDPOINT: "finance/createFinance",
  FINANCE_STATUS_UPDATE_ENDPOINT: "finance/updateFinanceStatus",
  FINANCE_UPDATE_ENDPOINT: "finance/updateFinance",
  FINANCE_DELETE_ENDPOINT: "finance/deleteFinanceData",
  FINANCE_DATA_ENDPOINT: "finance/getFinanceDetail",

  //cms module
  CMS_LIST_ENDPOINT: "cms/getCMSList",
  CMS_ADD_ENDPOINT: "cms/createCMS",
  CMS_STATUS_UPDATE_ENDPOINT: "cms/updateCMSStatus",
  CMS_UPDATE_ENDPOINT: "cms/updateCMS",
  CMS_DELETE_ENDPOINT: "cms/deleteCMS",
  CMS_DATA_ENDPOINT: "cms/getCMSDetail",

  // SUPPLIER module

  SUPPLIER_LIST_ENDPOINT: "supplier/getSupplierList",
  SUPPLIER_ADD_ENDPOINT: "supplier/createSupplier",
  SUPPLIER_STATUS_UPDATE_ENDPOINT: "supplier/updateSupplierStatus",
  SUPPLIER_UPDATE_ENDPOINT: "supplier/updateSupplier",
  SUPPLIER_DELETE_ENDPOINT: "supplier/deleteSupplier",
  SUPPLIER_DATA_ENDPOINT: "supplier/getSupplierDetail",

  SERVICE_INQUIRY_LIST_ENDPOINT: "services/getServicesEnquiryList",
  SERVICE_INQUIRY_STATUS_UPDATE_ENDPOINT:
    "services/updateServicesEnquiryStatus",
  SERVICE_INQUIRY_DELETE_ENDPOINT: "services/deleteServicesEnquiry",
};

export default API_ENDPOINTS;
