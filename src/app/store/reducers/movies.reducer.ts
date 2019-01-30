import { initialState } from '../models/movie.model'
import * as MovieActions from '../actions/movie.actions'


export function movieReducer(state = initialState.movies, action: MovieActions.Actions) {

    switch (action.type) {
        case MovieActions.ADD_MOVIE:
            return [...state, action.payload];
        case MovieActions.REMOVE_MOVIE:
            let idx = state.findIndex(movie => movie._id === action.payload)
            state.splice(idx, 1);
            return state
        case MovieActions.LOAD_MOVIE:
            state = action.payload;
            return state;
        case MovieActions.UPDATE_MOVIE:
            state = state.map(currMovie => {
                if (action.payload._id === currMovie._id) return action.payload
                return currMovie
            })
            return state;
        default:
            return state;
    }
}