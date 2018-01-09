/**
 * Created by ilazaar on 08/01/2018.
 */

import axios from 'axios';
import {addSettings} from './actions/index'

export const fetchSettings =  (dispatch) =>
    axios
        .get('/v1/api/settings')
        .then(response => {
            console.log("load Settings", response);
            if(response.data.value){
                const data = JSON.parse(response.data.value);
                data.finishLoading = true;
                dispatch(addSettings(data));
            }
        });


export const saveSettings =  settings =>
    axios
        .post('/v1/api/settings',settings)
        .then(response => {
            console.log("save Settings", response);
        });



const settings = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SETTING':
            state = action.settings;
            console.log('ADD_SETTING', state);
            return state;
        default:
            return state
    }
};

export default settings