import React, { Component } from 'react';
import Header from './components/pages/Header';
// import Footer from './components/pages/Footer';
import Events from './components/pages/Events';
import { compose, withProps, withStateHandlers } from "recompose"
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';

import axios from 'axios';
import { render } from 'react-dom';
import "./App.css";
import PastEvents from "./components/pages/PastEvents";
import { NavBar } from "./components/elements/NavBar";



class App extends Component {
  constructor() {
    super()
    this.state = {
      apiData: null,
      apiDataLoaded: false,

    };
    // this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleAxiosCall = this.handleAxiosCall.bind(this);
  }


  componentDidMount() {
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




  render() {
    return (
      <div className="App">
      <Header/>
      <NavBar />
      <section id="explore" className="clearfix">
        <main>
          <Switch>
            <Route path="/pastevents" component={PastEvents} />
          </Switch>
        </main>
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


