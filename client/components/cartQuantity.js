import React from 'react'
import {connect} from 'react-redux'

export class CartQuantity extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.getTotalItemQuantity = this.getTotalItemQuantity.bind(this)
  }

  componentDidMount() {
    const cartQuantity = this.getTotalItemQuantity(
      this.props.currentCart.inventories
    )
    this.setState({
      quantity: cartQuantity
    })
  }

  getTotalItemQuantity(inventoryArray) {
    let totalQuantity = 0
    if (inventoryArray) {
      for (let i = 0; i < inventoryArray.length; i++) {
        let currentInventory = inventoryArray[i]
        totalQuantity += currentInventory.order_inventory.quantity
      }
    }
    return totalQuantity
  }

  render() {
    return <div>{this.state.quantity}</div>
  }
}

const mapState = state => {
  return {
    currentCart: state.currentCart
  }
}

// const mapDispatch = dispatch => {
//     return {
//       fetchSingleOrder: orderId => {
//         dispatch(fetchSingleOrder(orderId))
//       }
//     }
// }

export default connect(mapState, null)(CartQuantity)
