
'use strict'

import Vue from 'vue'
import wIcon from '@/components/UI/Icons'

Vue.component('w-icon', wIcon)

const req = require.context('./svg', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
