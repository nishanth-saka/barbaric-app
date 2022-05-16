import { SET_APP_LOADER } from '../../constants'

export function showLoaderAction (show){
    return{
        type: SET_APP_LOADER,
        payload: {show}
    }
}

export default showLoaderAction;