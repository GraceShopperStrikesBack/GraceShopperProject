import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import CartQuantity from './CartQuantity'
import Cart from './Cart'

const Navbar = ({handleClick, isLoggedIn, currentCart, user}) => {
  if (isLoggedIn) {
    let newUser = user
  } else if (localStorage.getItem('userId')) {
    user = localStorage.getItem('userId')
  } else {
    let uniqueNumber = Math.floor(Math.random() * 1000000)
    localStorage.setItem('userId', uniqueNumber)
    user = localStorage.getItem('userId')
  }
  return (
    <div>
      <nav>
        <img alt="logo" src="../../images/GPS_Logo.png" />
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/inventory">Products</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/inventory">Products</Link>
          </div>
        )}
        <Link to={`/users/${user}/cart`}>
          <img src="../../images/CartLogo.png" alt="cart" className="cart" />
        </Link>
        <CartQuantity />
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user.id,
    isLoggedIn: !!state.user.id,
    currentCart: state.currentCart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
