import axios from "axios"

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

                    resolve(_arrayResponse);
                    return;
                }

                resolve(response?.data ?? [])
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
            const URL = `https://pixabay.com/api/videos/?key=27440636-7a14393f2e1371b973e28caf8&q=yellow+flowers&pretty=true`;
            axios.get(URL)
            .then(function (response) {
                const _data = response?.data?.hits ?? null;

                if(_data){
                    const _arrayResponse = _data.map((item, index) => {
                        const {id, userImageURL, videos} = item;
                        
                        let _videoRowObject = new Object();
                        _videoRowObject.id = id;
                        _videoRowObject.thumbnailURL = userImageURL;
                        _videoRowObject.fullVideoURL = videos?.medium?.url ?? null;
                        _videoRowObject.type = VIDEO_TYPE;

                        console.log(``);
                        console.log(`_videoRowObject: ${_videoRowObject.id}`);
                        console.log(_videoRowObject);
                        console.log(``);
                        console.log(``);
                        console.log(``);
                        console.log(``);

                        return _videoRowObject;                        
                    })     
                    
                    resolve(_arrayResponse);
                    return;
                }

                resolve(_data);
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