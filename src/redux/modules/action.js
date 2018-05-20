import axios            from 'axios'
import { createAction } from 'redux-actions'

const GET_USER_API = 'http://www.omdbapi.com/?apikey=aabca0d&'

export const SET_SEARCHED_MOVIE = 'SET_SEARCHED_MOVIE'
export const ADD_TO_WATCHED_LIST = 'ADD_TO_WATCHED_LIST'
export const SET_WATCHED_MOVIES_DATA = 'SET_WATCHED_MOVIES_DATA'
export const SET_STATUS_TO_WATCHED = 'SET_STATUS_TO_WATCHED'
export const REMOVE_FROM_WATCHED_LIST = 'REMOVE_FROM_WATCHED_LIST'

const setSearchedMovie = createAction(SET_SEARCHED_MOVIE)
const addToWatchedList = createAction(ADD_TO_WATCHED_LIST)
export const setWatchedMoviesData = createAction(SET_WATCHED_MOVIES_DATA, (data) => data)
export const setStatusToWatched = createAction(SET_STATUS_TO_WATCHED)
export const removeFromWatchedList = createAction(REMOVE_FROM_WATCHED_LIST)

function getMovie (text) {
    return axios({
        url: `${GET_USER_API}t=${text}`,
        method: 'GET',
        timeout: 0,
		responseType: 'json'
    })
}

export function searchMovie (text) {
    return function (dispatch) {
        getMovie(text)
        .then(res => {
            const { data } = res
            dispatch(setSearchedMovie(data))
        })
    }
}

export function addMovieToList (movie) {
    return function (dispatch) {
        dispatch(addToWatchedList(movie))
    }
}

export function setVoteStatus (movie, status) {
    return function (dispatch, getState) {
        let data = getState().movies.get('watchedMovies').toJS()
        let updatedData = data.map(item => {
            if (item.Title === movie.Title) {
                if (status === 'like') item.voteStatus = 1
                else if (status === 'dislike') item.voteStatus = 2
            }
            return item
        })
        dispatch(setWatchedMoviesData(updatedData))
    }
}

export const actions = {
	searchMovie
}
