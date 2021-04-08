import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import SidePanel from "./SidePanel/SidePanel";
import MetaPanel from "./MetaPanel/MetaPanel";
import Messages from "./Messages/Messages";

class App extends Component {
  render() {
    const {
      currentUser,
      currentChannel,
      isPrivateChannel,
      userPosts,
      primaryColor,
    } = this.props;

    return (
      <div>
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column
              width={4}
              style={{
                backgroundColor: "#EEEEF6",
                padding: 20,
                height: "100vh",
                overflowY: "scroll",
              }}>
              <SidePanel
                key={currentUser && currentUser.uid}
                currentUser={currentUser}
                primaryColor={primaryColor}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Messages
                key={currentChannel && currentChannel.id}
                currentChannel={currentChannel}
                currentUser={currentUser}
                isPrivateChannel={isPrivateChannel}
              />
            </Grid.Column>
            <Grid.Column
              style={{
                padding: 20,
                height: "100vh",
              }}>
              <MetaPanel
                currentUser={currentUser}
                primaryColor={primaryColor}
                key={currentChannel && currentChannel.name}
                userPosts={userPosts}
                currentChannel={currentChannel}
                isPrivateChannel={isPrivateChannel}
              />{" "}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor,
});

export default connect(mapStateToProps)(App);
