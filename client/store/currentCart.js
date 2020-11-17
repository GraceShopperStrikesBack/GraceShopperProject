import axios from 'axios'

let initialState = {}

const SET_SINGLE_CART = 'SET_SINGLE_CART'

const setSingleCart = order => ({
  type: SET_SINGLE_CART,
  order
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

export default function currentCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_CART:
      return action.order
    default:
      return state
  }
}
