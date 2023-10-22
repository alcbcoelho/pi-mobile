import * as yup from 'yup';

export const recoverSchemaValidation = yup.object({
	email: yup.string().email('Informe um email válido').required('O email é obrigatório!'),
});
