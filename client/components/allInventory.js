import React from 'react'
import {connect} from 'react-redux'
import {getInventoryThunk} from '../store/allInventory'

//Need to import single page from SJ and Dan//

class AllInventory extends React.Component {
  componentDidMount() {
    this.props.getInventory()
  }

  render() {
    const inventory = this.props.inventory
    if (!inventory) {
      return <div>This Page Is Loading...</div>
    }
    return (
      <div>
        <div>
          {inventory.map(currentItem => {
            return (
              <div key={currentItem.id}>
                <div>{currentItem.name}</div>
                <img src={currentItem.imageUrl} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    inventory: state.inventory
  }
}

const mapDispatch = dispatch => {
  return {
    getInventory: () => dispatch(getInventoryThunk())
  }
}

export default connect(mapState, mapDispatch)(AllInventory)
