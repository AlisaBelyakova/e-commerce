import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { postToCart, myCart } from '../store';
import { fetchSingleSpaceship } from '../store/spaceship.js';
import { fetchReviews } from '../store/review.js'
import axios from 'axios'

export class ProductPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: 0
		}
	}

	componentDidMount() {
		const spaceshipId = this.props.match.params.spaceshipId;
		const productPageThunk = fetchSingleSpaceship(spaceshipId);
		const reviewsThunk = fetchReviews(spaceshipId);
		store.dispatch(productPageThunk);
		store.dispatch(reviewsThunk);

		const userId = this.props.userId ? this.props.userId : "guest"
		console.log("PROPS ID", userId)
		this.props.loadTheCart(userId)
	}



	render() {
		const spaceshipId = this.props.match.params.spaceshipId;
		let inventoryArr = [];
		for (let i = 1; i <= this.props.spaceship.inventory; i++) {
			inventoryArr.push(i);
		}
		console.log("ORDER ID ", this.props.orderId)

		const startTotal = 5;

		return (
			<div className="single">
				<span>
					<h3>{this.props.spaceship.title}</h3>
					<img src={this.props.spaceship.image} />
				</span>
				<div >
					<h3>Average Rating: {

						this.props.reviews ?
							Math.round(this.props.reviews.map((reviewObj) => {
								return reviewObj.rating;
							}).reduce((a, b) => a + b, 0) / this.props.reviews.length)
							: null

					}</h3>

					<div class="stars-outer">
						<div class="stars-inner"></div> </div>
				</div>
				<span className="single-details">
					<div>${this.props.spaceship.priceInMills}</div>
					<div>{this.props.spaceship.description}</div>
					<span>Max. capacity: {this.props.spaceship.capacity} people</span>
					<div>
						<h2>Reviews</h2>
						{

							this.props.reviews ?
								this.props.reviews.map((review) => {
									return (
										<div key={this.props.reviews.map(function (review2) { return review2.body; }).indexOf(review.body)}>
											<div>Rating: {review.rating}</div>
											{/* Tania */}
											<div class="stars-outer">
												<div class="stars-inner"></div> </div>





											<div>{review.snippet}</div>
										</div>
									)
								}) : null
						}
					</div>

					<form onSubmit={this.props.handleAddProduct}>
						<div>
							<select name="quantitySelection"> {inventoryArr.length ? inventoryArr.map(quantity => {
								return (
									<option key={quantity} value={quantity}>{quantity}</option>
								)
							})
								: <option value="0"> Out Of Stock </option>
							}
							</select>

							<button className="button" type="submit" value={[this.props.user.id, this.props.orderId]} name="btn"> Add To Cart </button>


						</div>
					</form>
					{
						this.props.isAdmin ?
							<div className="button">
								<Link to={`/spaceships/edit/${spaceshipId}`}>Edit Product</Link>
							</div>
							: null
					}

				</span>
			</div>
		)

	}

}

const mapStateToProps = (state) => {
	return {
		spaceship: state.spaceship,
		user: state.user,
		isAdmin: state.user.isAdmin,
		reviews: state.reviews,
		orderId: state.cart[0] ? state.cart[0].id : '',
		userId: state.user.id,


	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {

		handleAddProduct: (event) => {
			event.preventDefault();
			let userIdOrderId = event.target.btn.value.split(',')
			const userId = Number(userIdOrderId[0]);
			console.log('our userid at last!!!! ', userId)
			const orderId = Number(userIdOrderId[1]);
			console.log('our order id at last!!!! ', orderId)
			console.log("OWN props for spaceship", ownProps.match.params.spaceshipId)
			const spaceshipId = ownProps.match.params.spaceshipId;
			const quantity = event.target.quantitySelection.value;

			dispatch(postToCart(userId, spaceshipId, orderId, quantity))


		},
		loadTheCart(userId) {
			dispatch(myCart(userId))
		}


	}
}

const ProductPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductPage))
export default ProductPageContainer
