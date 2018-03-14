
<h1>Halen App - React &amp; Google Map API</h1>


<p>
You want to go to an event but are too lazy to go far or do not like planing ahead of time. With Project-4 app you can simply log-in search the events around your area on the day of the event with just one click. Using geolocation coordinates, the Google Places API and SoundKick API when the app loads, the user will see a map that is focused in on their current location and all the events within a 5000 meter radius are indicated with a guitar emoji. 

You can also search by date and time to see the upcoming events in your area. Once the map loads with guitar emoji's you will be able to click on them to get further info and also share your thoughts on the artist or your past experiences with thousands of other users. If you like to buy a ticket for that concert the app will redirect you to Songkick website. 
</p>
<div>
    <p>  <h3> Map View - Non-User </h3><br>
        <img src="../master/wireframes/map_view.png" width="300"/>
    </p>
    <p> <h3> User - Map View </h3> <br>
      <img src="../master/wireframes/user_mapview.png" width="300"/>
    </p>
    <p> <h3>Single Event View - User</h3> <br>
      <img src="../master/wireframes/single_viewuser.png" width="300"/>
    </p>

</div>

<h3>Clickable Dummy Site: </h3> 
<p>(Map View, User Map View, Single Artist Page)</p> <br>
<p>The site starts with the map view. From here please click login button to see the user's logged in view. On the google map user will see the concerts around their area based on today's date as guitar icons (since this is a static model, it says 1/18). From here please click on Lady Gaga concert to be directed to that event's page. Here the user can either read/add comments or click buy ticket to be redirected to the actual Songkick site of that event.</p>
https://fervent-ardinghelli-68c8cd.netlify.com/

<ul><h2>Good to have features: (NOT PART OF MVP)</h2></ul>
<li>Add the upcoming events to your calendar.</li>
<li>Adding other events that are not in the map view to the map for everyone to see. (ie. you personal housewarming party, This requires an admin feature. The user will have to send an email to admin a week before to even and ask for special permission)</li>


<ul><h2> Technologies Needed: </h2></ul>

<li> React</li> 
<li> Axios </li>
<li> Express </li>
<li> Google Geocoding API</li>
<li> Google Places API</li>
<li> Songkick or Bandsintown API</li>



<ul><h2> Important Milestones: </h2></ul>
<p>(Note: In order to move forward client approval is needed - Payment is expected on these important dates in order to share the work.)</p>
<li>1/18/2018 - Set up the clickable dummy site. Finish Wireframes. Write the proposal. Share the timeline with client. </li>
<li>1/24/2018 - Client checkin share MVP. Get feedback. Bug fixing. Start working on CSS.</li>
<li>1/29/2018 - Present Final Work.</li>


<p> Check out for more details on timeline:</p> 
https://git.generalassemb.ly/denizs/project-4/projects/1


<h1> Code Snippet: </h1>
<p>
render() {
    let event = this.props.event
    return (

    <div className="event-list">
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
          url: event.url
        })
            .then((res) => {
              console.log("api returned: ", res.data)
              this.setState({showMore: false})
            })
            .catch(err => console.log(err));
      }
    }
</p>

<h1> MVP of the live app: </h1>
    <p>  <h3> Map View </h3><br>
            <img src="../master/live_images/MainPage.png" width="400"/>
    </p>
    <p>  <h3> More Info Section </h3><br>
            <img src="../master/live_images/MoreInfo.png" width="400"/>
    </p>


<h1>Complications:</h1>
<ul>
<li>Doing a third party api call on the backend with Rails. </li>
<li>Pushing to heroku with rails.</li>
<li>Converting the rails to express.</li>
<li>Heroku push integration with backend and frontend.</li>
<li>Event api call to create marker on the map.</li>
</ul>

<h1>Future Improvements:</h1>
<ul>
<li>Having a password and username functionality. </li>
<li>Mobile App version.</li>
<li>Having a comment section under each event.</li>
<li>Filter date functionality.</li>
<li>Adding an event to your calendar directly.</li>
<li>Users should add their own events to the map for everyone else to view (this would be as a request to admin and admin will approve)</li>
</ul>

