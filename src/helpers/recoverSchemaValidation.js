import * as yup from "yup";

export const recoverSchemaValidation = yup.object({
  email: yup
    .string()
    .email("O email deve estar no formato correto.")
    .required("O email é obrigatório!"),
});
