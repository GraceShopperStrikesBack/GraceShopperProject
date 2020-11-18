import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CreateNewInventory from './CreateNewInventory'
import {fetchSingleCart} from '../store/currentCart'
import {fetchNotLoggedIn} from '../store/user'
import {fetchAllOrders} from '../store/allOrders'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.user.id) {
      let user = localStorage.getItem('userId')
      this.props.fetchNotLoggedIn(user)
    }
    this.props.fetchSingleCart(this.props.user.id)
    this.props.fetchAllOrders()
  }

  // const {user, email} = props
  render() {
    let allOrders = this.props.allOrders
    return (
      <div>
        <h3>Welcome, {this.props.email}</h3>
        {this.props.user.isAdmin === true ? (
          <div>
            <h1>Welcome to Grace Pro Shopper Fellow Administrator!</h1>
            <CreateNewInventory userId={this.props.user.id} />
          </div>
        ) : (
          <div>
            <h1>Welcome to Grace Pro Shopper!</h1>
            <h3>Order History</h3>
            <div className="orderHistory">
              {allOrders
                .filter(currentOrder => {
                  if (
                    currentOrder.isFulfilled &&
                    currentOrder.userId === this.props.user.id
                  ) {
                    return currentOrder
                  }
                })
                .map(currentOrder => {
                  let orderImage = currentOrder.inventories[0]
                  return (
                    <a key={currentOrder.id} href={`/order/${currentOrder.id}`}>
                      <div className="orderHistoryChild">
                        <img
                          className="orderHistoryImage"
                          src={orderImage.imageUrl}
                        />
                      </div>
                    </a>
                  )
                })}
            </div>
          </div>
        )}
        <footer>Grace Pro Shopper © 2020</footer>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    email: state.user.email,
    allOrders: state.allOrders
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleCart: userId => {
      dispatch(fetchSingleCart(userId))
    },
    fetchNotLoggedIn: userId => {
      dispatch(fetchNotLoggedIn(userId))
    },
    fetchAllOrders: () => {
      dispatch(fetchAllOrders())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
