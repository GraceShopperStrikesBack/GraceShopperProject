import axios from 'axios'

//Action Type//

const GET_INVENTORY = 'GET_INVENTORY'

//Initial State//

const defaultInventory = []

//Action Creator//

const setInventory = inventory => {
  return {type: GET_INVENTORY, inventory}
}

//Thunks//

export const getInventoryThunk = () => {
  return async dispatch => {
    try {
      const {data: fetchedInventory} = await axios.get('/api/inventory')
      dispatch(setInventory(fetchedInventory))
    } catch (error) {
      console.error('getInventory error', error)
    }
  }
}

export default function allInventoryReducer(state = defaultInventory, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return action.inventory
    default:
      return state
  }
}
