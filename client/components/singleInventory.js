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
    this.getCurrentCart = this.getCurrentCart.bind(this)
  }

  componentDidMount() {
    const inventoryId = this.props.match.params.inventoryId
    this.props.getSingleInventory(inventoryId)
  }

  handleSubmit(orderId, orderObject, event) {
    event.preventDefault()
    this.props.updateSingleOrder(orderId, orderObject)
  }

  getCurrentCart() {
    // event.preventDefault()
    let userId = this.props.user.id
    if (userId) {
      this.props.fetchSingleCart(userId)
    }
    const currentCart = this.props.currentCart[0]
    console.log(currentCart)
  }

  render() {
    const inventory = this.props.singleInventory
    const currentCart = this.props.currentCart[0]
    // console.log(currentCart)
    // console.log(this.props.user)
    // let userId = this.props.user.id

    // if (userId) {
    //   event.preventDefault()
    //   this.props.fetchSingleCart(userId)
    // }
    // console.log(currentCart)
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
