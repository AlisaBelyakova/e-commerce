import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store, { fetchHistory, me } from '../store';
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export class UserHome extends Component {

  componentDidMount() {
    this.props.loadInitialData()
    const userId = this.props.userId
    console.log('USERID **', userId)
    this.props.loadHistory(userId)
  }

  render() {
    const { email } = this.props;

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <div className="cart-page">
          <br />
          <hr />
          {this.props.orders.map(orderHis => {
            return (
              <div>
                <div className="checkoutHeader">
                  <h5 key={orderHis} >Order id:  {orderHis.id}</h5>
                  {/* <br /> */}
                  <h5 >Status:  {orderHis.status}</h5>

                  <h5>Products:</h5>
                </div>
                <div className="home-container">
                  {orderHis.spaceships.map((spaceship, idx) => (
                    <span key={idx} className="user-item">
                      <Link to={`/spaceships/${spaceship.id}`}>
                        <img src={spaceship.image} />
                        <h5>{spaceship.title} </h5>
                      </Link>
                    </span>

                  )
                  )}
                </div>
                <br />
                <hr />

              </div>
            )
          })
          }
        </div>
      </div>
    )

  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    userId: state.user.id,
    orders: state.orders
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadHistory(userId) {
      dispatch(fetchHistory(userId))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
