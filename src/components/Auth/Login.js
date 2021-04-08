import React, { Component } from "react";
import firebase from "../../firebase";
import { Grid, Form, Button, Image, Icon, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          console.log(signedInUser);
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

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    const { email, password, errors, loading } = this.state;

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
            <Grid.Column style={{ padding: 100 }}>
              <p
                style={{
                  fontSize: 18,
                  opacity: 0.5,
                  textTransform: "uppercase",
                }}>
                Start For Free
              </p>
              <h1>Log in to Plack</h1>
              <p>
                <span style={{ fontSize: 18, opacity: 0.5 }}>
                  Don't have an account?{" "}
                </span>
                <span style={{ opacity: 1, fontSize: 18 }}>
                  <Link to='./register'>Sign up</Link>
                </span>
              </p>

              {errors.length > 0 && (
                <Message error>{this.displayErrors(errors)}</Message>
              )}

              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  fluid
                  name='email'
                  icon='mail'
                  iconPosition='right'
                  placeholder='Email'
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
                  placeholder='Password'
                  onChange={this.handleChange}
                  value={password}
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
                  Login
                </Button>
                <div style={{ marginTop: 10 }}></div>
                <Button fluid size='huge' disabled>
                  <Icon name='google' color='#2185d0' />
                  Log in with google
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

            <Grid.Column style={{ backgroundColor: "#F3F4F6", padding: 100 }}>
              <header>
                <h1 style={{ fontSize: 40, color: "#2185d0" }}>
                  <Link to='/'>
                    <Icon name='fire' color='#2185d0' />
                    Plack
                  </Link>
                </h1>

                <h1 style={{ fontSize: 45, marginBottom: 20 }}>
                  Welcome to your new social network
                </h1>
              </header>

              <Image
                src='https://joinup.qodeinteractive.com/wp-content/uploads/2020/11/h3-img-2.png'
                size='big'
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
