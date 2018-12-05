import { Router } from '../routes'

export default url => () => Router.pushRoute(url)
