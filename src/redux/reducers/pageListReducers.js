import { GET_PAGE_LIST } from '../../constants';
import { CURRENT_PAGE_NUMBER } from '../../constants';
import _ from 'lodash';

const initialState = {
    pageList: [],
    pageNumber: CURRENT_PAGE_NUMBER
};

const pageListReducer = (state = initialState, action) => {
    switch(action.type) {
    case GET_PAGE_LIST:
        const _newList =  action?.payload?.pageList  ?? [];
        const _pgNumber = action?.payload?.pageNumber ?? CURRENT_PAGE_NUMBER;
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