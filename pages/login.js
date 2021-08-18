import Layout from "../components/Layout";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const LoginContainer = styled.div`
  height: 50em;
  width: 100%;
  display: flex;
  margin-top: 5em;
  font-family: Rubik;
  justify-content: center;

  h1 {
    font-family: RubikMedium;
    font-size: 5rem;
    padding: 3rem;
    text-align: center;
  }

  .submitBtn {
    width: 15rem;
    align-self: center;
    background-color: white;
    border: 2px solid black;
    height: 4rem;
    border-radius: 3em;
    transition: 0.2s;
    font-size: larger;
    cursor: pointer;
    margin: 4rem auto;

    &:hover {
      color: white;
      background-color: black;
    }
  }
`;

const LoginForm = styled.div`
  height: 100%;
  max-width: 50rem;
  width: 100%;

  form {
    padding: 0 3rem;
    display: flex;
    flex-direction: column;
    margin: 2rem auto;
    justify-content: center;

    .inputFields {
      margin: 1em 0;
      padding: 1rem 1rem 0.5rem 0.5rem;
      border: 2px solid white;
      transition: 0.3s;
      font-size: 1.5rem;
      font-family: Rubik;

      &:hover {
        border-bottom: 2px solid #00000073;
      }

      &:focus {
        border: 2px solid white;
        border-bottom: 2px solid #ea5800;
        outline: none;
      }
    }

    .errorMsg {
      color: red;
    }
  }
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
