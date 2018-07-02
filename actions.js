//Actions can contain arbitrary asynchronous operations.
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    },
    actions: {
        increment (context) {
            context.commit('increment')
        }
    }
})

actions: {
    increment ({ commit }) {
        commit('increment')
    }
}

store.dispatch('increment')

actions: {
    incrementAsync ({ commit }) {
        setTimeout(() => {
            commit('increment')
        }, 1000)
    }
}

// dispatch with a payload
store.dispatch('incrementAsync', {
    amount: 10
})
  
// dispatch with an object
store.dispatch({
    type: 'incrementAsync',
    amount: 10
})

actions: {
    checkout ({ commit, state }, products) {
        // save the items currently in the cart
        const savedCartItems = [...state.cart.added]
        // send out checkout request, and optimistically
        // clear the cart
        commit(types.CHECKOUT_REQUEST)
        // the shop API accepts a success callback and a failure callback
        shop.buyProducts(
            products,
            // handle success
            () => commit(types.CHECKOUT_SUCCESS),
            // handle failure
            () => commit(types.CHECKOUT_FAILURE, savedCartItems)
        )
    }
}

import { mapActions } from 'vuex'

export default {
    // ...
    methods: {
        ...mapActions([
            'increment', // map `this.increment()` to `this.$store.dispatch('increment')`

            // `mapActions` also supports payloads:
            'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
        ]),
        ...mapActions({
            add: 'increment' // map `this.add()` to `this.$store.dispatch('increment')`
        })
    }
}

actions: {
    actionA ({ commit }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            commit('someMutation')
            resolve()
            }, 1000)
        })
    }
}

store.dispatch('actionA').then(() => {
    // ...
})

actions: {
    // ...
    actionB ({ dispatch, commit }) {
        return dispatch('actionA').then(() => {
            commit('someOtherMutation')
        })
    }
}

// assuming `getData()` and `getOtherData()` return Promises
actions: {
    async actionA ({ commit }) {
        commit('gotData', await getData())
    },
    async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // wait for `actionA` to finish
        commit('gotOtherData', await getOtherData())
    }
}
