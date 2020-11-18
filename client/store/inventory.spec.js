/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import {setInventory, getAllInventory} from './allInventory'
import {setSingleInventory, fetchSingleInventory} from './singleInventory'
import {createStore} from 'redux'
import store, {reducer} from './index'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('All Inventory Redux', () => {
  let store
  let mockAxios

  const initialState = {inventory: []}

  beforeEach(() => {
    store = mockStore(initialState)
    mockAxios = new MockAdapter(axios)
    mockAxios.onGet('/api/inventory').replyOnce(200, inventory)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })
  const inventory = [
    {
      id: 1,
      name: 'Callaway Mavrik/Sub Zero',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1742a74dc2c900088be73c_GD020120_HL_DR_F_CALLAWAY_MAVERIK_FACE_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448539480.jpeg',
      description:
        'Callaway’s new three-driver family builds on the artificial-intelligence platform of last year’s Epic Flash. Those previously unimaginable variable- thickness face contours have been improved to bolster distance for three head styles and player types. The standard Mavrik—Callaway’s most ambitious aerodynamic design—has a raised rear skirt to enhance swing speed, and the face and deep center of gravity work together to produce consistency in distance. The beefier, low-spin Sub Zero and the draw-biased Max come with two movable weights.',
      price: 500,
      category: 'Drivers'
    },
    {
      id: 2,
      name: 'Cleveland Launcher HB Turbo',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1745daa9128e00073624a2_GD020120_HL_WEB_CLEVELAND_LAUNCHER%20HB%20TURBO%20DRAW_HERO_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583334823331.jpeg',
      description:
        'Cleveland’s focus on the needs of Joes over pros in recent years is evident in this model. It doesn’t have adjustability features because, well, a lot of you don’t use them, and building adjustability into a driver wastes weight and effort that can be better used to make it more forgiving or to help you fight a slice. In other words, the kind of features you might need. By forgoing adjustability, Cleveland saved 35 grams that were placed in the rear of the clubhead to increase stability on off-center strikes. Cleveland also saved weight by engineering a lighter, more flexible wraparound cupface.',
      price: 250,
      category: 'Drivers'
    }
  ]

  describe('set/fetch all inventory', () => {
    it('setInventory action creator returns a valid action', () => {
      expect(setInventory(inventory)).to.deep.equal({
        type: 'GET_INVENTORY',
        inventory
      })
    })

    it('getAllInventory thunk creator returns a thunk that GETs /api/inventory', async () => {
      await store.dispatch(getAllInventory())
      const [getRequest] = mockAxios.history.get
      expect(getRequest).to.not.equal(undefined)
      expect(getRequest.url).to.equal('/api/inventory')
      const actions = store.getActions()
      expect(actions[0].type).to.equal('GET_INVENTORY')
      expect(actions[0].inventory).to.deep.equal(inventory)
    })
  })
})

