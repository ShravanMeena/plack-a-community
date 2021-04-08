import React from "react";
import { Segment, Header, Image, List } from "semantic-ui-react";
import UserPanel from "../SidePanel/UserPanel";

class MetaPanel extends React.Component {
  state = {
    channel: this.props.currentChannel,
    privateChannel: this.props.isPrivateChannel,
    activeIndex: 0,
  };

  setActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  formatCount = (num) =>
    num > 1 || num === 0 ? `${num} posts` : `${num} post`;

  displayTopPosters = (posts) =>
    Object.entries(posts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val], i) => (
        <List.Item key={i}>
          <Image avatar src={val.avatar} />
          <List.Content>
            <List.Header as='a'>{key}</List.Header>
            <List.Description>{this.formatCount(val.count)}</List.Description>
          </List.Content>
        </List.Item>
      ))
      .slice(0, 5);

  render() {
    const { privateChannel, channel } = this.state;
    const { userPosts, currentUser, primaryColor } = this.props;

    if (privateChannel)
      return (
        <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
      );

    return (
      <React.Fragment>
        <UserPanel primaryColor={primaryColor} currentUser={currentUser} />

        <Segment
          loading={!channel}
          style={{
            height: "80vh",
            borderRadius: 10,
            backgroundColor: "#EEEEF6",
            marginRight: 5,
            marginTop: 20,
            border: "0",
            overflowY: "scroll",
          }}>
          <h3>About</h3>
          <p style={{ opacity: 0.7, fontSize: 15 }}>
            {channel && channel.details}
          </p>

          <h3>Active Members</h3>
          <List>{userPosts && this.displayTopPosters(userPosts)}</List>

          <h3>Group Admin</h3>
          <Header as='h3'>
            <Image circular src={channel && channel.createdBy.avatar} />
            {channel && channel.createdBy.name}
          </Header>
        </Segment>
      </React.Fragment>
    );
  }
}

export default MetaPanel;
