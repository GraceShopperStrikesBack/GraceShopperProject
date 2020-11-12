import axios from 'axios'

let initialState = {}

const SET_SINGLE_INVENTORY = 'SET_SINGLE_INVENTORY'

const setSingleInventory = inventory => ({
  type: SET_SINGLE_INVENTORY,
  inventory
})

export const fetchSingleInventory = inventoryId => {
  return async dispatch => {
    try {
      const {data: inventory} = await axios.get(`/api/inventory/${inventoryId}`)
      dispatch(setSingleInventory(inventory))
    } catch (error) {
      console.error('fetching single inventory error', error)
    }
  }
}

export default function singleInventoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_INVENTORY:
      return (state = action.inventory)
    default:
      return state
  }
}
