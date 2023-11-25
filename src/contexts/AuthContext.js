import { createContext, useState } from 'react';
import { signIn, signOut, signUp } from '../services/authServices';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({ loggedIn: false });
	const [error, setError] = useState('');

	const login = async (credential, password) => {
		try {
			await signIn(credential, password);
			setUser({ credential, loggedIn: true });
			setError('');
		} catch (e) {
			console.error('Client Error:', e);
			setError(e.message);
		}
	};

	const logout = async () => {
		try {
			await signOut();
			setUser({ credential: null, loggedIn: false });
			setError('');
		} catch (e) {
			console.error('Client Error:', e);
			setError(e.message);
		}
	};

	const register = async (cpf, email, password, firstName, lastName, phone) => {
		try {
			await signUp(cpf, email, password, firstName, lastName, phone);
			setUser({ email, loggedIn: true });
			setError('');
		} catch (e) {
			console.error('Client Error:', e);
			setError(e.message);
		}
	};

	const authContextValues = {
		user,
		error,
		login,
		logout,
		register,
	};

	return <AuthContext.Provider value={authContextValues}>{children}</AuthContext.Provider>;
}
