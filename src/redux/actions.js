import {
    RESET_MOVIES,
    SET_MOVIES_PAGE,
    EDIT_MOVIE_INFO,
    DELETE_MOVIE,
    ADD_MOVIE,
    OPEN_MOVIE_MODAL,
    CLOSE_MOVIE_MODAL,
} from './actionTypes';

export const resetMovies = () => ({
    type: RESET_MOVIES,
});

export const setMoviesPage = (moviesApiPage, moviesNumberOfPages) => ({
    type: SET_MOVIES_PAGE,
    moviesApiPage,
    moviesNumberOfPages,
});

export const openMovieModal = movie => ({
    type: OPEN_MOVIE_MODAL,
    movie,
});

export const closeMovieModal = () => ({
    type: CLOSE_MOVIE_MODAL,
});

export const addMovie = movie => ({
    type: ADD_MOVIE,
    movie,
});

export const editMovieInfo = (id, movie) => ({
    type: EDIT_MOVIE_INFO,
    id,
    movie,
});

export const deleteMovieByID = id => ({
    type: DELETE_MOVIE,
    id,
});
