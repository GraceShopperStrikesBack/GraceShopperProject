import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CreateNewInventory from './createNewInventory'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user, email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      {user.isAdmin === true ? (
        <div>
          <CreateNewInventory />
        </div>
      ) : (
        <div>You do not have permission to edit products.</div>
      )}
    </div>
  )
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
