/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar'
export {default as UserHome} from './User-home'
export {Login, Signup} from './Auth-form'
export {default as AllInventory} from './allInventory'
export {default as Checkout} from './Checkout'
