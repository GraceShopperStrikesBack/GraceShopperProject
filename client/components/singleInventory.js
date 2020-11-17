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
      this.props.getSingleInventory(inventoryId)
    } catch (error) {
      console.error('single inventory mount error', error)
    }
  }

  async componentDidUpdate(prevProps) {
    try {
      if (this.props.user !== prevProps.user) {
        await this.props.fetchSingleCart(this.props.user.id)
      }
    } catch (error) {
      console.error('fetch cart update error', error)
    }
  }

  handleSubmit(orderId, orderObject) {
    this.props.updateSingleOrder(orderId, orderObject)
  }

  render() {
    const inventory = this.props.singleInventory
    console.log('inventoryyyyyy', inventory)
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
                  this.handleSubmit(this.props.currentCart[0].id, {
                    ...inventory,
                    quantity: 1
                  })
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
