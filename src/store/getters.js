
'use strict'

const getters = {
  /* app */
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  size: state => state.app.size,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  dict: state => state.dict,
}
export default getters
