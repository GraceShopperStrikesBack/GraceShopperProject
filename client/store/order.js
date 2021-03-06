import axios from 'axios'

let initialState = {}

const SET_SINGLE_ORDER = 'SET_SINGLE_ORDER'

const setSingleOrder = order => ({
  type: SET_SINGLE_ORDER,
  order
})

export const fetchSingleOrder = orderId => {
  return async dispatch => {
    try {
      const {data: order} = await axios.get(`/api/order/${orderId}`)
      dispatch(setSingleOrder(order))
    } catch (error) {
      console.error('fetching single order error', error)
    }
  }
}

export const updateSingleOrder = (orderId, orderObject) => {
  return async dispatch => {
    try {
      const {data: order} = await axios.put(
        `/api/order/${orderId}`,
        orderObject
      )
      dispatch(setSingleOrder(order))
    } catch (error) {
      console.error('updating single order error', error)
    }
  }
}

export default function singleOrderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_ORDER:
      return (state = action.order)
    default:
      return state
  }
}
