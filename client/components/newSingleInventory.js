import React from 'react'
import {fetchSingleInventory} from '../store/singleInventory'
import {connect} from 'react-redux'
import {updateSingleOrder} from '../store/order'
import UpdateSingleInventory from './updateSingleInventory'
import {fetchSingleCart} from '../store/CurrentCart'
import {me} from '../store/user'

export class NewSingleInventory extends React.Component {
  constructor(props) {
    super(props)
    // this.handleClick = this.handleClick.bind(this)
    this.getProps = this.getProps.bind(this)
  }

  componentDidMount() {
    // this.props.getUser()
    this.getProps()
    let userId = this.props.user.id
    if (userId) {
      this.props.fetchSingleCart(userId)
    }
  }

  async getProps() {
    await this.props.getUser()
  }

  render() {
    return (
      <div>
        Hello world!
        {/* {this.props.currentCart.map((currentCart) => {
                    return (currentCart.id)
                })} */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentCart: state.currentCart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleCart: userId => {
      dispatch(fetchSingleCart(userId))
    },
    getUser: () => {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(NewSingleInventory)
