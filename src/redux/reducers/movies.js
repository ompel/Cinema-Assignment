import {
    RESET_MOVIES,
    APPEND_MOVIES,
    SET_MOVIES_PAGE,
    EDIT_MOVIE_INFO,
    DELETE_MOVIE,
} from '../actionTypes';
import _ from 'lodash';

const initalState = {
    list: [],
    moviesApiPage: 0,
    moviesNumberOfPages: 0,
};

const insertItem = (array, action) => {
    return [
        ...array.slice(0, action.id),
        action.movie,
        ...array.slice(action.id + 1),
    ];
};

export default (state = initalState, action) => {
    switch (action.type) {
        case RESET_MOVIES:
            return {
                ...state,
                list: [],
            };

        case APPEND_MOVIES:
            return {
                ...state,
                list: [...state.list, ...action.movies],
            };

        case SET_MOVIES_PAGE:
            return {
                ...state,
                moviesApiPage: action.moviesApiPage,
                moviesNumberOfPages: action.moviesNumberOfPages,
            };

        case EDIT_MOVIE_INFO:
            return {
                ...state,
                list: insertItem(state.list, action),
            };

        case DELETE_MOVIE:
            return {
                ...state
            };

        default:
            return {
                ...state,
            };
    }
};
