import * as yup from 'yup';

function transformPhoneValue(value) {
	const str = value.split(/\s|-/).join('');
	const increment = str.length === 10 ? 0 : 1;

	return `${str.slice(0, 2)} ${str.slice(2, 6 + increment)}-${str.slice(6 + increment, 10 + increment)}`;
}

export const userSchemaValidationObject = {
	firstName: yup.string().trim().required('O nome é obrigatório!'),
	lastName: yup.string().trim().required('O sobrenome é obrigatório!'),
	email: yup.string().email('O email deve estar no formato correto!').lowercase().required('O email é obrigatório!'),
	password: yup
		.string()
		.min(8, 'A senha deve conter ao menos uma letra maiúscula,\numa letra minúscula, um número e 8 caracteres!')
		.required('A senha é obrigatória!'),
	confirm: yup
		.string()
		.oneOf([yup.ref('password')], 'A confirmação deve coincidir com a senha!')
		.required('A confirmação de senha é obrigatória!'),
	phone: yup
		.string()
		.matches(
			/^\d{6,7}-\d{4}$|^\d{2}\s\d{1}\s\d{4,5}\s\d{4}$|^\d{2}\s\d{4,5}\s\d{4}$|^\d{2}\s\d{8,9}$|^\d{10,11}$|^\d{2}\s\d{4,5}-\d{4}$/,
			'O telefone deve ter entre 10 e 11 dígitos (DDD + número).'
		)
		.transform((value) => transformPhoneValue(value))
		.required('O telefone é obrigatório!'),
};

export const userSchemaValidation = yup.object({
	...userSchemaValidationObject,
});
