//Each mutation has a string type and a handler.
const store = new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        increment (state) {
            // mutate state
            state.count++
        }
    }
})

store.commit('increment')

//payload for the mutation
// ...
mutations: {
    increment (state, n) {
        state.count += n
    }
}
store.commit('increment', 10)

// ...
mutations: {
    increment (state, payload) {
        state.count += payload.amount
    }
}

store.commit('increment', {
    amount: 10
})

//object-style commit
store.commit({
    type: 'increment',
    amount: 10
})

// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'

// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})

import { mapMutations } from 'vuex'

export default {
    // ...
    methods: {
        ...mapMutations([
        'increment', // map `this.increment()` to `this.$store.commit('increment')`

        // `mapMutations` also supports payloads:
        'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
        ]),
        ...mapMutations({
        add: 'increment' // map `this.add()` to `this.$store.commit('increment')`
        })
    }
}
