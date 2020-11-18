import React from 'react'
import {connect} from 'react-redux'
import {addSingleInventory} from '../store/singleInventory'

class CreateNewInventory extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      price: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    if (this.state.name === '') {
      event.preventDefault()
      this.setState({
        name: 'This field is required.'
      })
    }
    if (this.state.imageUrl === '') {
      event.preventDefault()
      this.setState({
        imageUrl: 'This field is required.'
      })
    }
    if (this.state.description === '') {
      event.preventDefault()
      this.setState({
        description: 'This field is required.'
      })
    }
    if (this.state.price === '') {
      event.preventDefault()
      this.setState({
        price: 'This field is required.'
      })
    } else {
      event.preventDefault()
      await this.props.addSingleInventory(
        this.state.name,
        this.state.imageUrl,
        this.state.description,
        this.state.price
      )
      this.setState({
        name: '',
        imageUrl: '',
        description: '',
        price: ''
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <h2>Add New Products</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div>
              Product Name:
              <br />
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Image URL:
              <br />
              <input
                type="text"
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Description:
              <br />
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Price:
              <br />
              <input
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addSingleInventory: (name, imageUrl, description, price, userId) =>
      dispatch(addSingleInventory(name, imageUrl, description, price, userId))
  }
}

export default connect(null, mapDispatch)(CreateNewInventory)
