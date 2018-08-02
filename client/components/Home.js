import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { myCart, me } from '../store'
import { connect } from 'react-redux'


export class Home extends Component {

    componentDidUpdate() {

        const userId = this.props.userId ? this.props.userId : "guest"
        console.log("PROPS ID", userId)
        this.props.loadTheCart(userId)

    }
    componentDidMount() {
        const userId = this.props.userId ? this.props.userId : "guest"
        console.log("PROPS ID", userId)
        this.props.loadTheCart(userId)

    }

    render() {

        let categories = [
            ['explorer', 'https://room.eu.com/images/contents/issue8-from-the-dawn-of-humankind-the-need-to-explore-has-driven-expansion-across-our-planet.jpg'],
            ['conference', 'http://smartplaces.eu/wordpress/wp-content/uploads/2017/11/FG_7275.jpg'],
            ['romance', 'https://i.pinimg.com/originals/e2/72/92/e272928bc0a5d1f81dc5b542f7e8cb29.jpg'],
            ['military', 'https://i0.wp.com/thedivinefrequency.com/wp-content/uploads/2017/08/space-corps-military-space.jpg?fit=816%2C459&ssl=1']
        ];

        return (
            <div className="home">
                <span className="title">
                    <h2>So The Adventure Begins...</h2>
                </span>

                <span className="sub-title">
                    <h3>Please explore the options and login to buy</h3>
                </span>
                <div className="see-all-product-btn">
                    <Link to={`/spaceships`}>
                        <button className="see-all-btn">See All Spaceships</button>
                    </Link>
                </div>
                <br />
                <div className="home-container">
                    {categories.map((category, ind) => (
                        <span key={ind} className="home-item">
                            <Link to={`/spaceships/category/${category[0]}`}>
                                <h3>{category[0].toUpperCase()}</h3>
                                <img src={category[1]} />
                            </Link>
                        </span>
                    ))}
                </div>
            </div>
        )
    }
}


const mapState = (state, ownProps) => {
    return {
        userId: state.user.id
    }
}
const mapDispatch = (dispatch) => {
    return {
        loadTheCart(id) {
            dispatch(myCart(id))
        }
    }
}

export default connect(mapState, mapDispatch)(Home)