import React, { Component } from 'react';
import {connect} from 'react-redux';


function AddressForm  (props)  {
    const { addressType , handleSubmit} = props;
    const states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
    const countries = ['Afghanistan' , 'Albanien','Algeriet','Angola','Antigua och Barbuda','Argentina','Australien','Azerbajdzjan','Österrike','Östtimor','Bahamas','Bahrain','Bangladesh','Barbados','Belgien','Benin','Bermuda','Bhutan','Bolivia','Bosnien och Hercegovina','Botswana','Brasilien','Brunei Darussalam','Bulgarien','Burkina Faso','Burundi','Centralafrikanska Republiken','Chile','Colombia','Costa Rica','Cypern','Danmark','Demokratiska Republiken Kongo','Dominikanska Republiken','Ecuador','Egypten','El Salvador','Elfenbenskusten','Estland','Etiopien','Färöarna','Förenade Arabemiraten','Filippinerna','Finland','Frankrike','Gabon','Georgien','Ghana','Gibraltar','Grönland','Grekland','Grenada','Guatemala','Honduras','Hong Kong','Indien','Indonesien','Irak','Iran','Irland','Island','Israel','Italien','Jamaica','Japan','Jemen','Jersey','Jordanien','Kambodja','Kanada','Kazakstan','Kenya','Kina','Kiribati','Kroatien','Kuba','Kuwait','Laos','Lettland','Libanon','Libyen','Litauen','Luxemburg','Madagaskar','Makedonien','Malawi','Malaysia','Maldiverna','Mali','Malta','Marocko','Mauritius','Mexiko','Mocambique','Monaco','Mongoliet','Myanmar','Namibia','Nederländerna','Nederländska Antillerna','Nepal','Nicaragua','Niger','Nigeria','Norge','Nya Zeeland','Oman','Pakistan','Panama','Paraguay','Peru','Polen','Portugal','Puerto Rico','Qatar','Rumänien','Rwanda','Ryssland','Saint Lucia','Saint Vincent och Grenadinerna','Samoa','San Marino','Sao Tome och Principe','Saudiarabien','Schweiz','Senegal','Serbien och Montenegro','Seychellerna','Sierra Leone','Singapore','Slovakien','Slovenien','Somalia','Spanien','Sri Lanka','Sudan','Surinam','Sverige','Swaziland','Sydafrika','Sydkorea','Syrien','Taiwan','Tanzania','Thailand','Tjeckien','Trinidad och Tobago','Tunisien','Turkiet','Tyskland','Uganda','Ukraina','Ungern','Uruguay','USA','Uzbekistan','Venezuela','Vietnam','Vitryssland','Zambia','Zimbabwe'];

    return (
        <div className="address-form">
        <h3> {addressType} address </h3>
        <form onSubmit={()=>{}} name={addressType}>
            <div>
                <label htmlFor="address"><small>Address</small></label>
                <input name="address" type="text" placeholder="Address" />
            </div>
            <div>
                <label htmlFor="city"><small>City</small></label>
                <input name="city" type="text" placeholder="City"/>
            </div>
            <div>
                <label htmlFor="state"><small>State/Zip</small></label>
                <select>
                    {states.map( (state, ind) => <option key={ind}> {state} </option>  )}
                </select>
                <input name="zip" type="text" placeholder="Zipcode"/>
            </div>
            <div>
                <label htmlFor="state"><small>Country</small></label>
                <select>
                    <option>  United States </option>
                    {countries.map( (country, ind) => <option key={ind}> {country} </option>  )}
                </select>
            </div>
            <div>
                <button type="submit" onSubmit={handleSubmit}> ✅ Checkout </button>
            </div>

        </form>
      </div>
        
    )
}


const mapShipping = (state) => {
    return {
        addressType: 'Shipping',
        error: state.user.error
    }
  }
  
  const mapBilling = (state) => {
    return {
        addressType: 'Billing',
        error: state.user.error
    }
  }
  
  const mapDispatch = (dispatch) => {
    return {
      handleSubmit (e) {
        e.preventDefault()
        const addressType = e.target.name;
        const address = e.target.address.value;
        const city = e.target.city.value;
        const state = e.target.state.value;
        const zipcode = e.target.zipcode.value;
        const country = e.target.country.value;
      }
    }
  }
  



export const ShippingAddress = connect(mapShipping, mapDispatch)(AddressForm)
export const BillingAddress = connect(mapBilling, mapDispatch)(AddressForm)
