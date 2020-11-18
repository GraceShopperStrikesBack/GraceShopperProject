import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/order'

export class Order extends React.Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.fetchSingleOrder(orderId)
  }

  render() {
    let order = this.props.order
    return (
      <div>
        {order.id ? (
          <div>
            <h1>Order</h1>
            <div className="inventoryBox">
              {order.inventories.map(currentInventory => {
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
