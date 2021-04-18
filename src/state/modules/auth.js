import axios from 'axios';
export const state = {
    currentUser: sessionStorage.getItem('authUser'),
}

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
        saveState('auth.currentUser', newValue)
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser
    },
    getLoggedInUser(state){
        return state.currentUser;
    }
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars
    init({ dispatch }) {
        dispatch('validate')
    },

    // Logs in the current user.
    logIn({ commit }, user) {
        return axios.post(process.env.VUE_APP_API_BASE_URL+'auth/login',user).then((response) => {
            const user = response.data;
            localStorage.setItem('auth-token',JSON.stringify(user.tokens.access.token));
            localStorage.setItem('refresh-token',JSON.stringify(user.tokens.refresh.token));
            commit('SET_CURRENT_USER', user)
            return user
        })
    },
    // Logs out the current user.
    logOut({ commit }) {
        // eslint-disable-next-line no-unused-vars
        commit('SET_CURRENT_USER', null)
        return axios.post(process.env.VUE_APP_API_BASE_URL+'auth/logout',{
            refreshToken: JSON.parse(localStorage.getItem('refresh-token'))
        }).then(() => {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('refresh-token');
            localStorage.removeItem('auth.currentUser');
            Promise.resolve(true);
        }).catch((error) => {
            Promise.reject(this._handleError(error));
        });
    },

    // register the user
    register({ commit }, user) {
        return axios.post(process.env.VUE_APP_API_BASE_URL+'auth/register',user).then((response) => {
            const user = response.data;
            localStorage.setItem('auth-token',JSON.stringify(user.tokens.access.token));
            localStorage.setItem('refresh-token',JSON.stringify(user.tokens.refresh.token));
            commit('SET_CURRENT_USER', user);
            return user
        });
    },
    // Validates the current user's token and refreshes it
    // with new data from the API.
    // eslint-disable-next-line no-unused-vars
    validate({ commit, state }){
        if (!state.currentUser) return Promise.resolve(null)
        const user = state.currentUser;
        commit('SET_CURRENT_USER', user)
        return user;
    },
    setLoggedInUser({commit}){
        const user = localStorage.getItem('auth.currentUser');
        commit('SET_CURRENT_USER',JSON.parse(user));
    },
}

// ===
// Private helpers
// ===

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}
