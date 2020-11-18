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
    let userId = this.props.match.params.userId
    return (
      <div>
        {this.props.currentCart.length ? (
          <div>
            <h1>Your Cart</h1>
            <div>
              {currentCart.inventories.map(currentInventory => {
                return (
                  <div key={currentInventory.id}>
                    <div>
                      <img src={currentInventory.imageUrl} />
                      <h2>{currentInventory.name}</h2>
                      <h3>$ {currentInventory.order_inventory.price}</h3>
                      <p>
                        Quantity:{currentInventory.order_inventory.quantity}
                      </p>
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
