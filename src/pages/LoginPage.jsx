import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import  loginSchema  from "../schemas/loginSchema";
import axios from "axios";
import { TOKEN } from "../const";
import PropTypes from "prop-types";
import "../css/loginPage.css";

const LoginPage = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        let {
          data: { token },
        } = await axios.post("https://reqres.in/api/login", values);
        localStorage.setItem(TOKEN, token);
        setIsLogin(true);
        navigate("/");
      } catch (err) {
        toast.error(err.response.data.error);
      }
      //   console.log(values);
    },
  });

  //   const submit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const login = {
  //         email: e.target.email.value,
  //         password: e.target.password.value,
  //       };

  //       const isValid = await loginSchema.isValid(login);
  //       const validLogin = await loginSchema.validate(login);
  //       console.log(isValid);
  //       console.log(validLogin);
  //       navigate("/");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <Fragment>
      <div className="login">
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="text"
              id="email"
              placeholder="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-danger">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              id="password"
              placeholder="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-danger">{formik.errors.password}</p>
            ) : null}
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};

LoginPage.propTypes = {
  setIsLogin: PropTypes.func,
};

export default LoginPage;
