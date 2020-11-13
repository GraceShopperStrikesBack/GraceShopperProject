import React from 'react'
import {connect} from 'react-redux'
import {
  updateSingleInventory,
  deleteSingleInventory
} from '../store/singleInventory'

class UpdateSingleInventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      price: null
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleDelete(id) {
    await this.props.deleteSingleInventory(id)
  }

  async handleUpdate(event) {
    event.preventDefault()
    this.props.updateSingleInventory(
      this.props.inventory.id,
      this.state.name,
      this.state.imageUrl,
      this.state.description,
      this.state.price
    )
    //this.props.inventoryRefresh() <<<<<<<<< what are we doing here?  used in JPFP for instant visibility on update
    this.setState({
      firstName: '',
      lastName: '',
      email: ''
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="updateView">
        <div className="singleCampusTitle">
          <h2>Update Product</h2>
        </div>
        <form onSubmit={this.handleUpdate}>
          <div>
            Product Name:<br />
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            Image URL:<br />
            <input
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            />
          </div>
          <div>
            Description:<br />
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            Price:<br />
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Update</button>{' '}
          <button onClick={() => this.handleDelete(this.props.inventory.id)}>
            Delete Item
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    deleteSingleInventory: id => {
      dispatch(deleteSingleInventory(id))
    },
    updateSingleInventory: (id, name, imageUrl, description, price) => {
      dispatch(updateSingleInventory(id, name, imageUrl, description, price))
    }
  }
}

export default connect(null, mapDispatch)(UpdateSingleInventory)
