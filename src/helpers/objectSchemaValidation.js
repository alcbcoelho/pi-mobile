import * as yup from 'yup';

function capitalizeFirstLetter(value) {
	const capitalizedFirstLetter = value.slice(0, 1).toUpperCase();
	const rest = value.slice(1, value.length);

	return capitalizedFirstLetter + rest;
}

export const objectSchemaValidation = yup.object({
	situation: yup.string().required('A situação do objeto é obrigatória!'),
	objectType: yup
		.string()
		.trim()
		.transform((value) => capitalizeFirstLetter(value))
		.required('O objeto é obrigatório!'),
	brand: yup
		.string()
		.trim()
		.transform((value) => capitalizeFirstLetter(value))
		.notRequired(),
	model: yup.string().trim().notRequired(),
	color: yup
		.string()
		.trim()
		.transform((value) => capitalizeFirstLetter(value))
		.required('A cor predominante do objeto é obrigatória!'),
	characteristics: yup.string().trim().notRequired(),
	place: yup
		.string()
		.trim()
		.transform((value) => capitalizeFirstLetter(value))
		.required('O local é obrigatório!'),
	datetime: yup.string().required('A data e o horário são obrigatórios!'),
	info: yup
		.string()
		.trim()
		.transform((value) => capitalizeFirstLetter(value))
		.notRequired(),
});
