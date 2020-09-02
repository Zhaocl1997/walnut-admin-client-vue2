
'use strict'

const state = {
    talk_situation: [],
    talk_initiator: []
}

const mutations = {
    ADD_DICT: (state, { dictIndex, options }) => {
        state[dictIndex] = options
    },
    GET_DICT: (state, { dictIndex }) => {
        console.log(dictIndex);
        
        return new Promise(resolve => {
            resolve(dictIndex)
        })
    }
}

const actions = {
    addDict({ commit }, { dictIndex, options }) {
        commit('ADD_DICT', { dictIndex, options })
    },
    getDict({ commit }, { dictIndex }) {
        commit('GET_DICT', { dictIndex })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
