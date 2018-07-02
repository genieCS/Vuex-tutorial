computed: {
    doneTodosCount () {
        return this.$store.state.todos.filter(todo => todo.done).length
    }
}

const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    }
})

store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
getters: {
    // ...
    doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
    }
}

computed: {
    doneTodosCount () {
      return this.$store.getters.doneTodosCount
    }
}

//getters accessed via methods will run each time you call them.
getters: {
    // ...
    getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
    }
}
store.getters.getTodoById(2)

import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
        'doneTodosCount',
        'anotherGetter',
        // ...
    ])
  }
}

...mapGetters({
    // map `this.doneCount` to `this.$store.getters.doneTodosCount`
    doneCount: 'doneTodosCount'
})