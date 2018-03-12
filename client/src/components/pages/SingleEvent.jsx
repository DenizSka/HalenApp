import React, { Component } from 'react';
import MoreInfo from "./MoreInfo";
import axios from 'axios';

class SingleEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false
    };

    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  render() {
    let event = this.props.event
    return (

    <div className="singleresult">
        {event.displayName}
        { !this.state.showMore &&
          <button className="button medium" onClick={this.handleShowMore}> See More</button>
        }
        { this.state.showMore &&
          <MoreInfo event={event} onCancel={this.handleCancel} onAdd={ () => { this.handleAdd(event) } }/>
        }
      </div>
    )
  }

  handleShowMore() {
    this.setState({showMore: true})
  }

  handleCancel() {
    this.setState({showMore: false})
  }

  handleAdd(event) {
    console.log("event to be added, ", event)
    axios.put(`/pastevents`, {
      displayName: event.displayName,
      type: event.type,
      venue: event.venue.displayName,
      dateEvent: event.start.date,
      uri: event.uri
    })
      .then((res) => {
          console.log("api returned: ", res.data)
        this.setState({showMore: false})
      })
        .catch(err => console.log(err));
  }
}

export default SingleEvent;
