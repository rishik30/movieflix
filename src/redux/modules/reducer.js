import { handleActions }                  from 'redux-actions'
import { fromJS }                         from 'immutable'
import {
	SET_SEARCHED_MOVIE,
    ADD_TO_WATCHED_LIST,
    SET_WATCHED_MOVIES_DATA,
    SET_STATUS_TO_WATCHED,
    REMOVE_FROM_WATCHED_LIST
} 										  from './action.js'

const initialState = fromJS({
    data: null,
    watchedMovies: fromJS([])
})

export default handleActions({
	[SET_SEARCHED_MOVIE]: (state, { payload }) => {
        if (payload['Error']) return state.set('data', null)
        const watchedMoviesData = state.get('watchedMovies').toJS()
        payload.isWatched = watchedMoviesData.filter(item => item.Title === payload.Title).length > 0
        payload.voteStatus = 0
        return state.set('data', payload)
    },
    [ADD_TO_WATCHED_LIST]: (state, { payload }) => {
        const watchedMoviesData = state.get('watchedMovies').toJS()
        if (watchedMoviesData.filter(item => item.Title === payload.Title).length > 0) return state.set('watchedMovies', fromJS(watchedMoviesData))
        watchedMoviesData.push(payload)
        return state.set('watchedMovies', fromJS(watchedMoviesData))
    },
    [SET_WATCHED_MOVIES_DATA]: (state, { payload }) => state.set('watchedMovies', fromJS(payload)),
    [SET_STATUS_TO_WATCHED]: (state, { payload }) => {
        let data = state.get('data')
        data.isWatched = true
        return state.set('data', data)
    },
    [REMOVE_FROM_WATCHED_LIST]: (state, { payload }) => {
        let moviesData = state.get('watchedMovies').toJS()
        const newList = moviesData.filter(item => item.Title !== payload.Title)
        return state.set('watchedMovies', fromJS(newList))
    }
}, initialState)
