import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/order'

export class Order extends React.Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.fetchSingleOrder(orderId)
  }

  render() {
    let order = this.props
    console.log('is this printing in render?', order)
    return (
      <div>
        <div>
          <div>{order.isFulfilled ? <h1>Order</h1> : <h1>Your Cart</h1>}</div>
          <div>
            {order.orderInventory.map(currentInventory => {
              return (
                <div key={currentInventory.id}>
                  <div>
                    <img src={currentInventory.imageUrl} />
                    <h2>{currentInventory.name}</h2>
                    <h3>$ {currentInventory.price}</h3>
                    <p>Quantity:{currentInventory.quantity}</p>
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

export default connect(mapState, mapDispatch)(Order)
