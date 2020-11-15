import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/order'
import user from '../store/user'
import SingleInventory from './singleInventory'

export class Order extends React.Component {
  componentDidMount() {
    this.props.fetchSingleOrder()
  }

  render() {
    let order = this.props.order
    return (
      <div>
        <div>
          <div>{order.isFulfilled ? <h1>Order</h1> : <h1>Your Cart</h1>}</div>
          <div>
            {order.inventories.map(currentInventory => {
              return (
                <div key={currentInventory.id}>
                  <div>
                    <img src={currentInventory.imageUrl} />
                    <h2>{currentInventory.name}</h2>
                    <h3>$ {currentInventory.price}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleOrder: orderId => {
      dispatch(fetchSingleOrder(orderId))
    }
  }
}

export default connect(null, null)(Order)
