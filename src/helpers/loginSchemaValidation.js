import * as yup from "yup";

export const loginSchemaValidation = yup.object({
  email: yup
    .string()
    .email("Informe um email válido")
    .lowercase()
    .required("O email é obrigatório!"),
  password: yup.string().required("A senha é obrigatória!"),
});