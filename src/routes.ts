export enum ERoute {
  Home = '/',
  Login = '/login',
  Trip = '/trips/:id'
}

const FULL_SCREEN_ROUTES = [ERoute.Trip]