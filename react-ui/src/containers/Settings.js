// @flow
import React, {Component} from 'react';
import { Tabs, Page, Spinner } from '@shopify/polaris';
import UpperBar from './tabs/UpperBar';
import Scarcity from './tabs/Scarcity';
import {addSettings} from '../redux/actions/index'
import { connect } from 'react-redux';
import {fetchSettings, saveSettings} from '../redux/settings'

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);
    this.state = {
        selectedTab: 0
    };

      let { fetchSettings } = this.props;

      fetchSettings();
  }

    handleSettings = (name, settings) => {
        this.props.settings[name]= settings;
    };

  handleTabChange(selectedTab) {
    this.setState({selectedTab});
      this.props.saveSetings(this.props.settings);
  }

  render() {
    const {selectedTab} = this.state;

    const tabs = [
      {
        id: 'upper-bar',
        content: 'Upper Bar',
        panelID: 'upper-bar'
      },
      {
        id: 'tab2',
        content: 'something2',
        panelID: 'panel2'
      },
      {
        id: 'Scarcity',
        content: 'Scarcity',
        panelID: 'Scarcity'
      }
    ];

    const tabPanels = [
      (<Tabs.Panel id="upper-bar">
          <UpperBar onSettingsChange={this.handleSettings}/>
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
      )
    ];

    return (
        <Page
          title="Settings"
          fullWidth
          primaryAction={{ content: 'Save', onAction: () => saveSettings(this.props.settings) }}
          secondaryActions={[
            { content: 'Back to products', onAction: () => this.props.history.goBack() }
          ]}
        >

         <Tabs
          selected={selectedTab}
          tabs={tabs}
          onSelect={this.handleTabChange}
        />
        {!this.props.settings.finishLoading && (<Spinner size="large" />)}
        {this.props.settings.finishLoading && tabPanels[selectedTab]}
      </Page>
    );
  }
}
const mapStateToProps = (state) => {
    const {settings} = state;
    return{
        settings: settings
    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveSetings: (settings) => {
            dispatch(addSettings(settings))
        },
        fetchSettings: () => {
            fetchSettings(dispatch);
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Settings);

