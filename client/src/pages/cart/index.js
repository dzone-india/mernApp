import React from 'react'
import {withRouter} from 'react-router-dom';

const CartPage = (props) => {
    console.log('-----cart.props', props);
    return (
        <div>
            This can be seen only if you are loggedIn.
        </div>
    )
}

export default withRouter(CartPage);
