import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';



function ProductsList(props) {

  const { spaceships } = props;
  let proxyVar = [];

  if (props.match.params.vesselType) {
    proxyVar = spaceships.filter(spaceship => spaceship.vesselType === props.match.params.vesselType)
  }
  else {
    proxyVar = spaceships
  }

  return (
    <div className="all-container">

      {proxyVar.map((spaceship, idx) => {
        return (
          <span key={idx} className="all-item">
            <NavLink to={`/spaceships/${spaceship.id}`}>
              <img src={spaceship.image} />
              <div>
                <span className="ship-name"> {spaceship.title}</span>
              </div>
            </NavLink>
          </span>
        );
      })

      }

    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    spaceships: state.spaceships
  };
};



export default withRouter(connect(mapStateToProps)(ProductsList));

