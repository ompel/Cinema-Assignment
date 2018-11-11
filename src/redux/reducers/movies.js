import {
    RESET_MOVIES,
    SET_MOVIES_PAGE,
    EDIT_MOVIE_INFO,
    DELETE_MOVIE,
    ADD_MOVIE,
    OPEN_MOVIE_MODAL,
    CLOSE_MOVIE_MODAL,
} from '../actionTypes';


const initalState = {
    list: [],
    moviesApiPage: 0,
    moviesNumberOfPages: 0,
    movieModal: false,
    selectedModalMovie: {},
};

const insertItem = (array, action) => {
    return [
        ...array.slice(0, action.id),
        action.movie,
        ...array.slice(action.id + 1),
    ];
};

const deleteItem = (array, action) => {
    return [
        ...array.slice(0, action.id),
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

        case SET_MOVIES_PAGE:
            return {
                ...state,
                moviesApiPage: action.moviesApiPage,
                moviesNumberOfPages: action.moviesNumberOfPages,
            };
        
        case OPEN_MOVIE_MODAL:
            return {
                ...state,
                movieModal: true,
                selectedModalMovie: action.movie || {},
            };

        case CLOSE_MOVIE_MODAL:
            return {
                ...state,
                movieModal: false,
                selectedModalMovie: {},
            };

        case ADD_MOVIE:
            let movie = action.movie;
            movie.title.replace(/[^\w\s]/gi, '').replace(/\b\w/g, l => l.toUpperCase());
            return {
                ...state,
                list: insertItem(state.list, { id: state.list.length, movie: movie }),
            };

        case EDIT_MOVIE_INFO:
            return {
                ...state,
                list: insertItem(state.list, action),
            };

        case DELETE_MOVIE:
            return {
                ...state,
                list: deleteItem(state.list, action),
            };

        default:
            return {
                ...state,
            };
    }
};
