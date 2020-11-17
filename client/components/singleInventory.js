import React from 'react'
import {fetchSingleInventory} from '../store/singleInventory'
import {connect} from 'react-redux'
import {updateSingleOrder} from '../store/order'
import UpdateSingleInventory from './updateSingleInventory'
import {fetchSingleCart} from '../store/currentCart'

export class SingleInventory extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    try {
      const inventoryId = await this.props.match.params.inventoryId
      const userId = await this.props.user.id
      console.log('PROPS', this.props)
      await this.props.getSingleInventory(inventoryId)
      await this.props.fetchSingleCart(userId)
    } catch (error) {
      console.error('single inventory mount error', error)
    }
  }

  handleSubmit(orderId, orderObject) {
    this.props.updateSingleOrder(orderId, orderObject)
  }

  render() {
    console.log(this.props.user)
    const inventory = this.props.singleInventory
    return (
      <div>
        {this.props.user ? (
          <div className="inventoryBox">
            <h1>{inventory.name}</h1>
            <div className="singlePageItem">
              <img src={inventory.imageUrl} />
            </div>
            <div className="singlePageItem">
              <h3>About:</h3>
              <p>{inventory.description}</p>
              <h4>Price: $ {inventory.price}</h4>
              <button
                type="submit"
                onClick={() => {
                  this.handleSubmit(orderId, inventory)
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ) : (
          <h1>Page Loading</h1>
        )}
        {this.props.user.isAdmin === true ? (
          <div>
            <UpdateSingleInventory inventory={inventory} />
          </div>
        ) : (
          <div />
        )}
        <footer>Grace Pro Shopper © 2020</footer>
      </div>
    )
  }
}

const mapState = state => {
  console.log('STATE', state)
  return {
    singleInventory: state.singleInventory,
    user: state.user,
    currentCart: state.currentCart
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleInventory: inventoryId => {
      dispatch(fetchSingleInventory(inventoryId))
    },
    updateSingleOrder: (orderId, orderObject) => {
      dispatch(updateSingleOrder(orderId, orderObject))
    },
    fetchSingleCart: userId => {
      dispatch(fetchSingleCart(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleInventory)
