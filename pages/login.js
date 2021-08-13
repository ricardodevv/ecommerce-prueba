import Layout from "../components/Layout";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const LoginContainer = styled.div`
  height: 55em;
`;

const LoginForm = styled.div`
  border: 1px solid black;
  height: 100%;
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => console.log(data, e);

  return (
    <Layout>
      <LoginContainer>
        <LoginForm>
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="inputFields"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <p className="errorMsg">Please enter your email.</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="errorMsg">Email is not valid.</p>
            )}

            <input
              className="inputFields"
              placeholder="Password"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && errors.password.type === "required" && (
              <p className="errorMsg">Password is required.</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="errorMsg">
                Password should be at-least 6 characters.
              </p>
            )}

            <input className="submitBtn" type="submit" value="Login" />
          </form>
        </LoginForm>
      </LoginContainer>
    </Layout>
  );
};

export default Login;
