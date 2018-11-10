import {
    RESET_MOVIES,
    APPEND_MOVIES,
    SET_MOVIES_PAGE,
    SET_MOVIES_GENRES,
} from './actionTypes';

export const resetMovies = () => ({
    type: RESET_MOVIES,
});

export const appendMovies = movies => ({
    type: APPEND_MOVIES,
    movies,
});

export const setMoviesPage = (moviesApiPage, moviesNumberOfPages) => ({
    type: SET_MOVIES_PAGE,
    moviesApiPage,
    moviesNumberOfPages,
});

export const setMoviesGenres = genres => ({
    type: SET_MOVIES_GENRES,
    genres,
});
