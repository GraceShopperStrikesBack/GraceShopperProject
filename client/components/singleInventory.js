import React from 'react'
import {fetchSingleInventory} from '../store/singleInventory'
import {connect} from 'react-redux'
import UpdateSingleInventory from './updateSingleInventory'

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
        <UpdateSingleInventory inventory={inventory} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleInventory: state.singleInventory
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleInventory: inventoryId =>
      dispatch(fetchSingleInventory(inventoryId))
  }
}

export default connect(mapState, mapDispatch)(SingleInventory)
