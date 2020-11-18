import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCart, checkoutCartThunk} from '../store/currentCart'

export class Checkout extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.fetchSingleCart(userId)
  }

  //call thunk that changes isFulfilled to yes.
  handleSubmit(userId, orderId, cart) {
    this.props.checkoutCartThunk(userId, orderId, cart)
  }

  render() {
    console.log('THIS.PROPS IS >>>>>>>>>>>>>>', this.props)
    let currentCart = this.props.currentCart[0]
    let orderId
    if (currentCart) {
      orderId = currentCart.id
      console.log(
        'CURRENTCART.LENGTH IS >>>>>>>>>>>>>>>>>>>>>',
        currentCart.length
      )
    }
    let userId = this.props.match.params.userId
    console.log('USER ID IS >>>>>>>>>>>>>>>>>>>>>', userId)
    return currentCart ? (
      <div>
        <div>
          <h2>Please Enter Your Information Below To Complete Your Purchase</h2>
        </div>
        {currentCart.inventories.map(singleItem => {
          return (
            <div key={singleItem.id}>
              <img src={singleItem.imageUrl} />
              {singleItem.name}
            </div>
          )
        })}
        {/* <form onSubmit={this.handleSubmit}>
          <div>
            Name:<br />
            <input
              type="text"
              name="name"
              // value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            Address:<br />
            <input
              type="text"
              name="imageUrl"
              // value={this.state.imageUrl}
              onChange={this.handleChange}
            />
          </div>
          <div>
            City:<br />
            <input
              type="text"
              name="description"
              // value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            State:<br />
            <input
              type="text"
              name="price"
              // value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
        </form> */}
        <button
          type="submit"
          onClick={() => this.handleSubmit(userId, orderId, currentCart)}
        >
          Purchase
        </button>
      </div>
    ) : (
      <div className="quantity">EMPTY CART</div>
    )
  }
}

const mapState = state => {
  return {
    currentCart: state.currentCart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleCart: userId => {
      dispatch(fetchSingleCart(userId))
    },
    checkoutCartThunk: (userId, orderId, cart) => {
      dispatch(checkoutCartThunk(userId, orderId, cart))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
