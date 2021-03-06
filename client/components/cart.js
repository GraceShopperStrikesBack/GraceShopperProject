import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCart, removeSingleItem} from '../store/currentCart'
import Checkout from './Checkout'
import {SingleInventory} from './SingleInventory'
import {Link} from 'react-router-dom'
import {deleteSingleInventory} from '../store/singleInventory'

export class Cart extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.fetchSingleCart(userId)
  }

  handleSubmit(userId, itemId, orderId) {
    this.props.removeSingleItem(userId, itemId, orderId)
  }

  render() {
    let currentCart = this.props.currentCart[0]
    let userId = this.props.match.params.userId
    return (
      <div>
        {this.props.currentCart.length ? (
          <div>
            <h1>Your Cart</h1>
            <div className="inventoryBox">
              {currentCart.inventories.map(currentInventory => {
                return (
                  <div key={currentInventory.id} className="singlePageItem">
                    <div>
                      <img src={currentInventory.imageUrl} />
                      <h2>{currentInventory.name}</h2>
                      <h3>$ {currentInventory.order_inventory.price}</h3>
                      <p className="quantity">
                        Quantity:{currentInventory.order_inventory.quantity}
                      </p>
                      <button
                        type="submit"
                        onClick={() =>
                          this.handleSubmit(
                            userId,
                            currentInventory.id,
                            currentCart.id
                          )
                        }
                      >
                        Remove From Cart
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link to={`/users/${userId}/checkout`}>
              <button type="submit">Proceed To Checkout</button>
            </Link>
          </div>
        ) : (
          <div className="quantity">Empty Cart: Waiting to be filled!</div>
        )}
      </div>
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
    removeSingleItem: (userId, itemId, orderId) => {
      dispatch(removeSingleItem(userId, itemId, orderId))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
