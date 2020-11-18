'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Inventory} = require('../server/db/models')
const {Order} = require('../server/db/models')
const {OrderInventory} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      address: '5 Hanover Square 11th Fl, New York, NY 10004',
      isAdmin: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      address: '405 W Superior St, Chicago, IL 60654'
    }),
    User.create({
      email: 'slipperysam@email.com',
      password: '123',
      address: '405 W Superior St, Chicago, IL 60654'
    })
  ])

  const inventories = await Promise.all([
    Inventory.create({
      name: 'Callaway Mavrik/Sub Zero',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1742a74dc2c900088be73c_GD020120_HL_DR_F_CALLAWAY_MAVERIK_FACE_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448539480.jpeg',
      description:
        'Callaway’s new three-driver family builds on the artificial-intelligence platform of last year’s Epic Flash. Those previously unimaginable variable- thickness face contours have been improved to bolster distance for three head styles and player types. The standard Mavrik—Callaway’s most ambitious aerodynamic design—has a raised rear skirt to enhance swing speed, and the face and deep center of gravity work together to produce consistency in distance. The beefier, low-spin Sub Zero and the draw-biased Max come with two movable weights.',
      price: 500,
      category: 'Drivers'
    }),
    Inventory.create({
      name: 'Cleveland Launcher HB Turbo',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1745daa9128e00073624a2_GD020120_HL_WEB_CLEVELAND_LAUNCHER%20HB%20TURBO%20DRAW_HERO_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583334823331.jpeg',
      description:
        'Cleveland’s focus on the needs of Joes over pros in recent years is evident in this model. It doesn’t have adjustability features because, well, a lot of you don’t use them, and building adjustability into a driver wastes weight and effort that can be better used to make it more forgiving or to help you fight a slice. In other words, the kind of features you might need. By forgoing adjustability, Cleveland saved 35 grams that were placed in the rear of the clubhead to increase stability on off-center strikes. Cleveland also saved weight by engineering a lighter, more flexible wraparound cupface.',
      price: 250,
      category: 'Drivers'
    }),
    Inventory.create({
      name: 'Cobra King SpeedZone/Xtreme',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1747ef4dc2c900088be740_GD020120_HL_WEB_COBRA_SZ%20EXTREME_HERO_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583334850439.jpeg',
      description:
        'The King Speedzone is the standard version and features movable weights. The Xtreme has extra forgiveness. Both drivers focus on small details for big performance. For example, by computer milling the face and extending it to the perimeter, each curve and thickness is more tightly controlled for optimal flexing, higher launch and straighter off-center hits. The carbon-fiber crown wraps around the top of the driver into two lobes, so now half of the clubhead area is weight-saving composite when it used to be barely a third.',
      price: 450,
      category: 'Drivers'
    }),
    Inventory.create({
      name: 'PXG 0811',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/21/5e276bfc5d5f8d0008616dec_GD020120_HL_DRIVER_PXG_0811X_HERO_DRIVER_HL2020_2.0.jpg.rend.hgtvcom.406.406.suffix/1581449744685.jpeg',
      description:
        'The titanium face gets a lot of the attention, but it’s the nonmetal pieces inside and outside these drivers that merit highlighting. First, the carbon- composite crown saves weight to increase adjustability options on the 0811 X and forgiveness on the 0811 XF. But the crown is also thicker and raised slightly to provide a stiffer area around the face to concentrate more rebound into the ball. Second, there’s a layer of soft elastomer in a honeycomb pattern lining the sole to control vibration and improve sound. The sole weights switch around so you can adjust spin, trajectory and direction.',
      price: 575,
      category: 'Drivers'
    }),
    Inventory.create({
      name: 'TaylorMade SIM/Max D',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1747ecf2ea3f0009275e0f_GD020120_HL_DR_H_TAYLORMADE_SIM_HERO_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448564528.jpeg',
      description:
        'The problem with aerodynamic features is that although they make a driver move through the air faster, they generally make impact less effective. The main reason is how an aerodynamic design typically pushes up the center of gravity (CG), raising spin and reducing forgiveness. These wind-tunnel-developed drivers—including one with a sliding weight (SIM) and one that’s designed to combat a slice (Max D)—solve the CG problem with a back-weighted keel in the sole. It’s angled to improve air flow as the club rotates on the downswing, just when it’s moving the fastest.',
      price: 550,
      category: 'Drivers'
    }),
    Inventory.create({
      name: 'Titleist TS1-TS4',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1747f35037910009e466d2_GD020120_HL_WEB_TITLEIST_TS1_HERO_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448586159.jpeg',
      description:
        'Last year Titleist reinvigorated its driver line with the fast, thin-face designs behind the forgiving TS2 and adjustable-weight TS3. This year Titleist added two new models to reach a wider audience: the TS1, Titleist’s lightest driver ever, and the ultra-low-spin TS4. Boasting 40-gram shaft options and a slight draw bias, the TS1 serves the moderate swing-speed crowd who haven’t always considered Titleist an option. All four drivers in the family feature the company’s lightest and thinnest crown, plus ultra-thin faces that are 100-percent inspected for maximum flex.',
      price: 500,
      category: 'Drivers'
    }),
    Inventory.create({
      name: 'Honma TR20',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1747e92ad0370008c95c77_GD020120_HL_DR_F_HONMA_TR20_FACE_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448530944.jpeg',
      description:
        'You might think of Honma for its craftsmanship or use of gold in its pursuit of moderate swing-speed-player aesthetics. But the TR20 is the most complex of modern drivers that’s built to appeal to better-player muscle. The face has been thinned on the inside by the use of vertical grooves, and the body is made mostly from carbon fiber. There are three sole weights that allow you to specify less spin, extra forgiveness or a stronger draw bias. The compact 440-cubic-centimeter version is built to Justin Rose’s performance and visual requirements.',
      price: 650,
      category: 'Drivers'
    }),
    Inventory.create({
      name: 'Srixon Z 785/Z 585',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1747eb2ad0370008c95c7b_GD020120_HL_DR_H_SRIXON_Z785_HERO_DRIVER_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448577590.jpeg',
      description:
        'These two drivers meet the needs of the two primary player types in golf. The Z 785 is a low-spin model with a hosel that allows the loft to be adjusted 1 degree in either direction so you can set your preferred ball flight. The highly forgiving Z 585 doesn’t adjust, but it’s designed to produce a high ball flight. Both drivers feature a weight-saving, carbon-fiber crown and a cupface made of an exclusive titanium alloy that wraps around the perimeter for improved rebound at impact across the entire face.',
      price: 500,
      category: 'Drivers'
    }),
    Inventory.create({
      name: 'Tour Edge Exotics ES220',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1754e2a42a940008b40e78_GD020120_HL_WOODS_H_TOUR%20EDGE_EXOTICS%20EXS220_HERO_WOODS_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583334907367.jpeg',
      description:
        'What makes a face work is the technology inside. The backside of this face is cross-hatched with rows of diamond- shape thick-and-thin sections. Think of it as 44 mini-trampolines. This design allows for better flexing on off-center locations and reduces the weight of the face by 14 percent. Carbon-fiber panels in the heel and toe of the sole help push weight to the rear for higher stability and better speed on mis-hits.',
      price: 250,
      category: 'Fairway Woods'
    }),
    Inventory.create({
      name: 'Cobra FMax Airspeed',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1754e0c3eb0f000878a3b4_GD020120_HL_WOODS_H_COBRA_FMAX%20AIRSPEED_HERO_WOODS_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583334920084.jpeg',
      description:
        'Designed for the moderate-swing-speed player, this wood family achieves the neat trick of reducing weight without sacrificing forgiveness and easy launch. The club’s lighter weight (20 grams less than its predecessor) offers slower swings more potential to swing faster, but the carbon-composite crown lowers the center of gravity and pushes weight to the perimeter for more stability on mis-hits. The offset hosel adds height and helps combat a slice.',
      price: 220,
      category: 'Fairway Woods'
    }),
    Inventory.create({
      name: 'Srixon Z F85',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1754e0c3eb0f000878a3b4_GD020120_HL_WOODS_H_COBRA_FMAX%20AIRSPEED_HERO_WOODS_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583334920084.jpeg',
      description:
        'This straightforward look will likely appeal to better players, but it’s full of technological tweaks that make these heads more powerful than simple. The two 3-woods have a weight-saving carbon-composite crown and high-strength steel cupface that gets as thin as a penny. The result is more distance and discretionary weight to reposition for forgiveness. On all the lofts, the crown steps down for a lower center of gravity and less spin.',
      price: 250,
      category: 'Fairway Woods'
    }),
    Inventory.create({
      name: 'Sub 70 Pro',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1754e1c3eb0f000878a3b6_GD020120_HL_WOODS_H_SUB%2070_PRO%2070_HERO_WOODS_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583334925380.jpeg',
      description:
        'Like a bespoke tailor, this website’s direct-to-consumer offering focuses on experienced consumers who know what they want. Don’t go looking for any anti-slice 11-woods in this collection. This is all muscle in a compact shape for the player who wants to work the ball. The switchable front and rear weights (nine and two grams) let you tweak trajectory and feel. The high-strength-steel cupface is specially heat-treated for extra flex.',
      price: 150,
      category: 'Fairway Woods'
    }),
    Inventory.create({
      name: 'XXIO X',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1754e2a2cf0c0008c80c62_GD020120_HL_WOODS_H_XXIO_ELEVEN_HERO_WOODS_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448710249.jpeg',
      description:
        'These slightly lighter fairway woods feel more substantial because extra weight in the grip end gives you more control, especially at the top of your backswing. Inside the head, the internal weight pad is forward and angled up to help you launch the ball. It allows for the larger cupface to wrap deeper into the crown and sole so there’s more flex on mis-hits.',
      price: 400,
      category: 'Fairway Woods'
    }),
    Inventory.create({
      name: 'PGX 0317 X Gen2',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e175ca9c3eb0f000878a3c2_GD020120_HL_HYBRID_PXG_0317X_HERO_HYBRID_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448740652.jpeg',
      description:
        'Distance is lovely, but the right hybrid gets you a specific yardage to attack the pin. The low, forward center of gravity helps to reduce spin so shots launch with efficient power. The multiple levels of adjustability dial in distance and direction better than Waze. A rotating hosel tweaks loft by 1.5 degrees in either direction, and the mix of eight sole weights (light titanium and heavy tungsten) can add forgiveness, reduce spin or add draw or fade bias.',
      price: 375,
      category: 'Hybrid'
    }),
    Inventory.create({
      name: 'Callaway Apex',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e175ca4fa08ee000805a92d_GD020120_HL_HYBRID_H_CALLAWAY_APEX_HERO_HYBRID_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448678487.jpeg',
      description:
        'Some hybrids fight ineptitude and others enhance skill. Firmly place Apex in the latter category. Its compact shape will appeal to better players looking to provide a hint of forgiveness to their long-iron games. This doesn’t mean there isn’t speed here. The internal vertical “jailbreak” bars focus more flexing in the face to boost your distance, and the flatter, low-spin trajectory make this a hybrid that better players won’t see ballooning into the wind.',
      price: 270,
      category: 'Hybrid'
    }),
    Inventory.create({
      name: 'Callaway Big Bertha',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e175ca4a2cf0c0008c80c6c_GD020120_HL_HYBRID_H_CALLAWAY_BIG%20BERTHA_HERO_HYBRID_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583334917377.jpeg',
      description:
        'Hybrids need special engineering so that the small face and head can be flexible and forgiving. Big Bertha solves those challenges by concentrating more flexing in its wraparound cupface through the vertical “jailbreak” bars that join the crown and sole internally. Shortening the adjustable hosel and making it lighter saves weight that’s used to lower the center of gravity—precisely where it would be if the hosel weren’t adjustable.',
      price: 270,
      category: 'Hybrid'
    }),
    Inventory.create({
      name: 'Cleveland Launcher Halo',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e175ca68dc19f00084152a5_GD020120_HL_HYBRID_H_CLEVELAND_LAUNCHER%20HALO_HERO_HYBRID_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583334940715.jpeg',
      description:
        'Seems simple: Rails on the sole of a hybrid lower the center of gravity and help turf interaction. Designing them correctly? Not so simple. Cleveland’s engineers used extensive computer simulations to determine the ideal number, size and spacing of its rails. Crucial is the way the leading edge forgives fat shots, allowing for 25 percent less loss of speed coming into the ball versus past models. A thin, high-strength steel face rewards all that saved speed.',
      price: 200,
      category: 'Hybrid'
    }),
    Inventory.create({
      name: 'Mizuno CLK',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e175ca68dc19f00084152a7_GD020120_HL_HYBRID_H_MIZUNO_CLK(2020)_HERO_HYBRID_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581448715106.jpeg',
      description:
        'Mizuno hits the hybrid checklist pretty completely here. The flatter crown and wider body help lower the center of gravity and increase forgiveness. Then, a thinner face made from a high- strength steel used in race-car engines adds flex for speed. To improve performance on those slightly thin shots, the sole’s wave structure gives more at impact for better rebound. Finally, the four adjustable heads create lofts from 14 to 27 degrees.',
      price: 250,
      category: 'Hybrid'
    }),
    Inventory.create({
      name: 'TaylorMade P760',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1771dc3f52dc0008aa4cfb_GD020120_HL_PLAYERS%20IRONS_H_TAYLORMADE_P760_HERO_PI_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583335164582.jpeg',
      description:
        'Better players often find the right combo of looks, feel and forgiveness by mixing their iron set with two or more models. TaylorMade hopes to eliminate that need with the P760. The 3-iron through 7-iron are a hollow, multiple-piece design with a forged 1025 carbon-steel body and a thin steel face insert with foam inside to support the face. The short irons are single-piece forgings made of 1025 carbon steel that maintain the compact shape.',
      price: 175,
      category: 'Players Irons'
    }),
    Inventory.create({
      name: 'Mizuno JPX919 Tour',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1771d33f52dc0008aa4ced_GD020120_HL_PLAYERS%20IRONS_H_MIZUNO_JPX-919%20TOUR__HERO_PI_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583335120876.jpeg',
      description:
        'Iron design hinges on metallurgy and manufacturing, but at some point the engineering has to match the aesthetic. With an increase in tour use in recent years, Mizuno has used player feedback to drive the design of this iron. That meant a thinner topline with a slight bevel. This allows more weight to be added in the toe and the sole, providing more forgiveness than a typical players iron—something golfers of all levels can appreciate.',
      price: 150,
      category: 'Players Irons'
    }),
    Inventory.create({
      name: 'Titleist CNCPT CP-02',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e1771dcc3eb0f000878a3fa_GD020120_HL_PLAYERS%20IRONS_H_TITLEIST_CONCEPT%20CP-02_HERO_PI_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583335136522.jpeg',
      description:
        'For the past decade, Titleist has put a lot of effort into making irons for better players. This one even further distinguishes itself. The face is forged, and its L-shape is similar to the company’s T-MB and AP3 irons. But the CP-02 gets additional power from an extremely thin face made from a unique steel alloy the company refers to as “super metal.” The hollow-construction irons also use generous amounts of tungsten to improve off-center hits.',
      price: 500,
      category: 'Players Irons'
    }),
    Inventory.create({
      name: 'Cleveland Frontline',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e177b3e3f52dc0008aa4d25_GD020120_HL_BLADE_H_CLEVELAND_FRONTLINE_HERO_BLADE_HL2020.jpg.rend.hgtvcom.406.406.suffix/1581449090498.jpeg',
      description:
        'The forgiveness of high moment of inertia (MOI) putters might be good, but Cleveland’s point here is that the pursuit pushes the center of gravity (CG) too far back, making off-center hits start farther offline. Instead, the CG is closer to the face so that there’s less of a push on those toe hits, and you get a straighter roll. To further help mis-hits, an S-shape groove pattern replicates the benefits of, you guessed it, high-MOI putters.',
      price: 180,
      category: 'Blade Putters'
    }),
    Inventory.create({
      name: 'Odyssey Toulon',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e177b40fa08ee000805a9a5_GD020120_HL_BLADE_H_ODYSSEY_TOULON%20DESIGN_HERO_BLADE_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583335257287.jpeg',
      description:
        'These are classic, milled putters, but there’s more going on than aesthetics. The 303 stainless-steel head features a cross-hatched diamond-shape milling pattern that now extends across the face. These edges channel vibration for a more solid sound and enhance initial roll. Plus, there’s the standard graphite-steel Stroke Lab shaft that shifts the balance point toward the hands for better tempo control.',
      price: 450,
      category: 'Blade Putters'
    }),
    Inventory.create({
      name: 'Ping Sigma 2',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e177b42c3eb0f000878a426_GD020120_HL_BLADE_H_PING_SIGMA%202_HERO_BLADE_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583335287062.jpeg',
      description:
        'The Sigma 2 features an adjustable shaft that lets you change the length from 32 to 36 inches. Ping says 80 percent of golfers require a different length shaft than the standard 35 inches. This year’s shaft is stiffer for better feel. A dual-layer polymer supports the multiple-groove-aluminum face insert. The softer outer layer provides extra feel for short putts, and the firmer inner layer provides more energy from long range.',
      price: 200,
      category: 'Blade Putters'
    }),
    Inventory.create({
      name: 'TaylorMade TP Patina',
      imageUrl:
        'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2020/01/09/5e177b42a42a940008b40ecf_GD020120_HL_BLADE_H_TAYLORMADE_TP%20PATINA_HERO_BLADE_HL2020.jpg.rend.hgtvcom.406.406.suffix/1583335261257.jpeg',
      description:
        'The distressed copper finish offers a classic contrast to the updated face-insert technology. The lightweight aluminum insert still features downward facing grooves that reduce backspin to improve the roll during initial contact. But now that insert is thicker and is secured with screws to eliminate any voids for a more consistently solid feel. Sole weights customize the head weight to the shaft length and the golfer’s preference.',
      price: 250,
      category: 'Blade Putters'
    })
  ])

  const orders = await Promise.all([
    Order.create({}),
    Order.create({userId: 2, isFulfilled: true}),
    Order.create({userId: 1, isFulfilled: true}),
    Order.create({userId: 1, isFulfilled: true}),
    Order.create({userId: 2, isFulfilled: true}),
    Order.create({userId: 3, isFulfilled: true}),
    Order.create({userId: 3, isFulfilled: true}),
    Order.create({userId: 3, isFulfilled: true})
  ])

  const orderInventory = await Promise.all([
    OrderInventory.create({
      inventoryId: 1,
      orderId: 1,
      price: 200,
      quantity: 2
    }),
    OrderInventory.create({
      inventoryId: 4,
      orderId: 3,
      price: 400,
      quantity: 4
    }),
    OrderInventory.create({
      inventoryId: 8,
      orderId: 2,
      price: 600,
      quantity: 3
    }),
    OrderInventory.create({
      inventoryId: 11,
      orderId: 3,
      price: 1600,
      quantity: 6
    }),
    OrderInventory.create({
      inventoryId: 5,
      orderId: 6,
      price: 400,
      quantity: 4
    }),
    OrderInventory.create({
      inventoryId: 9,
      orderId: 7,
      price: 600,
      quantity: 3
    }),
    OrderInventory.create({
      inventoryId: 13,
      orderId: 8,
      price: 1600,
      quantity: 6
    }),
    OrderInventory.create({inventoryId: 1, orderId: 2, price: 200, quantity: 2})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
