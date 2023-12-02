import { createContext, useState, useEffect } from 'react';

// Services
import { findUser, updateUser, uploadUserAvatar } from '../services/userServices';
import { findUserItems } from '../services/objectService';
import { findUserMatches } from '../services/notificationServices';

// Hooks
import useAuth from '../hooks/useAuth';

export const UserContext = createContext();

export default function UserProvider({ children }) {
	const { userAuth } = useAuth();
	const [userData, setUserData] = useState({});
	const [userItems, setUserItems] = useState([]);
	const [userMatches, setUserMatches] = useState([]);
	const controller = new AbortController();

	useEffect(() => {
		const loadInformation = async () => {
			await getUserData();
			await getUserItems();
			await getUserMatches();
		};

		if (userAuth.isAuthenticated) loadInformation();
		return () => controller.abort();
	}, [userAuth]);

	const getUserData = async () => {
		const userData = await findUser();
		setUserData(userData);
	};

	const getUserItems = async () => {
		const userItems = await findUserItems();
		setUserItems(userItems);
	};

	const getUserMatches = async () => {
		const userMatches = await findUserMatches();
		setUserMatches(userMatches);
	};

	const updateUserData = async (data, avatar = false) => {
		if (avatar) {
			const userData = await uploadUserAvatar(data);
			setUserData(userData);
		} else {
			const userData = await updateUser(data);
			setUserData(userData);
		}
	};

	// const updateUserItems = async (option, data) => {
	// 	switch (option) {
	// 		case 'create':
	// 			getUserItems();
	// 			break;
	// 		case 'update':
	// 			getUserItems();
	// 			break;
	// 		case 'upload':
	// 			getUserItems();
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// };

	const UserContextValues = {
		userData,
		userItems,
		userMatches,
		getUserData,
		getUserItems,
		getUserMatches,
		updateUserData,
		// updateUserItems,
	};

	return <UserContext.Provider value={UserContextValues}>{children}</UserContext.Provider>;
}
