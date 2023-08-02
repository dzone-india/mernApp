import { useRoutes, Navigate } from "react-router-dom";
import DashboardLayout from "../components/dashboard-layout";
import MainLayout from "../components/main-layout";

//Pages
import DropzoneWrapperTest from "../common/DropzoneWrapper/DropZoneWrapperTest";
import AddInvestWithUs from "../pages/investwithusManagement/addInvestWithUs";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import HomePage from "../pages/home";
import MenuList from "../pages/menuManagement";
import AddMenu from "../pages/menuManagement/add";
import UserList from "../pages/userManagement";
import AddUser from "../pages/userManagement/add";
import Error404Page from "../pages/404";
import RoleList from "../pages/roleManagement";
import AddRole from "../pages/roleManagement/add";

import CareerList from "../pages/careerManagement";
import AddCareer from "../pages/careerManagement/add";
import CareerApplication from "../pages/careerManagement/application";
import BlogList from "../pages/blogManagement";
import AddBlog from "../pages/blogManagement/add";
import ContactusList from "../pages/contactusManagement";
import SiteVisitList from "../pages/siteVisitManagement";
import EnquiryList from "../pages/EnquiryManagement";
import CallbackList from "../pages/CallbackManagement";
import ReviewList from "../pages/reviewManagement";

import BookingList from "../pages/bookingManagement";
import ForgotPassword from "../pages/forgotPassword";
import ResetPassword from "../pages/resetPassword";
import NewPassword from "../pages/newPassword";
import Verification from "../pages/verificationPage";
import PropertyList from "../pages/propertyManagement";
import AddProperty from "../pages/propertyManagement/add";

import AboutUsList from "../pages/aboutUsManagement";
import AddAboutUs from "../pages/aboutUsManagement/add";
import SliderList from "../pages/homeSliderManagement";
import AddSlider from "../pages/homeSliderManagement/add";
import DealingList from "../pages/dealingManagement";
import AddDealing from "../pages/dealingManagement/add";
import DealingItemList from "../pages/dealingItemManagement";
import AddDealingItem from "../pages/dealingItemManagement/add";
import ServiceList from "../pages/serviceManagement";
import AddService from "../pages/serviceManagement/add";
import ServiceItemList from "../pages/serviceItemManagement";
import AddServiceItem from "../pages/serviceItemManagement/add";
import BuildingList from "../pages/buildingManagement";
import AddBuilding from "../pages/buildingManagement/add";
import Myacc from "../pages/MyAccountManagement";
import TeamList from "../pages/teamManagement";
import AddTeam from "../pages/teamManagement/add";
import Social from "../pages/socialManagement/add";
import Address from "../pages/addressManagement/add";
import FeedbackList from "../pages/feedbackManagement";
import AddFeedback from "../pages/feedbackManagement/add";
import DirectorList from "../pages/directorManagement";
import AddDirector from "../pages/directorManagement/add";
import ConstructionList from "../pages/constructionManagement";
import AddConstruction from "../pages/constructionManagement/add";
import InvestwithusList from "../pages/investwithusManagement";
import AddInvestwithusList from "../pages/investwithusManagement/add";
import NewsletterList from "../pages/newsletterManagement";

import AboutPageList from "../pages/aboutpageManagement";
import AddAboutPage from "../pages/aboutpageManagement/add";
import FinanceList from "../pages/financeManagement";
import AddFinance from "../pages/financeManagement/add";

import CmsList from "../pages/cmsManagement";
import AddCms from "../pages/cmsManagement/add";
import SupplierList from "../pages/supplierManagement";
import AddSupplier from "../pages/supplierManagement/add";
import ServiceInquiryList from "../pages/serviceInquiryManagement";

