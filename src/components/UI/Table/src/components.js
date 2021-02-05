'use strict'

import { createAsyncComponent } from '/@/utils/factory/asyncComponent.js'

import wTableHeader from './components/header/index.vue'
import wTableColumns from './components/columns/main.vue'
import wTableEditableCell from './components/editableCell/index.vue'
import wPagination from '../../Pagination/index.vue'
import wTableEmpty from './components/state/empty/index.vue'

export default {
  wTableHeader,

  wTableColumns,

  wTableEditableCell,

  wPagination,

  wTableLoading: createAsyncComponent(() =>
    import('./components/state/loading/index.vue')
  ),

  wTableEmpty,
}
