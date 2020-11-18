import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCart} from '../store/currentCart'
import Checkout from './Checkout'
import {SingleInventory} from './SingleInventory'
import {Link} from 'react-router-dom'

export class Cart extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.fetchSingleCart(userId)
  }

  render() {
    let currentCart = this.props.currentCart[0]
    return (
      <div>
        {this.props.currentCart.length ? (
          <div>
            <h1>Your Cart</h1>
            <Link to="/checkout">
              <button type="submit">Proceed To Checkout</button>
            </Link>
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
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div>Loading</div>
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
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
