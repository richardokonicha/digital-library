import axios from 'axios';


export const LoginUser = (email, password, alwaysLoggedIn='true') => {
    return axios({
        method: 'POST',
        url: `${ process.env.API_URL }/authentication`,
        data: {
            'email': email,
            'password': password,
            'always_logged_in': alwaysLoggedIn
        }
    });
}
