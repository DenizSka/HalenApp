import React, { Component } from 'react';
// import MoreInfo from "./MoreInfo";
import SingleEvent from "./SingleEvent";
import { render } from 'react-dom';
import Geolocation from "react-geolocation";
import hoistNonReactStatics from 'hoist-non-react-statics';
import { compose, withProps, withStateHandlers, lifecycle } from "recompose"
import ReactGoogleMapLoader from "react-google-maps-loader";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer} from "react-google-maps";
import "./css/Events.css";


class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false,
      isMarkerShown: false,
    };
    this.delayedShowMarker = this.delayedShowMarker.bind(this);
    // this.handleLocationCall = this.handleLocationCall.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
  }

  componentDidMount() {
    this.delayedShowMarker();
    // this.handleLocationCall();
  }

  // handleLocationCall(){
  //   const directions = this.props.apiData.map((latlong => latlong.directions));
  //   this.setState({directions: directions});
  //   console.log('state inside location call', this.state.directions)
  // }


  delayedShowMarker() {
    setTimeout(() => {
      this.setState({ isMarkerShown: true,
           })
    }, 3000)
  }

  render() {
    return (
    <div className="event-list">
      <section className="googlemap">
      <Geolocation
      onSuccess={
        (position) => {this.setState({position: {lat: position.coords.latitude, lng: position.coords.longitude}});
        console.log(position)}}
      render={({
        fetchingPosition,
        position: { coords: { latitude, longitude } = {} } = {},
        error,
        getCurrentPosition
      }) =>
        <div className="googlemap">
          <button onClick={getCurrentPosition}>Get Position</button>
          {error &&
            <div>
              {error.message}
            </div>}
        </div>}
    />
      <div id="relative">
      <MapWithADirectionsRenderer
        isMarkerShown={this.state.isMarkerShown}
        // onMarkerClick={this.handleMarkerClick}
        position={this.state.position}

      />
      </div>
      </section>

      <div className="sectionlist">

        <h1 className="resultssection"> Here are Today's Events </h1>
          {this.props.apiData.map((event, index)=> (

          <div className="resultssection" key={index}>
          <SingleEvent event={event}/>

          </div>

              ))}
      </div>
    </div>
    )
  }

  handleShowMore() {
    this.setState({showMore: true})
  }
}


const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const MapWithADirectionsRenderer =  compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="map" style={{ height: `1000px`, width: `680px`}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
    withScriptjs,
  withGoogleMap,

  lifecycle({
    componentDidMount() {
      const google = window.google;
      const DirectionsService = new google.maps.DirectionsService();
      // const DirectionsDisplay = new google.maps.DirectionsRenderer();
      DirectionsService.route({
        origin: new google.maps.LatLng(41.8525800, -87.6514100),
        destination: new google.maps.LatLng(41.8525800, -87.6514100),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)((props) =>
  <GoogleMap
    defaultZoom={10}
    center={props.position || { lat: 40.7150, lng: -73.9843 }}
  >
  {props.directions && <DirectionsRenderer directions={props.directions} />}

    <MarkerWithLabel
      position={props.position || { lat: 40.7831, lng: -73.9712 }}
      labelAnchor={new window.google.maps.Point(0, 0)}
      labelStyle={{background: "white", fontSize: "15px", padding: "10px"}}
      onPositionChanged={props.onPositionChanged}
    >
      <div>You are Here! </div>
    </MarkerWithLabel>}
  </GoogleMap>
);



export default Events;