describe('Single Inventory Redux', () => {
  let store
  let mockAxios

  const initialState = {inventory: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    mockAxios.onGet('/api/inventory/1').replyOnce(200, inventory)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  const inventory = {
    id: 1,
    name: 'Callaway Mavrik/Sub Zero',
    imageUrl:
      'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1742a74dc2c900088be73c_GD020120_HL_DR_F_CALLAWAY_MAVERIK_FACE_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448539480.jpeg',
    description:
      'Callaway’s new three-driver family builds on the artificial-intelligence platform of last year’s Epic Flash. Those previously unimaginable variable- thickness face contours have been improved to bolster distance for three head styles and player types. The standard Mavrik—Callaway’s most ambitious aerodynamic design—has a raised rear skirt to enhance swing speed, and the face and deep center of gravity work together to produce consistency in distance. The beefier, low-spin Sub Zero and the draw-biased Max come with two movable weights.',
    price: 500,
    category: 'Drivers'
  }

  describe('set/fetch single inventory', () => {
    it('setSingleInventory action creator returns a valid action', () => {
      expect(setSingleInventory(inventory)).to.deep.equal({
        type: 'SET_SINGLE_INVENTORY',
        inventory
      })
    })

    it('fetchSingleInventory thunk creator returns a thunk that GETs /api/inventory/:inventoryId', async () => {
      await store.dispatch(fetchSingleInventory(inventory.id))
      const [getRequest] = mockAxios.history.get
      expect(getRequest).to.not.equal(undefined)
      expect(getRequest.url).to.equal(`/api/inventory/${inventory.id}`)
      const actions = store.getActions()
      expect(actions[0].type).to.equal('SET_SINGLE_INVENTORY')
      expect(actions[0].inventory).to.deep.equal(inventory)
    })
  })
})

describe('All inventory reducer', () => {
  let testStore
  beforeEach(() => {
    testStore = createStore(reducer)
  })

  const inventory = [
    {
      id: 1,
      name: 'Callaway Mavrik/Sub Zero',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1742a74dc2c900088be73c_GD020120_HL_DR_F_CALLAWAY_MAVERIK_FACE_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448539480.jpeg',
      description:
        'Callaway’s new three-driver family builds on the artificial-intelligence platform of last year’s Epic Flash. Those previously unimaginable variable- thickness face contours have been improved to bolster distance for three head styles and player types. The standard Mavrik—Callaway’s most ambitious aerodynamic design—has a raised rear skirt to enhance swing speed, and the face and deep center of gravity work together to produce consistency in distance. The beefier, low-spin Sub Zero and the draw-biased Max come with two movable weights.',
      price: 500,
      category: 'Drivers'
    },
    {
      id: 2,
      name: 'Cleveland Launcher HB Turbo',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1745daa9128e00073624a2_GD020120_HL_WEB_CLEVELAND_LAUNCHER%20HB%20TURBO%20DRAW_HERO_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583334823331.jpeg',
      description:
        'Cleveland’s focus on the needs of Joes over pros in recent years is evident in this model. It doesn’t have adjustability features because, well, a lot of you don’t use them, and building adjustability into a driver wastes weight and effort that can be better used to make it more forgiving or to help you fight a slice. In other words, the kind of features you might need. By forgoing adjustability, Cleveland saved 35 grams that were placed in the rear of the clubhead to increase stability on off-center strikes. Cleveland also saved weight by engineering a lighter, more flexible wraparound cupface.',
      price: 250,
      category: 'Drivers'
    }
  ]

  it('reduces on GET_INVENTORY action', () => {
    const action = {type: 'GET_INVENTORY', inventory}

    const prevState = testStore.getState()
    testStore.dispatch(action)
    const newState = testStore.getState()

    expect(newState.inventory).to.be.deep.equal(inventory)
    expect(newState.inventory).to.not.be.equal(prevState.inventory)
  })
})

describe('Single inventory reducer', () => {
  let testStore
  beforeEach(() => {
    testStore = createStore(reducer)
  })

  const inventory = {
    id: 1,
    name: 'Callaway Mavrik/Sub Zero',
    imageUrl:
      'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1742a74dc2c900088be73c_GD020120_HL_DR_F_CALLAWAY_MAVERIK_FACE_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448539480.jpeg',
    description:
      'Callaway’s new three-driver family builds on the artificial-intelligence platform of last year’s Epic Flash. Those previously unimaginable variable- thickness face contours have been improved to bolster distance for three head styles and player types. The standard Mavrik—Callaway’s most ambitious aerodynamic design—has a raised rear skirt to enhance swing speed, and the face and deep center of gravity work together to produce consistency in distance. The beefier, low-spin Sub Zero and the draw-biased Max come with two movable weights.',
    price: 500,
    category: 'Drivers'
  }

  it('reduces on SET_SINGLE_INVENTORY action', () => {
    const action = {type: 'SET_SINGLE_INVENTORY', inventory}

    const prevState = testStore.getState()
    testStore.dispatch(action)
    const newState = testStore.getState()

    expect(newState.singleInventory).to.be.deep.equal(inventory)
    expect(newState.singleInventory).to.not.be.equal(prevState.singleInventory)
  })
})
