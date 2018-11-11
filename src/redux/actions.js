import {
    RESET_MOVIES,
    APPEND_MOVIES,
    SET_MOVIES_PAGE,
    EDIT_MOVIE_INFO,
    DELETE_MOVIE,
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

export const editMovieInfo = (id, movie) => ({
    type: EDIT_MOVIE_INFO,
    id,
    movie,
});

export const deleteMovie = movie => ({
    type: DELETE_MOVIE,
    movie,
});
