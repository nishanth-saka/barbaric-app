import axios from "axios"
import _ from 'lodash';

import { IMAGE_TYPE, VIDEO_TYPE } from '../constants';

const ENDPOINT = 'https://api.unsplash.com/photos';
const CLIENTID = 'X9be62huMcBO_B-fPaMu2GbDGr4I-IzCqpJJMq2O750';

const getImagesFromAPI = (params) => {
    return new Promise((resolve, reject) => {
        try {
            const URL = `${ENDPOINT}?page=${params?.pageNumber ?? 20}&client_id=${CLIENTID}`;
            axios.get(URL)
            .then(function (response) {
                if(response?.data?.length > 0){
                    const _data = response.data;
                    const _arrayResponse = _data.map((item, index) => {
                        const {id, urls} = item;
                        
                        const {full, small} = urls;

                        let _imageRowObject = new Object();
                        _imageRowObject.id = id;
                        _imageRowObject.thumbnailURL = small;
                        _imageRowObject.fullImageURL = full;
                        _imageRowObject.type = IMAGE_TYPE;

                        return _imageRowObject;

                    })

                    // resolve(_arrayResponse);
                    getVideosFromAPI(params)
                    .then((res) => {
                        const _resultArray = [..._.slice(_arrayResponse, _arrayResponse.length - 5, _arrayResponse.length), ...res];   

                        resolve(_.sortBy(_resultArray, ['id']));
                    })
                    .catch(function (error) {
                        console.log(``);
                        console.log(`respageList Ex`);
                        console.log(error);
                        console.log(``);        
                        reject(error);        
                    }); 
                    return;
                }
            })
            .catch(function (error) {
                console.log(``);
                console.log(`respageList Ex`);
                console.log(error);
                console.log(``);        
                reject(error);        
            }); 
        } catch (error) {
            console.log(``);
            console.log(`respageList Ex`);
            console.log(error);
            console.log(``);   
            reject(error);
        }
    })
}

const getVideosFromAPI = (params) => {
    return new Promise((resolve, reject) => {
        try {
            //https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLGaYlBJIOoa8lg4z5S3bJEDOTDHltsYQZ}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${AIzaSyDKQzav3jNSTn3OdZhrOTEgFvaHgUrEjkg}
            const URL = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${'PLGaYlBJIOoa8lg4z5S3bJEDOTDHltsYQZ'}&maxResults=${5}&part=snippet%2CcontentDetails&key=${'AIzaSyDKQzav3jNSTn3OdZhrOTEgFvaHgUrEjkg'}`;
            axios.get(URL)
            .then(function (response) {
              
                const _data = response?.data?.items ?? null;

                console.log(``);
                console.log(`response response`);
                console.log(URL);
                console.log(``);   

                if(_data){
                    const _arrayResponse = _data.map((item, index) => {
                        const {id, contentDetails} = item;
                        let _videoRowObject = new Object();
                        _videoRowObject.id = _.random(1000000);
                        _videoRowObject.thumbnailURL = `https://img.youtube.com/vi/${contentDetails.videoId}/default.jpg`;
                        _videoRowObject.fullVideoURL = contentDetails.videoId;
                        _videoRowObject.type = VIDEO_TYPE;                        

                        return _videoRowObject;                        
                    })     
                    
                    resolve(_arrayResponse);
                    return;
                }
            })
            .catch(function (error) {
                console.log(``);
                console.log(`respageList Ex`);
                console.log(error);
                console.log(``);        
                reject(error);        
            }); 
        } catch (error) {
            console.log(``);
            console.log(`respageList Ex`);
            console.log(error);
            console.log(``);   
            reject(error);
        }
    })
}

module.exports = {
    getImagesFromAPI,
    getVideosFromAPI
}