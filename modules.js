const moduleA = {
    state: { ... },
    mutations: { ... },
    actions: { ... },
    getters: { ... }
}
  
const moduleB = {
    state: { ... },
    mutations: { ... },
    actions: { ... }
}
  
const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
})
  
store.state.a // -> `moduleA`'s state
store.state.b // -> `moduleB`'s state

const moduleA = {
    state: { count: 0 },
    mutations: {
        increment (state) {
            // `state` is the local module state
            state.count++
        }
    },
  
    getters: {
        doubleCount (state) {
            return state.count * 2
        }
    }
}

const moduleA = {
    state: { count: 0 },
    mutations: {
        increment (state) {
            // `state` is the local module state
            state.count++
        }
    },
  
    getters: {
        doubleCount (state) {
            return state.count * 2
        }
    }
}

const moduleA = {
    // ...
    actions: {
        incrementIfOddOnRootSum ({ state, commit, rootState }) {
            if ((state.count + rootState.count) % 2 === 1) {
            commit('increment')
            }
        }
    }
}

const moduleA = {
    // ...
    actions: {
        incrementIfOddOnRootSum ({ state, commit, rootState }) {
            if ((state.count + rootState.count) % 2 === 1) {
            commit('increment')
            }
        }
    }
}

const moduleA = {
    // ...
    getters: {
        sumWithRootCount (state, getters, rootState) {
            return state.count + rootState.count
        }
    }
}

//Namespaced getters and actions will receive localized getters, dispatch and commit.
const store = new Vuex.Store({
    modules: {
        account: {
            namespaced: true,
    
            // module assets
            state: { ... }, // module state is already nested and not affected by namespace option
            getters: {
                isAdmin () { ... } // -> getters['account/isAdmin']
            },
            actions: {
                login () { ... } // -> dispatch('account/login')
            },
            mutations: {
                login () { ... } // -> commit('account/login')
            },
    
            // nested modules
            modules: {
                // inherits the namespace from parent module
                myPage: {
                    state: { ... },
                    getters: {
                        profile () { ... } // -> getters['account/profile']
                    }
                },
    
                // further nest the namespace
                posts: {
                    namespaced: true,
        
                    state: { ... },
                    getters: {
                        popular () { ... } // -> getters['account/posts/popular']
                    }
                }
            }
        }
    }
})

modules: {
    foo: {
        namespaced: true,
    
        getters: {
            // `getters` is localized to this module's getters
            // you can use rootGetters via 4th argument of getters
            someGetter (state, getters, rootState, rootGetters) {
            getters.someOtherGetter // -> 'foo/someOtherGetter'
            rootGetters.someOtherGetter // -> 'someOtherGetter'
            },
            someOtherGetter: state => { ... }
        },
  
        actions: {
            // dispatch and commit are also localized for this module
            // they will accept `root` option for the root dispatch/commit
            someAction ({ dispatch, commit, getters, rootGetters }) {
            getters.someGetter // -> 'foo/someGetter'
            rootGetters.someGetter // -> 'someGetter'
    
            dispatch('someOtherAction') // -> 'foo/someOtherAction'
            dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
    
            commit('someMutation') // -> 'foo/someMutation'
            commit('someMutation', null, { root: true }) // -> 'someMutation'
            },
            someOtherAction (ctx, payload) { ... }
        }
    }
}

{
    actions: {
        someOtherAction ({dispatch}) {
            dispatch('someAction')
        }
    },
    modules: {
        foo: {
            namespaced: true,
    
            actions: {
                someAction: {
                    root: true,
                    handler (namespacedContext, payload) { ... } // -> 'someAction'
                }
            }
        }
    }
}

computed: {
    ...mapState({
        a: state => state.some.nested.module.a,
        b: state => state.some.nested.module.b
    })
},
methods: {
    ...mapActions([
        'some/nested/module/foo',
        'some/nested/module/bar'
    ])
}

computed: {
    ...mapState('some/nested/module', {
        a: state => state.a,
        b: state => state.b
    })
},
methods: {
    ...mapActions('some/nested/module', [
        'foo',
        'bar'
    ])
}

import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
    computed: {
        // look up in `some/nested/module`
        ...mapState({
        a: state => state.a,
        b: state => state.b
        })
    },
    methods: {
        // look up in `some/nested/module`
        ...mapActions([
        'foo',
        'bar'
        ])
    }
}

// get namespace value via plugin option
// and returns Vuex plugin function
export function createPlugin (options = {}) {
    return function (store) {
        // add namespace to plugin module's types
        const namespace = options.namespace || ''
        store.dispatch(namespace + 'pluginAction')
    }
}

// register a module `myModule`
store.registerModule('myModule', {
    // ...
})
  
// register a nested module `nested/myModule`
store.registerModule(['nested', 'myModule'], {
    // ...
})

const MyReusableModule = {
    state () {
        return {
            foo: 'bar'
        }
    },
    // mutations, actions, getters...
}