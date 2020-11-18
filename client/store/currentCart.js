import axios from 'axios'

let initialState = {}

const SET_SINGLE_CART = 'SET_SINGLE_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'

const setSingleCart = order => ({
  type: SET_SINGLE_CART,
  order
})

const checkoutCart = cart => ({
  type: CHECKOUT_CART,
  cart
})

export const fetchSingleCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(setSingleCart(data))
    } catch (error) {
      console.error('fetching single cart error', error)
    }
  }
}

export const removeSingleItem = (userId, itemId, orderId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}/cart/`, {
        itemId,
        orderId
      })
      dispatch(setSingleCart(data))
    } catch (error) {
      console.error('deleting single cart error', error)
    }
  }
}

export const updateSingleCart = (orderId, orderObject) => {
  return async dispatch => {
    try {
      const {data: order} = await axios.put(
        `/api/order/${orderId}`,
        orderObject
      )
      dispatch(setSingleCart(order))
    } catch (error) {
      console.error('updating single cart error', error)
    }
  }
}

export const checkoutCartThunk = (userId, orderId, cart) => {
  return async dispatch => {
    try {
      console.log('INSIDE CHECKOUTCART THUNK ???????????????????????')
      const {data} = await axios.put(`/api/users/${userId}/checkout`, {
        orderId,
        cart
      })
      dispatch(checkoutCart(data))
    } catch (error) {
      console.error('fetching single cart error', error)
    }
  }
}

export default function currentCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_CART:
      return action.order

    case CHECKOUT_CART:
      return action.cart

    default:
      return state
  }
}
