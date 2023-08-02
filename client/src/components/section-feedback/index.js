import React, {useEffect, useState} from "react";
import {Typography, Grid, Container, makeStyles, Button, Box} from "@material-ui/core";
import './section-feedback.css';
import SectionHeader from "../section-header";
import APP_CONSTANTS from "../../constants/app-constants";
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import FeedbackCard from "../feedback-card";
import ApiClient from '../../api-client/index';


const useStyles = makeStyles((theme) => ({

}));

const options = {
    margin: 50,
    responsiveClass: true,
    loop: false,
    nav: false,
    dots: true,
    autoplay: true,
    navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1,
            margin: 10,
        },
        576: {
            items: 2,
            margin: 15,
        },
        768: {
            items: 2,
            margin: 20,
        },
        992: {
            items: 3,
        }
    },
};

// const getFeedbackUi = (feedbackData) => {
//     const newList = 
//     // console.log("feedbakc list", newList, feedbackData);
//     return newList.slice();
// };

const SectionFeedback = props => {
    const classes = useStyles();

    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        populateFeedbackInfo();
    }, []);

    const populateFeedbackInfo = () => {
        const getData = async () => {
            const response = await ApiClient.call(ApiClient.REQUEST_METHOD.POST, '/feedback/getFeedbackForHome', {}, {}, {Cookie: ApiClient.cookie, Authorization: ApiClient.authorization}, false);

            console.log("feedbackin data ", response.data);
            setFeedbacks(response?.data || []);
        };
        getData();
    };

    return (
        <>
            <SectionHeader title={APP_CONSTANTS.section_feedback_title} subtitle={APP_CONSTANTS.section_feedback_subtitle} style={{color: '#FFFFFF'}} />
            <div className="feedback-wrapper">
                <OwlCarousel className='owl-theme' {...options}>
                    {console.log("feedback", feedbacks)}
                    {
                        (feedbacks || []).map((feedback, i) => {
                            return <div key={i}>
                                <FeedbackCard key={i + 5000} feedbacks={feedback} />
                            </div>;
                        })
                    }
                </OwlCarousel>
            </div>
        </>
    );

};

export default SectionFeedback;