import React from "react";
import { Tab, Icon } from "semantic-ui-react";

import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import Starred from "./Starred";

class SidePanel extends React.Component {
  render() {
    const { currentUser } = this.props;

    return (
      <>
        <h1 style={{ fontSize: 40, color: "#2185d0" }}>
          <Icon name='fire' color='#2185d0' />
          Plack
        </h1>

        <Tab
          menu={{ secondary: true }}
          panes={[
            {
              menuItem: {
                key: "communities",
                icon: "code",
                content: "Communities",
              },
              render: () => (
                <Tab.Pane attached={false}>
                  <Channels currentUser={currentUser} />{" "}
                </Tab.Pane>
              ),
            },
            {
              menuItem: {
                key: "users",
                icon: "favorite",
                content: "Favorites",
              },
              render: () => (
                <Tab.Pane attached={false}>
                  <Starred currentUser={currentUser} />
                </Tab.Pane>
              ),
            },
            {
              menuItem: { key: "users", icon: "users", content: "Users" },
              render: () => (
                <Tab.Pane attached={false}>
                  <DirectMessages currentUser={currentUser} />
                </Tab.Pane>
              ),
            },
          ]}
          style={{ border: 0 }}
        />
      </>
    );
  }
}

export default SidePanel;
