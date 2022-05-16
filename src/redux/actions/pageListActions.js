
import { GET_PAGE_LIST } from "../../constants";
import showLoaderAction from "./showLoaderAction";
import { getImagesFromAPI, getVideosFromAPI } from '../../services';

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

            getVideosFromAPI(params)
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