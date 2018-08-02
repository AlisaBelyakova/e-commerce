
import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import postAddress from '../store/order.js'
import { Checkout } from './index';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from '../../constants/stripe';
import PAYMENT_SERVER_URL from '../../constants/server';

console.log('this is the payment server url', PAYMENT_SERVER_URL)

const CURRENCY = 'USD';

const fromUSDToCent = amount => amount * 100;

function CheckoutForms (props) {
    const { userId} = props;
    const states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
    const countries = ['Afghanistan' , 'Albanien','Algeriet','Angola','Antigua och Barbuda','Argentina','Australien','Azerbajdzjan','Österrike','Östtimor','Bahamas','Bahrain','Bangladesh','Barbados','Belgien','Benin','Bermuda','Bhutan','Bolivia','Bosnien och Hercegovina','Botswana','Brasilien','Brunei Darussalam','Bulgarien','Burkina Faso','Burundi','Centralafrikanska Republiken','Chile','Colombia','Costa Rica','Cypern','Danmark','Demokratiska Republiken Kongo','Dominikanska Republiken','Ecuador','Egypten','El Salvador','Elfenbenskusten','Estland','Etiopien','Färöarna','Förenade Arabemiraten','Filippinerna','Finland','Frankrike','Gabon','Georgien','Ghana','Gibraltar','Grönland','Grekland','Grenada','Guatemala','Honduras','Hong Kong','Indien','Indonesien','Irak','Iran','Irland','Island','Israel','Italien','Jamaica','Japan','Jemen','Jersey','Jordanien','Kambodja','Kanada','Kazakstan','Kenya','Kina','Kiribati','Kroatien','Kuba','Kuwait','Laos','Lettland','Libanon','Libyen','Litauen','Luxemburg','Madagaskar','Makedonien','Malawi','Malaysia','Maldiverna','Mali','Malta','Marocko','Mauritius','Mexiko','Mocambique','Monaco','Mongoliet','Myanmar','Namibia','Nederländerna','Nederländska Antillerna','Nepal','Nicaragua','Niger','Nigeria','Norge','Nya Zeeland','Oman','Pakistan','Panama','Paraguay','Peru','Polen','Portugal','Puerto Rico','Qatar','Rumänien','Rwanda','Ryssland','Saint Lucia','Saint Vincent och Grenadinerna','Samoa','San Marino','Sao Tome och Principe','Saudiarabien','Schweiz','Senegal','Serbien och Montenegro','Seychellerna','Sierra Leone','Singapore','Slovakien','Slovenien','Somalia','Spanien','Sri Lanka','Sudan','Surinam','Sverige','Swaziland','Sydafrika','Sydkorea','Syrien','Taiwan','Tanzania','Thailand','Tjeckien','Trinidad och Tobago','Tunisien','Turkiet','Tyskland','Uganda','Ukraina','Ungern','Uruguay','USA','Uzbekistan','Venezuela','Vietnam','Vitryssland','Zambia','Zimbabwe'];


    function handleSubmit (e, userId)  {
        e.preventDefault()
        const addressData = {
            userId,
            shipping : {
                address : e.target.saddress.value,
                city : e.target.scity.value,
                state : e.target.sstate.value,
                zip : e.target.szip.value,
                country : e.target.scountry.value
            },
            billing : {
                address : e.target.baddress.value,
                city : e.target.bcity.value,
                state : e.target.bstate.value,
                zip : e.target.bzip.value,
                country : e.target.bcountry.value
            }
        }
        postAddress(addressData)
    }

    const successPayment = data => {
        alert('Payment Successful');
    };

    const errorPayment = data => {
        alert('Payment Error');
    };

    const onToken = (amount) => token => axios.post(PAYMENT_SERVER_URL,
        {
            // description,
            source: token.id,
            currency: CURRENCY,
            amount: fromUSDToCent(amount)
        })
        .then(successPayment)
        .catch(errorPayment);

    let subtotalItems = 0;
    let subtotalPrice = 0;
    let inventoryOb = {}
    let itemsInCart = 0;

    if (props.cart.length && props.cart[0].spaceships) {
        props.cart[0].spaceships.map((spaceship) => {
            var arrOfNum = [];
            for (var i = 1; i <= spaceship.inventory; i++) {


                arrOfNum.push(i)
            }
            inventoryOb[spaceship.id] = arrOfNum;
            subtotalItems += spaceship.lineItems.quantity;
            subtotalPrice += Number(spaceship.price);
        })
    }

    return (
        <div className="address-form">
        <form onSubmit={ event  => handleSubmit(event, userId)}>

        <h3> Billing address </h3>
            <div>
                <label htmlFor="baddress"><small>Address</small></label>
                <input name="baddress" type="text" placeholder="Address" />
            </div>
            <div>
                <label htmlFor="bcity"><small>City</small></label>
                <input name="bcity" type="text" placeholder="City"/>
            </div>
            <div>
                <label htmlFor="bstate"><small>State/Zip</small></label>
                <select name="bstate">
                    {states.map( (state, ind) => <option key={ind}> {state} </option>  )}
                </select>
                <input name="bzip" type="text" placeholder="Zipcode"/>
            </div>
            <div>
                <label htmlFor="scountry"><small>Country</small></label>
                <select name="bcountry">
                    <option>  United States </option>
                    {countries.map( (country, ind) => <option key={ind}> {country} </option>  )}
                </select>
            </div>


            <h3> Shipping address </h3>
            <div>
                <label htmlFor="saddress"><small>Address</small></label>
                <input name="saddress" type="text" placeholder="Address" />
            </div>
            <div>
                <label htmlFor="scity"><small>City</small></label>
                <input name="scity" type="text" placeholder="City"/>
            </div>
            <div>
                <label htmlFor="sstate"><small>State/Zip</small></label>
                <select name="sstate">
                    {states.map( (state, ind) => <option key={ind}> {state} </option>  )}
                </select>
                <input name="szip" type="text" placeholder="Zipcode"/>
            </div>
            <div>
                <label htmlFor="scountry"><small>Country</small></label>
                <select name="scountry">
                    <option>  United States </option>
                    {countries.map( (country, ind) => <option key={ind}> {country} </option>  )}
                </select>
            </div>


            <div>
                <button type="submit" > ✅ Checkout </button>
                <StripeCheckout
                    amount={subtotalPrice}
                    token={onToken(subtotalPrice)}
                    currency={CURRENCY}
                    stripeKey={STRIPE_PUBLISHABLE}
                />
            </div>

        </form>

      </div>
        
    )
}

const mapState = (state) => {
    return {
        userId: state.user.id || 'guest',
        cart: state.cart
    }
  }

export default connect(mapState)(CheckoutForms)

