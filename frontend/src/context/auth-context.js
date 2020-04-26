import { createContext } from 'react';

export const AuthContext = createContext({
	isLoggedIn: false,
	isAdmin: false,
	username: '',
	token: null,
	login: () => {},
	logout: () => {},
});
