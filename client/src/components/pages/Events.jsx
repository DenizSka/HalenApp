import React, { Component } from 'react';
// import MoreInfo from "./MoreInfo";
import SingleEvent from "./SingleEvent";
import { render } from 'react-dom';
import Geolocation from "react-geolocation";
import hoistNonReactStatics from 'hoist-non-react-statics';
import { compose, withProps, withStateHandlers } from "recompose"
import ReactGoogleMapLoader from "react-google-maps-loader";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import "./css/Events.css";

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: [],
      showMore: false,
      isMarkerShown: false,
    };
    this.delayedShowMarker = this.delayedShowMarker.bind(this);
    this.handleLocationCall = this.handleLocationCall.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
  }

  componentDidMount() {
    this.delayedShowMarker();
    this.handleLocationCall();
  }

  handleLocationCall(){
    const directions = this.props.apiData.map((latlong => latlong.directions));
    this.setState({directions: directions});
    console.log('state', this.state.directions)
  }


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
      onSuccess={ (position) => {this.setState({position: {lat: position.coords.latitude, lng: position.coords.longitude}}); console.log(position)}}
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
      <Maps
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
const Maps = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="map" style={{ height: `1000px`, width: `1500px`}} />,
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
)((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={props.position || { lat: 40.7831, lng: -73.9712 }}
  >
    <MarkerWithLabel
      position={props.position || { lat: 40.7831, lng: -73.9712 }}
      labelAnchor={new window.google.maps.Point(0, 0)}
      labelStyle={{background: "white", fontSize: "15px", padding: "10px"}}
    >
      <div>You are Here!</div>
    </MarkerWithLabel>
  </GoogleMap>
);

export default Events;
