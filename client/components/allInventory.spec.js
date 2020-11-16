/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllInventory} from './allInventory'
import sinon from 'sinon'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllInventory component', () => {
  let allInventory

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

  const getAllInventorySpy = sinon.spy()

  afterEach(() => {
    getAllInventorySpy.resetHistory()
  })

  beforeEach(() => {
    allInventory = shallow(
      <AllInventory inventory={inventory} getInventory={getAllInventorySpy} />
    )
  })

  it('renders the inventory passed in as props', () => {
    expect(allInventory.text()).to.include('Callaway Mavrik/Sub Zero')
    expect(allInventory.text()).to.include('Cleveland Launcher HB Turbo')

    const images = allInventory.find('img').map(node => node.get(0).props.src)
    expect(images).to.include.members([
      'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1742a74dc2c900088be73c_GD020120_HL_DR_F_CALLAWAY_MAVERIK_FACE_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448539480.jpeg',
      'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1745daa9128e00073624a2_GD020120_HL_WEB_CLEVELAND_LAUNCHER%20HB%20TURBO%20DRAW_HERO_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583334823331.jpeg'
    ])
  })
})
