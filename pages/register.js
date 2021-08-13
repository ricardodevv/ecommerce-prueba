import Layout from "../components/Layout";
import styled from "styled-components";
import { useForm } from "react-hook-form";
//import dogsupreme from "../public/dogsupreme.jpg";

const Container = styled.div`
  background-color: blueviolet;
  height: 50em;
  display: flex;
  margin-top: 5em;
  font-family: Rubik;

  h1 {
    font-family: RubikMedium;
    font-size: 5rem;
    padding: 3rem;
  }

  form {
    padding: 0 3rem;
    display: flex;
    flex-direction: column;
    margin: auto;

    .inputFields {
      margin: 1em 0;
      padding: 1rem 1rem 0.5rem 0.5rem;
      width: 60%;
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
    margin-top: 1rem;

    &:hover {
      color: white;
      background-color: black;
    }
  }

  .register_image {
    flex: 1;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const RegisterForm = styled.div`
  width: 60%;
  background-color: white;

  .errorMsg {
    color: red;
  }
`;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => console.log(data, e);

  return (
    <Layout>
      <Container>
        <RegisterForm>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="inputFields"
              placeholder="First Name"
              {...register("firstName", {
                required: true,
                maxLength: 20,
              })}
            />

            {errors.firstName && errors.firstName.type === "required" && (
              <p className="errorMsg">First Name is required.</p>
            )}

            <input
              className="inputFields"
              placeholder="Last Name"
              {...register("lastName", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
            />

            {errors.lastName && errors.lastName.type === "required" && (
              <p className="errorMsg">Last Name is required.</p>
            )}

            <input
              className="inputFields"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <p className="errorMsg">Email is required.</p>
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

            <input
              className="inputFields"
              placeholder="Confirm password"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
            />

            <input className="submitBtn" type="submit" value="Register" />
          </form>
        </RegisterForm>
        <div className="register_image">
          <img src="/dogsupreme.jpg" alt="dog supreme" />
        </div>
      </Container>
    </Layout>
  );
};

export default Register;
