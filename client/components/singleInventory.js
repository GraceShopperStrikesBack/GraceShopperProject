import React from 'react'
import {fetchSingleInventory} from '../store/singleInventory'
import {connect} from 'react-redux'
import {updateSingleOrder} from '../store/order'
import UpdateSingleInventory from './updateSingleInventory'
import {fetchSingleCart} from '../store/currentCart'

export class SingleInventory extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      const inventoryId = this.props.match.params.inventoryId
      console.log('USER IDDDDDDDDDD', this.props)
      const userId = this.props.userId
      this.props.fetchSingleCart(userId)
      this.props.getSingleInventory(inventoryId)
    } catch (error) {
      console.error('single inventory mount error', error)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      const userId = this.props.userId
      this.props.fetchSingleCart(userId)
    }
  }

  handleSubmit(orderId, orderObject, event) {
    event.preventDefault()
    this.props.updateSingleOrder(orderId, orderObject)
  }

  render() {
    console.log(this.props.user)
    console.log('CURRENT CARTTTTTTTTT', this.props.currentCart)
    const inventory = this.props.singleInventory
    const currentCart = this.props.currentCart[0]
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
                  this.handleSubmit(currentCart.id, inventory)
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
