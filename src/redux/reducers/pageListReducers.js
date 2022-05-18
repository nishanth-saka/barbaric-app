import { GET_PAGE_LIST, SET_FOCUS_INDEX, SHOW_SEARCH_GRID } from '../../constants';
import { CURRENT_PAGE_NUMBER } from '../../constants';
import _ from 'lodash';

const initialState = {
    pageList: [],
    pageNumber: CURRENT_PAGE_NUMBER,
    focusIndex: [],
    showSearchGrid: false,
};

const pageListReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_FOCUS_INDEX:
            return{
                ...state,
                focusIndex:  action?.payload?.focusIndex,
            }

        case SHOW_SEARCH_GRID:
            return{
                ...state,
                showSearchGrid:  action?.payload?.showSearchGrid,
            }

        case GET_PAGE_LIST:
            const _newList =  action?.payload?.pageList  ?? [];
            let _updatedList = [...state.pageList, ..._newList];
        
            return {
                ...state,
                pageList:  _updatedList,
                pageNumber: state.pageNumber + 1
            };

        default:
            return state;
    }
}
export default pageListReducer