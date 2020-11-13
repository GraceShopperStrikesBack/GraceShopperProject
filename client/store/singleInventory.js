import axios from 'axios'
import {getAllInventory} from '../store/allInventory'

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

export const addSingleInventory = (name, imageUrl, description, price) => {
  return async dispatch => {
    await axios.post('/api/inventory', {
      name: name,
      imageUrl: imageUrl,
      description: description,
      price: Number(price)
    })
    const allInventory = await axios.get('/api/inventory')
    dispatch(getAllInventory(allInventory.data))
  }
}

export const deleteSingleInventory = id => {
  return async dispatch => {
    await axios.delete(`/api/inventory/${id}`)
    const allInventory = await axios.get('/api/inventory')
    dispatch(getAllInventory(allInventory.data))
  }
}

export const updateSingleInventory = (
  id,
  name,
  imageUrl,
  description,
  price
) => {
  return async dispatch => {
    const item = await axios.put(`/api/inventory/${id}`, {
      name: name,
      imageUrl: imageUrl,
      description: description,
      price: Number(price)
    })
    dispatch(setSingleInventory(item.data))
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
