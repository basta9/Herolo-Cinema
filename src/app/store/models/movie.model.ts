export const initialState: IState = {
    movies: []
};

export interface Movie {
    _id: string
    title: string,
    year: string,
    runTime: string,
    genre: string,
    director: string,
    img: string
}

export interface IState {
    movies: Movie[];
}