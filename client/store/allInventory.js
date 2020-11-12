import axios from 'axios'

//Action Type//

const GET_INVENTORY = 'GET_INVENTORY';

//Initial State//

const defaultInventory = [];

//Action Creator//

const setInventory = (inventory) => {
    return {type: GET_INVENTORY, inventory}
}

//Thunks//

const getInventoryThunk = () => {
    return async (dispatch) => {
       const fetchedInventory = await axios.get('/api/inventory')
       dispatch(setInventory(fetchedInventory.data))
    }
};

export default function allInventoryReducer (state = defaultInventory, action) {
    switch (action.type) {
        case GET_INVENTORY:
            return action.inventory
        default:
            return state
    }
}
