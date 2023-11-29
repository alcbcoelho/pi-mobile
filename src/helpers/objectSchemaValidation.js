import * as yup from "yup";

function capitalizeFirstLetter(value) {
  const capitalizedFirstLetter = value.slice(0, 1).toUpperCase();
  const rest = value.slice(1, value.length);

  return capitalizedFirstLetter + rest;
}

function transformCharacteristics(value) {
  return value
    .split(/\s*,\s*/)
    .map((characteristic) => capitalizeFirstLetter(characteristic))
    .join();
}

export const objectSchemaValidation = yup.object({
  situation: yup.string().required("A situação do objeto é obrigatória!"),
  object: yup
    .string()
    .trim()
    .transform((value) => capitalizeFirstLetter(value))
    .required("O objeto é obrigatório!"),
  brand: yup.string().trim().notRequired(),
  model: yup.string().trim().notRequired(),
  color: yup
    .string()
    .trim()
    .transform((value) => capitalizeFirstLetter(value))
    .required("A cor predominante do objeto é obrigatória!"),
  characteristics: yup
    .string()
    .trim()
    .transform((value) => transformCharacteristics(value))
    .notRequired(),
  place: yup
    .string()
    .trim()
    .transform((value) => capitalizeFirstLetter(value))
    .required("O local é obrigatório!"),
  date: yup.string().required("A data é obrigatória!"),
  time: yup.string().required("O horário é obrigatório!"),
  info: yup.string().trim().notRequired(),
});