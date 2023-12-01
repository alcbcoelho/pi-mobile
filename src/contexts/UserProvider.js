import { createContext, useState, useEffect } from 'react';
import { findUser, updateUser, uploadUserAvatar } from '../services/userServices';
import { findUserItems } from '../services/objectService';
import { findUserMatches } from '../services/notificationServices';

export const UserContext = createContext();

export default function UserProvider({ children }) {
	const [userData, setUserData] = useState({});
	const [userItems, setUserItems] = useState([]);
	const [userMatches, setUserMatches] = useState([]);
	// const [shouldRefresh, setShouldRefresh] = useState(false);
	const controller = new AbortController();

	useEffect(() => {
		const loadInformation = async () => {
			await getUserData();
			await getUserItems();
			await getUserMatches();
		};

		loadInformation();
		return () => controller.abort();
	}, []);

	// useEffect(() => {
	// 	loadInformation();
	// 	return () => controller.abort();
	// }, [shouldRefresh]);

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

	const updateUserItems = async (option, data) => {
		switch (option) {
			case 'create':
				getUserItems();
				break;
			case 'update':
				getUserItems();
				break;
			case 'upload':
				getUserItems();
				break;
			default:
				break;
		}
	};

	const UserContextValues = {
		userData,
		userItems,
		userMatches,
		getUserData,
		getUserItems,
		getUserMatches,
		updateUserData,
		updateUserItems,
		// setShouldRefresh,
	};

	return <UserContext.Provider value={UserContextValues}>{children}</UserContext.Provider>;
}
