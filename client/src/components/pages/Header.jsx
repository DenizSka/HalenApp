import React from 'react';
import "./css/Header.css";



const Header = (props) => (

  <div id="header-wrapper">


      <div id="header">
        <div className="container">


            <div id="logo">
              <img src="http://payload.cargocollective.com/1/0/18527/520712/NYC%20backdrop_49.jpg"/>
              <h1><a href="#">Halen</a></h1>
            </div>

        </div>
      </div>

      <div id="banner">
        <div className="container">
          <section>
            <span className="fa fa-cubes"></span>
            <header>
              <h2>Last minute event planner</h2>
              <span className="byline">See today's events around you.</span>
            </header>
          </section>
        </div>
      </div>

  </div>
);

export default Header;
