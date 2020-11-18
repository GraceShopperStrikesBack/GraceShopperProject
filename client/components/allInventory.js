import React from 'react'
import {connect} from 'react-redux'
import {getAllInventory} from '../store/allInventory'

//Need to import single page from SJ and Dan//
export class AllInventory extends React.Component {
  componentDidMount() {
    this.props.getInventory()
  }

  render() {
    const inventory = this.props.inventory

    if (!inventory) {
      return <div>This Page Is Loading...</div>
    }
    return (
      <div id="allInventory" className="backgroundImage">
        <header>
          <h1>Products</h1>
          <div className="line" />
        </header>
        <div className="inventoryBox">
          {inventory.map(currentItem => {
            return (
              <a key={currentItem.id} href={`/inventory/${currentItem.id}`}>
                <div className="singleInventoryBox">
                  <img src={currentItem.imageUrl} />
                  <div className="title">{currentItem.name}</div>
                </div>
              </a>
            )
          })}
        </div>
        <footer>Grace Pro Shopper © 2020</footer>
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
    getInventory: () => dispatch(getAllInventory())
  }
}

export default connect(mapState, mapDispatch)(AllInventory)
