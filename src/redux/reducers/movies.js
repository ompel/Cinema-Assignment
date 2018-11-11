import {
    RESET_MOVIES,
    APPEND_MOVIES,
    SET_MOVIES_PAGE,
} from '../actionTypes';

const initalState = {
    list: [],
    moviesApiPage: 0,
    moviesNumberOfPages: 0,
    editModal: false,
    modalMovieData: {},
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

        default:
            return {
                ...state,
            };
    }
};
