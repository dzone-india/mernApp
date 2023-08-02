import {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Container} from '@material-ui/core';

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '400px'
};

const addMarkers = (markers) => {
    console.log("adding markers ", markers);
    return (markers).map((marker, i) => {
        return <Marker
            key={i}
            title={`${marker.lat},${marker.lng}`}
            name={''}
            position={marker} />;
    });
};

export class MapContainer extends Component {

    state = {markers: []};

    constructor(props) {
        super(props);
        const defaultMarker = {lat: 26.827091790669822, lng: 75.84772681478361};
        this.state.markers = this.props.markers || [defaultMarker];
        console.log("markers for map **** ", this.props.markers);
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.markers !== this.state.markers) {
            this.setState({markers: nextProps.markers});
            console.log("markers updated", nextProps.markers);
        }
    }

    render() {



        return (
            <Map google={this.props.google}
                zoom={1}
                containerStyle={containerStyle}
                initialCenter={this.state.markers[0]}
            >
                {/* <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 37.778519, lng: -122.405640}} />
                <Marker
                    name={'Dolores park'}
                    position={{lat: 37.759703, lng: -122.428093}} />
                <Marker />
                <Marker
                    name={'Your position'}
                    position={{lat: 37.762391, lng: -122.439192}}
                /> */}
                {
                    addMarkers(this.state.markers)
                }

                <InfoWindow onClose={this.onInfoWindowClose}>
                    {/* <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div> */}
                </InfoWindow>
            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("")
})(MapContainer);