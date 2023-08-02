import React from 'react';
import {Container} from '@material-ui/core';
import './property-list.css';
import Header from '../../components/header';
import PageBanner from '../../components/page-banner';
import bannerImage from '../../images/about_us.jpeg';
import PropertyListCard from '../../components/property-list-card';
import {useDispatch, useSelector} from 'react-redux';
import * as PropertyActions from '../../redux/actions/PropertyAction';

const PropertyListPage = props => {
    const dispatch = useDispatch();
    const propertyListItems = useSelector(state => state.PropertyList);
    console.log('propertyListItems', propertyListItems);
    React.useEffect(() => {
        dispatch(PropertyActions.GetPropertyListRequestAsync({}));
    }, []);

    return (
        <div>
            <PageBanner bgImage={bannerImage} title="Property" currentPage="PROPERTY LIST" />
            <Container style={{paddingBottom: 40}}>
                <PropertyListCard />
                {propertyListItems?.map(pl => <PropertyListCard item={pl} />)}
            </Container>
        </div>
    );
};

export default PropertyListPage;