const Routes = (props) => {
  const { isAuth } = props;
  const routes = [
    {
      path: "/",
      element: isAuth ? <DashboardLayout /> : <MainLayout />,
      children: [
        {
          path: "/",
          element: isAuth ? <Navigate to="/home" /> : <Navigate to="/login" />,
        },
        {
          path: "/login",
          element: !isAuth ? <LoginPage /> : <Navigate to="/" />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/forgot",
          element: <ForgotPassword />,
        },
        {
          path: "/reset",
          element: <ResetPassword />,
        },
        {
          path: "/setnewpassword",
          element: <NewPassword />,
        },
        {
          path: "/verification",
          element: <Verification />,
        },
        {
          path: "/home",
          element: isAuth ? <HomePage /> : <Navigate to="/login" />,
        },
        {
          path: "/role",
          element: isAuth ? <RoleList /> : <Navigate to="/role" />,
        },
        {
          path: "/role/add",
          element: isAuth ? <AddRole /> : <Navigate to="/role/add" />,
        },
        // Put new route above this line
        {
          path: "/menu",
          element: isAuth ? <MenuList /> : <Navigate to="/login" />,
        },
        {
          path: "/menu/add",
          element: isAuth ? <AddMenu /> : <Navigate to="/login" />,
        },
        {
          path: "/user",
          element: isAuth ? <UserList /> : <Navigate to="/login" />,
        },
        {
          path: "/user/add",
          element: isAuth ? <AddUser /> : <Navigate to="/login" />,
        },
        {
          path: "/career",
          element: isAuth ? <CareerList /> : <Navigate to="/login" />,
        },
        {
          path: "/career/add",
          element: isAuth ? <AddCareer /> : <Navigate to="/login" />,
        },
        {
          path: "/career/applied",
          element: isAuth ? <CareerApplication /> : <Navigate to="/login" />,
        },
        {
          path: "/blog",
          element: isAuth ? <BlogList /> : <Navigate to="/login" />,
        },
        {
          path: "/blog/add",
          element: isAuth ? <AddBlog /> : <Navigate to="/login" />,
        },
        {
          path: "/contactus",
          element: isAuth ? <ContactusList /> : <Navigate to="/login" />,
        },
        {
          path: "/site-visit",
          element: isAuth ? <SiteVisitList /> : <Navigate to="/login" />,
        },
        {
          path: "/enquiry",
          element: isAuth ? <EnquiryList /> : <Navigate to="/login" />,
        },
        {
          path: "/callback",
          element: isAuth ? <CallbackList /> : <Navigate to="/login" />,
        },
        {
          path: "/review",
          element: isAuth ? <ReviewList /> : <Navigate to="/login" />,
        },
        {
          path: "/booking",
          element: isAuth ? <BookingList /> : <Navigate to="/login" />,
        },
        {
          path: "/property/add",
          element: isAuth ? <AddProperty /> : <Navigate to="/login" />,
        },
        {
          path: "/property",
          element: isAuth ? <PropertyList /> : <Navigate to="/login" />,
        },
        {
          path: "/aboutus/add",
          element: isAuth ? <AddAboutUs /> : <Navigate to="/login" />,
        },
        {
          path: "/aboutus",
          element: isAuth ? <AboutUsList /> : <Navigate to="/login" />,
        },
        {
          path: "/slider/add",
          element: isAuth ? <AddSlider /> : <Navigate to="/login" />,
        },
        {
          path: "/slider",
          element: isAuth ? <SliderList /> : <Navigate to="/login" />,
        },
        {
          path: "/dealing/add",
          element: isAuth ? <AddDealing /> : <Navigate to="/login" />,
        },
        {
          path: "/dealing",
          element: isAuth ? <DealingList /> : <Navigate to="/login" />,
        },
        {
          path: "/dealingItem/add",
          element: isAuth ? <AddDealingItem /> : <Navigate to="/login" />,
        },
        {
          path: "/dealingItem",
          element: isAuth ? <DealingItemList /> : <Navigate to="/login" />,
        },
        {
          path: "/service/add",
          element: isAuth ? <AddService /> : <Navigate to="/login" />,
        },
        {
          path: "/service",
          element: isAuth ? <ServiceList /> : <Navigate to="/login" />,
        },
        {
          path: "/serviceItem/add",
          element: isAuth ? <AddServiceItem /> : <Navigate to="/login" />,
        },
        {
          path: "/serviceItem",
          element: isAuth ? <ServiceItemList /> : <Navigate to="/login" />,
        },
        {
          path: "/building/add",
          element: isAuth ? <AddBuilding /> : <Navigate to="/login" />,
        },
        {
          path: "/building",
          element: isAuth ? <BuildingList /> : <Navigate to="/login" />,
        },
        {
          path: "/myaccount",
          element: isAuth ? <Myacc /> : <Navigate to="/login" />,
        },
        {
          path: "/team",
          element: isAuth ? <TeamList /> : <Navigate to="/login" />,
        },
        {
          path: "/team/add",
          element: isAuth ? <AddTeam /> : <Navigate to="/login" />,
        },
        {
          path: "/address",
          element: isAuth ? <Address /> : <Navigate to="/login" />,
        },
        {
          path: "/social",
          element: isAuth ? <Social /> : <Navigate to="/login" />,
        },
        {
          path: "/feedback",
          element: isAuth ? <FeedbackList /> : <Navigate to="/login" />,
        },
        {
          path: "/feedback/add",
          element: isAuth ? <AddFeedback /> : <Navigate to="/login" />,
        },
        {
          path: "/director",
          element: isAuth ? <DirectorList /> : <Navigate to="/login" />,
        },
        {
          path: "/director/add",
          element: isAuth ? <AddDirector /> : <Navigate to="/login" />,
        },

        {
          path: "/construction",
          element: isAuth ? <ConstructionList /> : <Navigate to="/login" />,
        },
        {
          path: "/construction/add",
          element: isAuth ? <AddConstruction /> : <Navigate to="/login" />,
        },
        {
          path: "/investwithus",
          element: isAuth ? <InvestwithusList /> : <Navigate to="/login" />,
        },
        {
          path: "/investwithus/add",
          element: isAuth ? <AddInvestwithusList /> : <Navigate to="/login" />,
          // element: isAuth ? <DropzoneWrapperTest /> : <Navigate to="/login" />,
          
        },
        {
          path: "/newsletter",
          element: isAuth ? <NewsletterList /> : <Navigate to="/login" />,
        },
        {
          path: "/aboutpage",
          element: isAuth ? <AboutPageList /> : <Navigate to="/login" />,
        },
        {
          path: "/aboutpage/add",
          element: isAuth ? <AddAboutPage /> : <Navigate to="/login" />,
        },
        {
          path: "/finance",
          element: isAuth ? <FinanceList /> : <Navigate to="/login" />,
        },
        {
          path: "/finance/add",
          element: isAuth ? <AddFinance /> : <Navigate to="/login" />,
        },
        {
          path: "/cms",
          element: isAuth ? <CmsList /> : <Navigate to="/login" />,
        },
        {
          path: "/cms/add",
          element: isAuth ? <AddCms /> : <Navigate to="/login" />,
        },
        {
          path: "/supplier/add",
          element: isAuth ? <AddSupplier /> : <Navigate to="/login" />,
        },
        {
          path: "/supplier",
          element: isAuth ? <SupplierList /> : <Navigate to="/login" />,
        },
        {
          path: "/serviceInquiry",
          element: isAuth ? <ServiceInquiryList /> : <Navigate to="/login" />,
        },
        {
          path: "404",
          element: <Error404Page />,
        },
        {
          path: "*",
          element: <Navigate to="/404" />,
        },
      ],
    },
  ];

  const router = useRoutes(routes);
  return <>{router}</>;
};

export default Routes;
