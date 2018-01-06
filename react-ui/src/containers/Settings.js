// @flow
import React, {Component} from 'react';
import { Tabs, Page } from '@shopify/polaris';
import UpperBar from './tabs/UpperBar';
import Scarcity from './tabs/Scarcity';
import { connect } from 'react-redux';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);

    this.state = {
      selectedTab: 0,
    };
  }

  handleTabChange(selectedTab) {
    this.setState({selectedTab});
  }

  render() {
    const {selectedTab} = this.state;

    const tabs = [
      {
        id: 'upper-bar',
        content: 'Upper Bar',
        panelID: 'upper-bar',
      },
      {
        id: 'tab2',
        content: 'something2',
        panelID: 'panel2',
      },
      {
        id: 'Scarcity',
        content: 'Scarcity',
        panelID: 'Scarcity',
      },
    ];

    const tabPanels = [
      (<Tabs.Panel id="upper-bar">
          <UpperBar/>
        </Tabs.Panel>),
      (
        <Tabs.Panel id="panel2">
          something else
        </Tabs.Panel>
      ),
      (
        <Tabs.Panel id="Scarcity">
          <Scarcity/>
        </Tabs.Panel>
      ),
    ];

    return (
        <Page
          title="Settings"
          fullWidth
          primaryAction={{ content: 'Save', onAction: () => this.props.history.goBack() }}
          secondaryActions={[
            { content: 'Back to products', onAction: () => this.props.history.goBack() }
          ]}
        >
        <Tabs
          selected={selectedTab}
          tabs={tabs}
          onSelect={this.handleTabChange}
        />
        {tabPanels[selectedTab]}
      </Page>
    );
  }
}

export default connect()(Settings);

