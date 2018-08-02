import React, { Component } from 'react';
import store, { updateSpaceshipInfo } from '../store';
import { Link, Redirect } from 'react-router-dom'
import { fetchSingleSpaceship } from '../store/spaceship';


export default class UpdateSpaceship extends Component {
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

    componentDidMount() {
        let id = this.props.match.params.id;

        this.unsubscribe = store.subscribe(() => {
            this.setState({
                title: store.getState().spaceship.title || '',
                description: store.getState().spaceship.description || '',
                price: store.getState().spaceship.price || '',
                inventory: store.getState().spaceship.inventory || '',
                vesselType: store.getState().spaceship.vesselType || '',
                capacity: store.getState().spaceship.capacity || '',
                image: store.getState().spaceship.image || ''
            })
        })
        store.dispatch(fetchSingleSpaceship(id));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleSubmit(event) {
        event.preventDefault();
        const spaceship = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            inventory: this.state.inventory,
            vesselType: this.state.vesselType,
            capacity: this.state.capacity,
            image: this.state.image
        };

        const id = this.props.match.params.id
        store.dispatch(updateSpaceshipInfo(id, spaceship))
            .then((dispatch) => {
                this.props.history.push(`/spaceships/${id}`);
            })
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
                        <label>Price:
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
                        <label>Capacity:
                        <input
                                type='integer'
                                onChange={this.handleChange}
                                name='capacity'
                                value={this.state.capacity}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Image:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='image'
                                value={this.state.image}
                            />
                        </label>
                    </div>

                    <button type="submit" className='button' disabled={functional}>UPDATE</button>
                    {
                        warning && <div className='alert alert-warning'>{warning}</div>
                    } 
                </form>
            </div>
        )
    }
}
                                    