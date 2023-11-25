import { createContext, useState } from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');

	const handleError = (error) => {
		if (!error) return;
		if (!error?.response) setErrorMsg('Sem resposta do servidor!');
		if (error.response?.status === 400) setErrorMsg(`${error.response?.data?.Error}`);
		if (error.response?.status === 404) setErrorMsg(`${error.response?.data?.Error}`);
		if (error.response?.status === 505) setErrorMsg('Algo deu errado!');
		// setTimeout(() => setErrorMsg(''), 3000);
	};

	const handleSuccess = (success) => {
		if (!success) return;
		setSuccessMsg(success);
		// setTimeout(() => setSuccessMsg(''), 3000);
	};

	const messageContextValues = {
		errorMsg,
		setErrorMsg,
		handleError,
		successMsg,
		setSuccessMsg,
		handleSuccess,
	};

	return <MessageContext.Provider value={messageContextValues}>{children}</MessageContext.Provider>;
};
