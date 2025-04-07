import cookie from 'cookie';
import database from "../models/db_test.js";

class LOGIN {
    authenticateUser = (email, password) => {
        const user = database.registered_users.find((user) => user.email === email && user.password === password);

        switch (user) {
            case undefined:
                console.log('Invalid username or password');
                return false;
                break;
            default:
                console.log('User authenticated');
                return true;
                break;
        }
        return false;
    }
    homepageAuthentication = (userId,sessionId) => {
        const user = database.registered_users.find((user) => user.sessionId === sessionId);
        
        switch (user) {
            case undefined:
                console.log('You are not authorized to view this page');
                return false;
                break;
            default:
                console.log('Welcome to the homepage');
                return true;
                break;
        }
        return false;
    }
    // 
    //
    generateSessionId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let sessionId = '';

        for (let i = 0; i < 32; i++) {
            sessionId += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return sessionId;
    }

    setCookie(name, value) {
        const cookieValue = cookie.serialize(name, value);
        return cookieValue;
    }
    registerUser(username, password, email) {
        const user = {
            username,
            password,
            email,
            sessionId: this.generateSessionId()
        };
        database.registered_users.push(user);
        console.log(database.registered_users);
        console.log("User registered successfully")
        const cookie =('sessionId', user.username+"%"+user.sessionId);
        return (cookie)
    }



}
const login = new LOGIN();
export default login;



