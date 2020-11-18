import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CreateNewInventory from './CreateNewInventory'
import {fetchSingleCart} from '../store/currentCart'
import {fetchNotLoggedIn} from '../store/user'

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
  }

  // const {user, email} = props
  render() {
    return (
      <div>
        <h3>Welcome, {this.props.email}</h3>
        {this.props.user.isAdmin === true ? (
          <div>
            <CreateNewInventory userId={this.props.user.id} />
          </div>
        ) : (
          <div>Welcome to Grace Pro Shopper!</div>
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
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleCart: userId => {
      dispatch(fetchSingleCart(userId))
    },
    fetchNotLoggedIn: userId => {
      dispatch(fetchNotLoggedIn(userId))
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
