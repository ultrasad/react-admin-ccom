// in src/authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        /*
        const { username } = params;
        localStorage.setItem('username', username);
        // accept all username/password combinations
        return Promise.resolve();
        */

       const { username, password } = params;

       if(!username.match(/Super(\d+)/)){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        return Promise.reject('สำหรับ Super User เท่านั้น');
       }

       const request = new Request('http://172.22.228.225/membermanagement/login_member_ccom', {
           method: 'POST',
           body: JSON.stringify({ username, password }),
           headers: new Headers({ 'Content-Type': 'application/json' }),
           //body: bodyFormData,
           //headers: new Headers({'Content-Type' : 'multipart/form-data; charset=UTF-8'}),
       })
       return fetch(request)
           .then(response => {
               if (response.status < 200 || response.status >= 300) {
                   throw new Error(response.statusText);
               }
               return response.json();
           })
           .then(({ token, msg, status }) => {
               console.log('token => ' + token + ', msg => ' + msg + ', status => ' + status);
               if(status === 'success' && token !== undefined){
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
               } else {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                return Promise.reject(msg);
               }

               return Promise.resolve();
           });
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unknown method');
};
