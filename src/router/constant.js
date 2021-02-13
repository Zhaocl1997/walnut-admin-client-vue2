'use strict'

export const authPath = '/auth'
export const authName = 'Auth'

export const rootPath = '/'
export const rootName = 'Layout'

export const AuthRoute = {
  path: authPath,
  name: authName,
  component: () => import('../views/Auth/index.vue'),
}

export const RootRoute = {
  path: rootPath,
  name: rootName,
  component: () => import('../components/Layout/index.vue'),
  children: [
    {
      path: 'index',
      name: 'Index',
      component: () => import('../views/index.vue'),
    },
  ],
}

export const redirectRoute = {
  path: '/redirect',
  name: 'Redirect',
  component: () => import('../components/Layout/TheRedirect/index.vue'),
}

export const notFoundRoute = {
  path: '/:path(.*)*',
  name: '404',
  component: () => import('../views/Error/404/index.vue'),
}
