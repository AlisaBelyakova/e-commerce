import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn, isAdmin, userId, spaceshipId }) => (
  <div>
    <nav className="header-container">
      <span>
        <Link to={'/'}>
          <img src="/images/logo_sq.jpg" className="logo" />
          <h1 className="header">Aquila Spaceships</h1>
        </Link>
      </span>

      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle btn-lg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          👽 Search
        </button>
        <div className="dropdown-menu dropdown-menu-right " aria-labelledby="dropdownMenuButton">
          <form>
            <div>

              <input
                value={spaceshipId}
                type='text'
                name='spaceshipId'
                placeholder='Spaceship name'
              />
              {console.log("SPACESHIP ID", spaceshipId)}
            </div>
          </form>
        </div>
      </div>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle btn-lg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
        </button>
        <div className="dropdown-menu dropdown-menu-right " aria-labelledby="dropdownMenuButton">
          {isLoggedIn
            ? <Link to="/home" className="dropdown-item">Account Home</Link>
            : <Link to="/login" className="dropdown-item" >Login</Link>}
          {isLoggedIn
            ? <a href="#" onClick={handleClick} className="dropdown-item" >Logout</a>
            : <Link to="/signup" className="dropdown-item">Sign Up</Link>}
          {isAdmin && <Link to={'/spaceships/new'} className="dropdown-item" >Add New Spaceship</Link>}
        </div>
      </div>

      <span className='cart-icon'>
        <Link to={`/weloveyou/${userId}`}>
          <img src='/images/cart.jpg' />
        </Link>
      </span>

      <span className="header-underline"><hr /></span>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id || 'guest',
    isAdmin: state.user.isAdmin,
    isLoggedIn: !!state.user.id,
    spaceshipId: state.spaceship.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
