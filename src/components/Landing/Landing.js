import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Grid } from "semantic-ui-react";

export default class Landing extends Component {
  render() {
    return (
      <div>
        <header
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 50,
            paddingRight: 50,
            borderBottom: "1px solid #eee",
            paddingBottom: 10,
          }}>
          <h1 style={{ fontSize: 40, color: "#2185d0" }}>
            <Icon name='fire' color='#2185d0' />
            Plack
          </h1>
          <Link to='/login'>
            <Button>Login</Button>
          </Link>
        </header>

        <Grid
          columns={2}
          style={{
            padding: 40,
            height: "84vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 1,
          }}>
          <Grid.Row style={{ marginTop: 20 }}>
            <Grid.Column>
              {/* <h1 style={{ fontSize: 60, letterSpacing: 1.2 }}>
                Join the fastest growing network now!
              </h1> */}
              <h1 style={{ fontSize: 60, letterSpacing: 1.2 }}>
                Time to join the future of social networking.
              </h1>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: "100",
                  letterSpacing: 1,
                  opacity: 0.7,
                }}>
                Welcome to plack, a digital heaven we designed so you can easily
                stay in touch with evreyone you choose & a meeting place for the
                likeminded peeps worldwide.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Link to='/register'>
                  <Button primary size='large'>
                    Join Community
                  </Button>
                </Link>
              </div>
            </Grid.Column>
            <Grid.Column>
              <img
                alt='bg'
                src='https://joinup.qodeinteractive.com/wp-content/uploads/2020/11/h1-rev-img-1-1.png'
                style={{ width: "100%", height: "100%" }}
              />
              <img
                alt='bg'
                src='https://joinup.qodeinteractive.com/wp-content/uploads/2020/11/landing-rev2-img-7.png'
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  position: "absolute",
                  top: -50,
                  left: 550,
                  bottom: 0,
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderTop: "1px solid #eee",
          }}>
          <p>
            <Icon name='code' color='#2185d0' size='small' /> with{" "}
            <Icon name='heart' color='#2185d0' size='small' />
            <a
              rel='noreferrer'
              style={{ color: "#000000" }}
              href='https://www.pakkamarwadi.tk/'
              target='_blank'>
              pakkamarwadi
            </a>
          </p>
        </div>
      </div>
    );
  }
}
