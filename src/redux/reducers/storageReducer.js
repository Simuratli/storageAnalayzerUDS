import { FETCH_ITEM_SIZES, SET_SHOW_TOTAL_SIZE, SET_SIZE_MB, FETCH_TABLE_HEADERS, GET_LENGTH, COUNT, OPEN_CLOSE_ERROR, SET_ERROR } from '../actions'

const initialState = {
    tableSizes: null,
    tableHead: true,
    length: null,
    count: 0,
    open: false,
    error: null,
    mb: 0,
    showSize:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEM_SIZES:
            return {
                ...state, tableSizes: action.tableSizes
            }
        case FETCH_TABLE_HEADERS:
            return {
                ...state, tableHead: action.tableHead
            }
        case GET_LENGTH:
            return {
                ...state, length: action.length
            }
        case COUNT:
            return {
                ...state, count: action.count
            }
        case OPEN_CLOSE_ERROR:
            return {
                ...state, open: !state.open
            }
        case SET_ERROR:
            return {
                ...state, error: action.error
            }
        case SET_SIZE_MB:
            return {
                ...state, mb: action.mb
            }
        case SET_SHOW_TOTAL_SIZE:
            return {
                ...state, showSize: action.showSize
            }
        default:
            return state
    }
}




export default reducer