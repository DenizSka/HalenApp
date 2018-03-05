import React, { Component } from 'react';
// import MoreInfo from "./MoreInfo";
import SingleEvent from "./SingleEvent";


class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: [],
      showMore: false
    };

    this.handleLocationCall = this.handleLocationCall.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
  }

  componentDidMount() {
    this.handleLocationCall();
  }

  handleLocationCall(){
    const directions = this.props.apiData.map((latlong => latlong.directions));
    this.setState({directions: directions});
    console.log('state', this.state.directions)
  }


  render() {
    return (
    <div className="event-list">
    <h1 className="button medium"> Here are Today's Events </h1>
      {this.props.apiData.map((event, index)=> (
        <ul>
      <li key={index}>
      <SingleEvent event={event}/>
      </li>
      </ul>
          ))}
    </div>
    )
  }

  handleShowMore() {
    this.setState({showMore: true})
  }
}

export default Events;
