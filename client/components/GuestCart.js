import React, { Component } from 'react';
const toonAvatar = require('cartoon-avatar'); 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { myCart, guestCartDelete , guestItemDelete } from '../store'

export class GuestCart extends Component {

    constructor () {
        super() ;
        this.handleGuestCartDelete = this.handleGuestCartDelete.bind(this);
        this.handleGuestItemDelete = this.handleGuestItemDelete.bind(this);
    }
  
    handleGuestCartDelete () {
        this.props.guestCartDelete()
    }

    handleGuestItemDelete (event) {
        this.props.guestItemDelete(Number(event.target.name))
    }

    render() {
        const { spaceships, guestCart } = this.props;
        let productsToDisplay = [];
        let inventoryOb = {};
        if (guestCart.length ) {
            productsToDisplay = spaceships.filter(item => guestCart.includes(item.id));
            //create dropdown for quantities: 
            productsToDisplay.map((spaceship) => {
                let arrOfNum = []; 
                for (let i = 1; i <= spaceship.inventory; i++) {
                    arrOfNum.push(i)
                }
                inventoryOb[spaceship.id] = arrOfNum;
            })
        }


        return (
        <div>
            <div className="cart-header" >
                <span >
                    <img src="https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/57.png" className="avatar"/>
                    <span> Welcome, Guest  </span>
                </span>
                <span className="buttons-rows">
                    <Link to="/signup" > <button className="remove-cart-btn-guest" > ✅ SINGUP & SAVE CART </button> </Link> <br/>
                    <button className="remove-cart-btn-guest" onClick={this.handleGuestCartDelete} >🔆 CLEAN CART</button> <br/>
                </span>
            </div>
            <div className="cart-page">
            <br/>
            <hr/>
            { productsToDisplay.length 
                ? (productsToDisplay.map((spaceship) => (
                    <span key={spaceship.id} className="cart-container" >
                        <span  className="home-item cart-item">
                            <img src={spaceship.image} />
                        </span>
                        <span  className="home-item cart-item">
                            <h1>{spaceship.title}</h1>
                            <h5 className="white" className="item-details">Capacity {spaceship.capacity}</h5>
                            <h5 className="white" >Price per item {spaceship.priceInMills}</h5>

                            <select name="quantitySelection"> {
                                inventoryOb[spaceship.id]
                                ? inventoryOb[spaceship.id].map(quantity => {
                                return (
                                    <option key={quantity} value={quantity}>{quantity}</option>
                                )
                            })
                                : <option value="0"> Out Of Stock </option>
                            }
                            </select>

                            <button className="remove-btn" name={spaceship.id} onClick={this.handleGuestItemDelete}>❌ REMOVE ITEM</button>
                            </span> 
                            <span></span>
                            <span className="item-devider" ><hr  /></span>
                            </span>
                        )))
                        
                        : <h3>Your cart is empty</h3>
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
        guestCart: state.guestCart,
        spaceships: state.spaceships
    }
}

const mapDispatch = (dispatch) => {
    return {
        guestCartDelete () {
            dispatch(guestCartDelete())
        },
        guestItemDelete (itemId) {
            dispatch(guestItemDelete(itemId))
        }
    }
}



export default connect(mapState, mapDispatch)(GuestCart)
