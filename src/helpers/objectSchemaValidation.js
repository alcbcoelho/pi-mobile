import * as yup from 'yup';

export const objectSchemaValidation = yup.object({
	situation: yup.string().required('A situação do objeto é obrigatória!'),
	object: yup.string().required('O obejto é obrigatório!'),
	brand: yup.string().notRequired(),
	model: yup.string().notRequired(),
	color: yup.string().required('A cor predominante é obrigatória!'),
	characteristics: yup.string().notRequired(),
	place: yup.string().required('O local é obrigatório!'),
	date: yup.string().required('A data obrigatória!'),
	time: yup.string().required('O horário é obrigatório!'),
	info: yup.string().notRequired(),
});
