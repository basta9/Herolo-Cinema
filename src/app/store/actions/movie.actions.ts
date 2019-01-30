import { Action } from '@ngrx/store'
import { Movie } from './../models/movie.model'

export const ADD_MOVIE = '[MOVIE] Add'
export const REMOVE_MOVIE = '[MOVIE] Remove'
export const LOAD_MOVIE = '[MOVIE] load'
export const UPDATE_MOVIE = '[MOVIE] update'

export class AddMovie implements Action {
    readonly type = ADD_MOVIE
    constructor(public payload: Movie) { }
}

export class RemoveMovie implements Action {
    readonly type = REMOVE_MOVIE
    constructor(public payload: string) { }
}

export class loadMovies implements Action {
    readonly type = LOAD_MOVIE
    constructor(public payload: Movie[]) {
    }
}

export class updateMovies implements Action {
    readonly type = UPDATE_MOVIE
    constructor(public payload: Movie) {
    }
}



export type Actions = AddMovie | RemoveMovie | loadMovies | updateMovies