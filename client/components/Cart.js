import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';


import { connect } from 'react-redux';
import { myCart, removeCart, removeItem, postToCart } from '../store';
import { Checkout } from './index';



export class Cart extends Component {

    constructor() {
        super();
        this.handleCartDelete = this.handleCartDelete.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }

    componentDidMount() {
        this.props.loadTheCart(this.props.userId)
    }

    handleCartDelete() {
        this.props.removeCart(this.props.userId);
        this.props.loadTheCart(this.props.userId);
    }

    handleItemDelete(event) {
        let userId = this.props.userId;
        let orderId = event.target.name.split('-')[0]
        let spaceshipId = event.target.name.split('-')[1]

        this.props.removeItem(userId, orderId, spaceshipId);
        this.props.loadTheCart(this.props.userId);
    }


    render() {
        const { name, photo, cart, email, isLoggedIn } = this.props;
        console.log("this.props!!! ", cart)
        let subtotalItems = 0;
        let subtotalPrice = 0;
        //create dropdown for quantities
        let inventoryOb = {}
        let itemsInCart = 0;
        if (cart.length && cart[0].spaceships) {
            cart[0].spaceships.map((spaceship) => {
                var arrOfNum = [];
                for (var i = 1; i <= spaceship.inventory; i++) {


                    arrOfNum.push(i)
                }
                inventoryOb[spaceship.id] = arrOfNum;
                subtotalItems += spaceship.lineItems.quantity;
                subtotalPrice += spaceship.priceInMills;
            })
        }
        console.log("subtotalItems", subtotalItems)
        return (
            <div>
                <div className="cart-header" >
                    <span >
                        <img src="https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/57.png" className="avatar" />
                        {name ? <span> Welcome, {name}  </span> : <span> Welcome!  </span>}
                    </span>
                    <span className="buttons-rows">
                        {!isLoggedIn ? <Link to="/signup" > <button className="remove-cart-btn-guest" > ✅ SIGN UP & SAVE CART </button> <br /></Link> : null}
                        <button className="remove-cart-btn-guest" onClick={this.handleCartDelete} >🔆 CLEAN CART</button> <br />


                        <Link to="/home">
                            <button className="remove-cart-btn-guest"> 📋 ORDER HISTORY</button> <br />
                        </Link>



                    </span>
                </div>
                <div className="cart-page">
                    <br />
                    <hr />
                    {cart.length && cart[0].spaceships
                        ? (cart[0].spaceships.map((spaceship) => (
                            <span key={spaceship.id} className="cart-container" >
                                <Link to={`/spaceships/${spaceship.id}`}>
                                    <span className="home-item cart-item">
                                        <img src={spaceship.image} />
                                    </span>
                                </Link>
                                <span className="home-item cart-item">
                                    <NavLink to={`/spaceships/${spaceship.id}`}>
                                        <h1>{spaceship.title}</h1>
                                    </NavLink>
                                    <h5 className="white" className="item-details">Capacity {spaceship.capacity}</h5>
                                    <h5 className="white" >Price per item {spaceship.priceInMills}</h5>
                                    <form onSubmit={this.props.handleChangeQuantity}>
                                        <div>
                                            <select name="quantitySelection" value={this.props.value} onChange={(event) => { this.props.handleChangeQuantity(event, spaceship.lineItems.id) }} > {
                                                inventoryOb[spaceship.id]
                                                    ? inventoryOb[spaceship.id].map(quantity => {
                                                        if (quantity === spaceship.lineItems.quantity) {
                                                            return (
                                                                //this ensures that the dropdown menu automatically displays the number of items that the user has in their cart. Ignore the react warning in the browser console.
                                                                <option key={quantity} value={quantity} selected="selected">{quantity}</option>
                                                            )
                                                        } else {
                                                            return (

                                                                <option key={quantity} value={quantity}>{quantity}</option>

                                                            )
                                                        }
                                                    })
                                                    : <option value="0"> Out Of Stock </option>
                                            }
                                            </select>
                                        </div>
                                    </form>
                                    <button className="remove-btn" name={cart[0].id + '-' + spaceship.id} onClick={this.handleItemDelete}>❌ REMOVE ITEM</button>
                                </span>
                                <span></span>

                                <span className="item-devider" ><hr /></span>
                            </span>
                        )))

                        : <h3>Your cart is empty</h3>
                    }
                </div>
                <span className="item-devider" ><hr /></span>

                <span >Subtotal: ${subtotalPrice} for ({subtotalItems}) items</span>
                <button className="button"><Link to="/checkout">Checkout</Link></button>
                <span></span>
                <span className="item-devider" ><hr /></span>
            </div>


        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
    console.log('this is the cart', state.cart)
    return {
        isLoggedIn: !!state.user.id,
        photo: state.user.photo,
        name: state.user.name,
        userId: ownProps.match.params.userId,
        email: state.user.email,
        cart: state.cart,
    }
}


const mapDispatch = (dispatch) => {
    return {
        loadTheCart(id) {
            dispatch(myCart(id))
        },
        removeCart(id) {
            dispatch(removeCart(id))
        },
        removeItem(userId, orderId, spaceshipId) {
            dispatch(removeItem(userId, orderId, spaceshipId))
        },
        handleChangeQuantity(event) {
            console.log('got into handleChangeQuantity, event is: ', event.target.value)
            const newQuantity = event.target.value
            // dispatch(updateQuantity(lineItemId, newQuantity))
        }
    }
}



export default connect(mapState, mapDispatch)(Cart)

/**
 * PROP TYPES
// //  */
// UserHome.propTypes = {
//     email: PropTypes.string
// }
