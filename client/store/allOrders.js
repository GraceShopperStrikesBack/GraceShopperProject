import axios from 'axios'

let initialState = []

const SET_ALL_ORDERS = 'SET_ALL_ORDERS'

const setAllOrders = orders => ({
  type: SET_ALL_ORDERS,
  orders
})

export const fetchAllOrders = () => {
  return async dispatch => {
    try {
      const {data: orders} = await axios.get(`/api/order/all`)
      dispatch(setAllOrders(orders))
    } catch (error) {
      console.error('fetching orders error', error)
    }
  }
}

export default function allOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_ORDERS:
      return (state = action.orders)
    default:
      return state
  }
}
