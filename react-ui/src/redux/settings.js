/**
 * Created by ilazaar on 08/01/2018.
 */

import axios from 'axios';
import {addSettings} from './actions/index'

export const fetchSettings =  (dispatch) =>
    axios
        .get('/v1/api/settings')
        .then(response => {
            if(response.data.value){
                const data = JSON.parse(response.data.value);
                data.finishLoading = true;
                dispatch(addSettings(data));
            }
            else{
                dispatch(addSettings({finishLoading:true}));
            }
        }).catch(error => {
            console.log("Error getting Settings", error);
            const data = {finishLoading : true, error:error};
            dispatch(addSettings(data));
        });


export const saveSettings =  (settings) =>
    axios
        .post('/v1/api/settings',settings);



const settings = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SETTING':
            state = action.settings;
            return state;
        default:
            return state
    }
};

export default settings