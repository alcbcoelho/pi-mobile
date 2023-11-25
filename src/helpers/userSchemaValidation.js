import * as yup from 'yup';

export const userSchemaValidation = yup.object({
	cpf: yup.string().min(11).required('O CPF é obrigatório!'),
	firstName: yup.string().required('O nome é obrigatório!'),
	lastName: yup.string().required('O sobrenome é obrigatório!'),
	email: yup.string().email().required('O email é obrigatório!'),
	password: yup.string().min(8).required('A senha é obrigatória!'),
	confirm: yup.string().min(8).required('A confirmação de senha é obrigatória!'),
	phone: yup.number().min(11).required('O telefone é obrigatório!'),
});
