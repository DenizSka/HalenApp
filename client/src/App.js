import React, { Component } from 'react';
import Header from './components/pages/Header';
// import Footer from './components/pages/Footer';
import Events from './components/pages/Events';
import { compose, withProps, withStateHandlers } from "recompose"
import ReactGoogleMapLoader from "react-google-maps-loader";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import Geolocation from "react-geolocation";
import hoistNonReactStatics from 'hoist-non-react-statics';
import axios from 'axios';
import { render } from 'react-dom';
import "./App.css";
import PastEvents from "./components/pages/PastEvents";
import { NavBar } from "./components/elements/NavBar";

const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const Maps = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="map" style={{ height: `700px`, width: `500px` }} />,
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
    defaultZoom={13}
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


class App extends Component {
  constructor() {
    super()
    this.state = {
      isMarkerShown: false,
      apiData: null,
      apiDataLoaded: false,

    };
    this.delayedShowMarker = this.delayedShowMarker.bind(this);
    // this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleAxiosCall = this.handleAxiosCall.bind(this);
  }


  componentDidMount() {
    this.delayedShowMarker();
    this.handleAxiosCall();
  }



  handleAxiosCall() {
    //debugger;
    /*
    this.setState({
            apiData: res.data.resultsPage.results.event,
            apiDataLoaded: true,
          });
          */
      axios.get(`/events`)
        .then((res) => {
          console.log(res.data)
          this.setState({
            apiData: res.data,
            apiDataLoaded: true,
          });
        })
        .catch(err => console.log(err));
    }

  delayedShowMarker() {
    setTimeout(() => {
      this.setState({ isMarkerShown: true,
           })
    }, 3000)
  }

  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false,
  //   });
  //   this.delayedShowMarker();
  // }


  render() {
    return (
      <div className="App">
      <Header/>
      <NavBar />
        <main>
          <Switch>
            <Route path="/pastevents" component={PastEvents} />
          </Switch>
        </main>
      <section id="explore" className="clearfix">
      <article>
      <Geolocation
      onSuccess={ (position) => {this.setState({position: {lat: position.coords.latitude, lng: position.coords.longitude}}); console.log(position)}}
      render={({
        fetchingPosition,
        position: { coords: { latitude, longitude } = {} } = {},
        error,
        getCurrentPosition
      }) =>
        <div>
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
      </article>
        <aside>

          {this.state.apiDataLoaded ? (
            <div>
              <Events apiData={this.state.apiData}
               />
            </div>) : (
              <p> Loading Events... </p>
          )}
          </aside>
      </section>

      </div>
    )
  }

}
export default App;


