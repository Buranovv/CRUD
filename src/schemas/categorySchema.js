import * as yup from "yup";

const categorySchema = yup.object().shape({
  name: yup
    .string("This field must be string!")
    .required("Please fill this field!"),
  image: yup
    .string("This field must be string!")
    .url("This field must be valid url!"),
});

export default categorySchema;
