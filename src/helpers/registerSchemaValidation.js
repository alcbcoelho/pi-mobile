import * as yup from "yup";
import { userSchemaValidationObject } from "./userSchemaValidation";

function transformCPFValue(value) {
  return !value.includes(".") && !value.includes("-")
    ? `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
        6,
        9
      )}-${value.slice(9, 11)}`
    : value;
}

export const registerSchemaValidation = yup.object({
  cpf: yup
    .string()
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
      "O CPF deve seguir o formato XXX.XXX.XXX-XX."
    )
    .transform((value) => transformCPFValue(value))
    .required("O CPF é obrigatório!"),
    ...userSchemaValidationObject
});
