import React from 'react'
import {fetchSingleInventory} from '../store/singleInventory'
import {connect} from 'react-redux'
import UpdateSingleInventory from './updateSingleInventory'
import user from '../store/user'

export class SingleInventory extends React.Component {
  componentDidMount() {
    try {
      const inventoryId = this.props.match.params.inventoryId
      this.props.getSingleInventory(inventoryId)
    } catch (error) {
      console.error('single inventory mount error', error)
    }
  }

  render() {
    let inventory = this.props.singleInventory
    return (
      <div>
        {inventory.id ? (
          <div className="inventoryBox">
            <h1>{inventory.name}</h1>
            <div className="singlePageItem">
              <img src={inventory.imageUrl} />
            </div>
            <div className="singlePageItem">
              <h3>Description:</h3>
              <p>{inventory.description}</p>
              <h4>Price: $ {inventory.price}</h4>
              <button>Add To Cart</button>
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
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleInventory: inventoryId =>
      dispatch(fetchSingleInventory(inventoryId))
  }
}

export default connect(mapState, mapDispatch)(SingleInventory)
