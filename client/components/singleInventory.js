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
          <div>
            <img src={inventory.imageUrl} />
            <h2>{inventory.name}</h2>
            <h3>$ {inventory.price}</h3>
            <p>{inventory.description}</p>
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
