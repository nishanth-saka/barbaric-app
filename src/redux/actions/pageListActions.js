
import { GET_PAGE_LIST, SET_FOCUS_INDEX } from "../../constants";
import showLoaderAction from "./showLoaderAction";
import { getImagesFromAPI, getVideosFromAPI } from '../../services';

export function setRowIndex(focusIndex) {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: SET_FOCUS_INDEX,
                payload: {
                        focusIndex
                    },
                });
        }, 300);
    }

}

export function setPageList(pageList, pageNumber) {
    return {
        type: GET_PAGE_LIST,
        payload: {
                pageList,
                pageNumber
            },
        };
}

export function getPageList(params) {
    return async (dispatch) => {
        try {
            dispatch(showLoaderAction(true));

            getImagesFromAPI(params) //getVideosFromAPI(params)
            .then((res) => {
                dispatch(setPageList(res, params?.pageNumber));
                dispatch(showLoaderAction(false));
            })
            .catch((ex) => {
                console.log(``);
                console.log(`ex: `);
                console.log(ex);
                console.log(``);
            })
            
        } catch (error) {
            console.log(``);
            console.log('getPageList: error');
            console.log(error);
            console.log(``);
            
        }
    };
}