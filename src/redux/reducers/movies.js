import {
    APPEND_MOVIES,
    SET_MOVIES_PAGE,
    SET_MOVIES_GENRES,
} from '../actionTypes';

const initalState = {
    list: {},
    moviesApiPage: 0,
    moviesNumberOfPages: 0,
};

export default (state = initalState, action) => {
    switch (action.type) {
    case APPEND_MOVIES:
        return {
            ...state,
            list: { ...state.movies, ...action.movies },
        };

    case SET_MOVIES_PAGE:
        return {
            ...state,
            moviesApiPage: action.moviesApiPage,
            moviesNumberOfPages: action.moviesNumberOfPages,
        };
    
        case SET_MOVIES_GENRES:
        return {
            ...state,
            movieGenres: action.genres,
        };

    default:
        return {
            ...state,
        };
    }
};
