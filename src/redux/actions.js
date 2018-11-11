import {
    RESET_MOVIES,
    APPEND_MOVIES,
    SET_MOVIES_PAGE,
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
