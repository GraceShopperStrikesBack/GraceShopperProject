import React from 'react'
import {connect} from 'react-redux'

export class Checkout extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <h2>
              Please Enter Your Information Below To Complete Your Purchase
            </h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div>
              Name:<br />
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Address:<br />
              <input
                type="text"
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={this.handleChange}
              />
            </div>
            <div>
              City:<br />
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
            <div>
              State:<br />
              <input
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Purchase</button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(Checkout)
