import React, { Component } from 'react';
import store, { updateSpaceshipInfo } from '../store';
import { Link, Redirect } from 'react-router-dom'
import { addSpaceship } from '../store/spaceships';
import axios from 'axios';


export default class AddSpaceship extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            price: '',
            inventory: '',
            vesselType: '',
            capacity: '',
            image: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const spaceship = {
            title: this.state.title,
            description: this.state.description,
            price: Number(this.state.price),
            inventory: Number(this.state.inventory),
            vesselType: this.state.vesselType,
            capacity: Number(this.state.capacity),
            image: this.state.image
        };

        axios.post('/api/products/new-product', spaceship)
            .then(res => {
                let formattedRes = res.data;
                store.dispatch(addSpaceship(formattedRes))
            })
            .then(() => { 
                this.props.history.push('/spaceships')
            })
            .catch(err => console.error(err))
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        function isUrl(s) {
           var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
           return regexp.test(s);
        }
        let warning;
        if (!this.state.title) {
            warning = 'Please enter a name using letters!'
        } else if (!this.state.price ) {
            warning = 'Please enter a price, you RASCAL!'
        } else if ( isNaN ( Number(this.state.price) ) ) {
            warning = 'The price has to be a number, silly'
        } else if (!this.state.capacity) {
            warning = 'For realzies? Enter the capacity using numbers, PPPLEASEEEE!'
        } else if ( isNaN ( Number(this.state.capacity) ) ) {
            warning = 'The capacity has to be a number, silly'
        } else if (!this.state.image) {
            warning = 'Please add an image URL'
        } else if (!isUrl(this.state.image)) {
            warning = 'Please enter a real URL'
        }
        //disable the button if admin does not behave
        let functional = false;
        if (
            !this.state.title || 
            !this.state.price || 
            isNaN ( Number(this.state.price) ) || 
            !this.state.capacity || 
            isNaN ( Number(this.state.capacity) ) ||
            !this.state.image ||
            !isUrl(this.state.image) ) {
            functional = true;
        }


        return (
            <div>
                <form onSubmit={this.handleSubmit} className='form'>
                    <div>
                        <label>Title:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='title'
                                value={this.state.title}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Description:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='description'
                                value={this.state.description}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Price in millions (an entry of 2 will be understood as 2,000,000):
                        <input
                                type='decimal'
                                onChange={this.handleChange}
                                name='price'
                                value={this.state.price}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Inventory:
                        <input
                                type='integer'
                                onChange={this.handleChange}
                                name='inventory'
                                value={this.state.inventory}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Vessel Type:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='vesselType'
                                value={this.state.vesselType}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Capacity (maximum number of people):
                        <input
                                type='integer'
                                onChange={this.handleChange}
                                name='capacity'
                                value={this.state.capacity}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Image URL:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='image'
                                value={this.state.image}
                            />
                        </label>
                    </div>

                    <button type="submit" className='button' disabled={functional}>ADD NEW SPACESHIP</button>
                    {
                        warning && <div className='alert alert-warning'>{warning}</div>
                    }
                </form>
            </div>
        )
    }
}