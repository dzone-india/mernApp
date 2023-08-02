import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import NavItem2 from "../nav-item2";

import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import {
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
  Menu as MenuIcon,
  Briefcase as WorkIcon,
  FileText as FilesIcon,
  Sliders as SliderIcon,
  Phone as PhoneIcon,
  Navigation as NavIcon,
  MessageSquare as MessageIcon,
  PhoneIncoming as CallbackIcon,
  Star as StarIcon,
  Calendar as CalendarIcon,
  Home as HomeIcon,
  Settings as SettingIcon,
  Facebook as FbIcon,
  MessageCircle as FeedbackIcon,
  Tool as ToolIcon,
  DollarSign as InvestIcon,
  Trello as AboutIcon,
  File as CMSIcon,
  Truck as SupplierIcon,
} from "react-feather";
import { useSelector } from "react-redux";
import Logger from "../../utils/Logger";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  jobTitle: "Vishal Properties",
  name: "Admin",
};

const items = [
  {
    href: "/home",
    icon: BarChartIcon,
    title: "Dashboard",
  },

  {
    href: "/menu",
    icon: MenuIcon,
    title: "Menu",
    items: [
      {
        href: "/menu/add",
        icon: MenuIcon,
        title: "Add Menu",
      },
      {
        href: "/menu",
        icon: MenuIcon,
        title: "Menu List",
      },
    ],
  },
  {
    href: "/role",
    icon: UsersIcon,
    title: "User Role",
    items: [
      {
        href: "/role/add",
        icon: UsersIcon,
        title: " Add Role",
      },
      {
        href: "/role",
        icon: UsersIcon,
        title: "Role List",
      },
    ],
  },
  {
    href: "/user",
    icon: UsersIcon,
    title: "User",
    items: [
      {
        href: "/user/add",
        icon: UsersIcon,
        title: "Add User",
      },
      {
        href: "/user",
        icon: UsersIcon,
        title: "User List",
      },
    ],
  },
  {
    href: "/career",
    icon: WorkIcon,
    title: "Career",
    items: [
      {
        href: "/career/add",
        icon: WorkIcon,
        title: "Add Career",
      },
      {
        href: "/career",
        icon: WorkIcon,
        title: "Career List",
      },
      {
        href: "/career/applied",
        icon: WorkIcon,
        title: "Job Application List ",
      },
    ],
  },
  {
    href: "/blog",
    icon: FilesIcon,
    title: "Blog",
    items: [
      {
        href: "/blog/add",
        icon: FilesIcon,
        title: "Add Blog",
      },
      {
        href: "/blog",
        icon: FilesIcon,
        title: "Blog List",
      },
    ],
  },
  {
    href: "/slider",
    icon: SliderIcon,
    title: "Slider",
    items: [
      {
        href: "/slider/add",
        icon: SliderIcon,
        title: "Add Slider",
      },
      {
        href: "/slider",
        icon: SliderIcon,
        title: "Slider List",
      },
    ],
  },
  {
    href: "/contactus",
    icon: PhoneIcon,
    title: "Contact Us",
  },
  {
    href: "/site-visit",
    icon: NavIcon,
    title: "Site Visit",
  },
  {
    href: "/enquiry",
    icon: MessageIcon,
    title: "Enquirys",
  },
  {
    href: "/callback",
    icon: CallbackIcon,
    title: "Callback",
  },
  {
    href: "/review",
    icon: StarIcon,
    title: "Review",
  },
  {
    href: "/booking",
    icon: CalendarIcon,
    title: "Bookings",
  },
  {
    href: "/myaccount",
    icon: UserIcon,
    title: "Account",
  },
  {
    href: "/property",
    icon: HomeIcon,
    title: "Property",
    items: [
      {
        href: "/property/add",
        icon: HomeIcon,
        title: "Add Property",
      },
      {
        href: "/property",
        icon: HomeIcon,
        title: "Property List",
      },
    ],
  },
  {
    href: "/aboutus",
    icon: UsersIcon,
    title: "About Us",
    items: [
      {
        href: "/aboutus/add",
        icon: ShoppingBagIcon,
        title: "Add About Us",
      },
      {
        href: "/aboutus",
        icon: ShoppingBagIcon,
        title: "About Us List",
      },
    ],
  },
  {
    href: "/dealing",
    icon: UsersIcon,
    title: "Dealing In",
    items: [
      {
        href: "/dealing/add",
        icon: ShoppingBagIcon,
        title: "Add Dealing",
      },
      {
        href: "/dealing",
        icon: ShoppingBagIcon,
        title: "Dealing List",
      },
      {
        href: "/dealingItem/add",
        icon: ShoppingBagIcon,
        title: "Add Dealing Item",
      },
      {
        href: "/dealingItem",
        icon: ShoppingBagIcon,
        title: "Dealing Item List",
      },
    ],
  },
  {
    href: "/service",
    icon: SettingIcon,
    title: "Service",
    items: [
      {
        href: "/service/add",
        icon: SettingIcon,
        title: "Add Service",
      },
      {
        href: "/service",
        icon: SettingIcon,
        title: "Service List",
      },
      {
        href: "/serviceItem/add",
        icon: SettingIcon,
        title: "Add Service Item",
      },
      {
        href: "/serviceItem",
        icon: SettingIcon,
        title: "Service Item List",
      },
      {
        href: "/serviceInquiry",
        icon: SettingIcon,
        title: "Service Inquiry List",
      },
    ],
  },
  {
    href: "/building",
    icon: HomeIcon,
    title: "Building",
    items: [
      {
        href: "/building/add",
        icon: HomeIcon,
        title: "Add Building",
      },
      {
        href: "/building",
        icon: HomeIcon,
        title: "Building List",
      },
    ],
  },
  {
    href: "/team",
    icon: UsersIcon,
    title: "Team",
    items: [
      {
        href: "/team/add",
        icon: ShoppingBagIcon,
        title: "Add Team",
      },
      {
        href: "/team",
        icon: ShoppingBagIcon,
        title: "Team List",
      },
    ],
  },
  {
    href: "/address",
    icon: PhoneIcon,
    title: "Site Address",
  },
  {
    href: "/social",
    icon: FbIcon,
    title: "Social Media",
  },
  {
    href: "/feedback",
    icon: FeedbackIcon,
    title: "Feedback",
    items: [
      {
        href: "/feedback/add",
        icon: FeedbackIcon,
        title: " Add Feedback",
      },
      {
        href: "/feedback",
        icon: FeedbackIcon,
        title: "Feedback List",
      },
    ],
  },
  {
    href: "/director",
    icon: UserIcon,
    title: "Director",
    items: [
      {
        href: "/director/add",
        icon: UserIcon,
        title: "Add Director",
      },
      {
        href: "/director",
        icon: UserIcon,
        title: "Director List",
      },
    ],
  },
  {
    href: "/construction",
    icon: ToolIcon,
    title: "Construction Process",
    items: [
      {
        href: "/construction/add",
        icon: ToolIcon,
        title: "Add Construction Process",
      },
      {
        href: "/construction",
        icon: ToolIcon,
        title: "Construction Process List",
      },
    ],
  },
  {
    href: "/investwithus",
    icon: InvestIcon,
    title: "Invest With Us",
    items: [
      {
        href: "/investwithus/add",
        icon: InvestIcon,
        title: "Add Invest With Us",
      },
      {
        href: "/investwithus",
        icon: InvestIcon,
        title: "Invest With Us List",
      },
    ],
  },
  {
    href: "/newsletter",
    icon: FilesIcon,
    title: "News letters",
  },
  {
    href: "/aboutpage",
    icon: AboutIcon,
    title: "About page",
    items: [
      {
        href: "/aboutpage/add",
        icon: AboutIcon,
        title: "Add About page",
      },
      {
        href: "/aboutpage",
        icon: AboutIcon,
        title: "About page List",
      },
    ],
  },
  {
    href: "/finance",
    icon: InvestIcon,
    title: "Finance",
    items: [
      {
        href: "/finance/add",
        icon: InvestIcon,
        title: "Add Finance",
      },
      {
        href: "/finance",
        icon: InvestIcon,
        title: "Finance List",
      },
    ],
  },
  {
    href: "/cms",
    icon: CMSIcon,
    title: "CMS",
    items: [
      {
        href: "/cms/add",
        icon: CMSIcon,
        title: "Add CMS",
      },
      {
        href: "/cms",
        icon: CMSIcon,
        title: "CMS List",
      },
    ],
  },
  {
    href: "/supplier",
    icon: SupplierIcon,
    title: "Supplier",
    items: [
      {
        href: "/supplier/add",
        icon: SupplierIcon,
        title: "Add Supplier",
      },
      {
        href: "/supplier",
        icon: SupplierIcon,
        title: "Supplier List",
      },
    ],
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  const sidemenuList = useSelector((state) => state.SideMenuList.data);

  Logger.log("SIDEMENU-LIST", sidemenuList);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="/home"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items?.map((item, index) => (
            <NavItem2
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              items={item.items}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden only={["lg"]}>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden only={["xs", "sm", "md"]}>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
