import { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api } from '../config/axiosConfig';
import endpoints from '../config/endpoints';
import axios from 'axios';

export const AuthContext = createContext();
const SECURE_STORE_KEY = 'accessJWT';

export default function AuthProvider({ children }) {
	const [userAuth, setUserAuth] = useState({ accessToken: null, isAuthenticated: false });
	const [error, setError] = useState('');
	// const controller = new AbortController();

	console.log(userAuth);

	// useEffect(() => {
	// 	const loadToken = async () => {
	// 		// TODO: implementar refresh token
	// 		const accessToken = await SecureStore.getItemAsync(SECURE_STORE_KEY);

	// 		if (accessToken) {
	// 			api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
	// 			setUserAuth({ accessToken, isAuthenticated: true });
	// 		}
	// 	};

	// 	loadToken();
	// 	return () => controller.abort();
	// }, []);

	const logout = async () => {
		try {
			// const res = await api.get(endpoints.SIGNOUT_URL);
			api.defaults.headers.common['Authorization'] = '';
			await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
			setUserAuth({ accessToken: null, isAuthenticated: false });
			setError('');
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.error(e.response?.data);
				setError(e.response?.data?.message);
			} else {
				console.error('AuthContext:', e);
			}
		}
	};

	const login = async (data) => {
		try {
			const res = await api.post(endpoints.SIGNIN_URL, JSON.stringify(data));
			if (res?.data?.access_token) {
				api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
				await SecureStore.setItemAsync(SECURE_STORE_KEY, res.data.access_token);
				setUserAuth({ accessToken: res.data.access_token, isAuthenticated: true });
				setError('');
				return true;
			}
			return false;
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.error(e.response?.data);
				setError(e.response?.data?.message);
			} else {
				console.error('AuthContext:', e);
			}
			return false;
		}
	};

	const register = async (data) => {
		try {
			const res = await api.post(endpoints.SIGNUP_URL, JSON.stringify(data));
			if (res?.data?.access_token) {
				api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
				await SecureStore.setItemAsync(SECURE_STORE_KEY, res.data.access_token);
				setUserAuth({ accessToken: res.data.access_token, isAuthenticated: true });
				setError('');
				return true;
			}
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.error(e.response?.data);
				setError(e.response?.data?.message);
			} else {
				console.error('AuthContext:', e);
			}
		}
	};

	const reset = async (data) => {
		try {
			const res = await api.post(endpoints.RESET_URL, JSON.stringify(data));
			if (res?.data?.access_token) {
				api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
				await SecureStore.setItemAsync(SECURE_STORE_KEY, res.data.access_token);
				setUserAuth({ accessToken: res.data.access_token, isAuthenticated: true });
				setError('');
				return true;
			}
			return false;
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.error(e.response?.data);
				setError(e.response?.data?.message);
			} else {
				console.error('AuthContext:', e);
			}
			return false;
		}
	};

	const authContextValues = {
		error,
		userAuth,
		login,
		logout,
		register,
		reset,
	};

	return <AuthContext.Provider value={authContextValues}>{children}</AuthContext.Provider>;
}
