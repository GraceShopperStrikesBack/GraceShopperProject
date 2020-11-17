import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCart} from '../store/currentCart'
import {SingleInventory} from './singleInventory'

export class Cart extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.fetchSingleCart(userId)
  }

  render() {
    console.log(this.props.currentCart)
    let currentCart = this.props.currentCart[0]
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
