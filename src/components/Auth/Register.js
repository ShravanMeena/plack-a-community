import React, { Component } from "react";
import firebase from "../../firebase";
import md5 from "md5";
import { Grid, Form, Button, Image, Icon, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users"),
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("user saved");
              });
            })
            .catch((err) => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false,
              });
            });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading,
    } = this.state;

    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          justifyContent: "center",
        }}>
        <Grid divided='vertically' centered>
          <Grid.Row columns={2}>
            <Grid.Column style={{ backgroundColor: "#F3F4F6", padding: 100 }}>
              <header>
                <h1 style={{ fontSize: 40, color: "#2185d0" }}>
                  <Link to='/'>
                    <Icon name='fire' color='#2185d0' />
                    Plack
                  </Link>
                </h1>

                <p
                  style={{
                    fontSize: 18,
                    opacity: 0.5,
                    width: "70%",
                    marginBottom: 20,
                  }}>
                  A central hub where teams can work, plan and achieve amazing
                  things together.
                </p>
              </header>
              <Image src='https://joinup.qodeinteractive.com/wp-content/uploads/2020/12/h2-rev-img-40.png' />
            </Grid.Column>
            <Grid.Column style={{ padding: 100 }}>
              <p
                style={{
                  fontSize: 18,
                  opacity: 0.5,
                  textTransform: "uppercase",
                }}>
                Start For Free
              </p>
              <h1>Sign up to Plack</h1>
              <p>
                <span style={{ fontSize: 18, opacity: 0.5 }}>
                  Already a member?{" "}
                </span>
                <span style={{ opacity: 1, fontSize: 18 }}>
                  <Link to='./login'>Log in</Link>
                </span>
              </p>

              {errors.length > 0 && (
                <Message error>{this.displayErrors(errors)}</Message>
              )}

              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  fluid
                  name='username'
                  icon='user'
                  iconPosition='right'
                  placeholder='Username'
                  onChange={this.handleChange}
                  value={username}
                  type='text'
                  size='huge'
                />

                <Form.Input
                  fluid
                  name='email'
                  icon='mail'
                  iconPosition='right'
                  placeholder='name@gmail.com'
                  onChange={this.handleChange}
                  value={email}
                  className={this.handleInputError(errors, "email")}
                  type='email'
                  size='huge'
                />

                <Form.Input
                  fluid
                  name='password'
                  icon='lock'
                  iconPosition='right'
                  placeholder='6 + Character long password'
                  onChange={this.handleChange}
                  value={password}
                  className={this.handleInputError(errors, "password")}
                  type='password'
                  size='huge'
                />

                <Form.Input
                  fluid
                  name='passwordConfirmation'
                  icon='repeat'
                  iconPosition='right'
                  placeholder='Password Confirmation'
                  onChange={this.handleChange}
                  value={passwordConfirmation}
                  className={this.handleInputError(errors, "password")}
                  type='password'
                  size='huge'
                />

                <Button
                  disabled={loading}
                  primary
                  className={loading ? "loading" : ""}
                  fluid
                  size='huge'>
                  Create an account
                </Button>
                <div style={{ marginTop: 10 }}></div>
                <Button fluid size='huge' disabled>
                  <Icon name='google' color='#2185d0' />
                  Sign up with google
                </Button>

                <p style={{ marginTop: 100 }}>
                  <span style={{ fontSize: 14, opacity: 0.5 }}>
                    This site is protected by reCAPTCHA and the google{" "}
                  </span>
                  <span style={{ opacity: 1, fontSize: 14 }}>
                    <Link to='#'>Privacy Policy</Link>
                  </span>{" "}
                  <span style={{ fontSize: 14, opacity: 0.5 }}>and</span>{" "}
                  <span style={{ opacity: 1, fontSize: 14 }}>
                    <Link to='#'>Terms of services </Link>
                  </span>{" "}
                  <span style={{ fontSize: 14, opacity: 0.5 }}>apply</span>
                </p>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
