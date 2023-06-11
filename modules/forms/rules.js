import * as yup from "yup";

const requiredRule = yup.string().required.bind(yup.string());
yup.addMethod(
  yup.string,
  "required",
  function required(msg = () => "Verplicht veld") {
    if (typeof msg !== "function") {
      return requiredRule();
    }
    return requiredRule(msg());
  }
);
