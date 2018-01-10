// @flow
import React, {Component} from 'react';
import { Tabs, Page } from '@shopify/polaris';
import UpperBar from './tabs/UpperBar';
import Scarcity from './tabs/Scarcity';
import Salespop from './tabs/Salespop';
import ExitCoupon from './tabs/ExitCoupon';
import Buyme from './tabs/Buyme';
import PushNotifications from './tabs/PushNotifications';
import CurrencyConverter from './tabs/CurrencyConverter';
import ImageReviews from './tabs/ImageReviews'
import {addSettings} from '../redux/actions/index'
import { connect } from 'react-redux';
import {fetchSettings, saveSettings} from '../redux/settings'

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);
    this.state = {
        selectedTab: 0,
        saveState : "done"
    };

      const { loadSettings } = this.props;
      loadSettings();
  }

    handleSettings = (name, settings) => {
        this.props.settings[name]= settings;
    };

    saveState = (name) => {
        this.setState({saveState : name});
    };

  handleTabChange(selectedTab) {
    this.setState({selectedTab});
    this.props.saveSettingsInStore(this.props.settings);
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
      },{
        id: 'ImageReviews',
        content: 'ImageReviews',
        panelID: 'ImageReviews'
      },{
        id: 'Salespop',
        content: 'Salespop',
        panelID: 'Salespop'
      },{
        id: 'Buyme',
        content: 'Buyme',
        panelID: 'Buyme'
      },{
        id: 'PushNotifications',
        content: 'PushNotifications',
        panelID: 'PushNotifications'
      },{
        id: 'CurrencyConverter',
        content: 'CurrencyConverter',
        panelID: 'CurrencyConverter'
      },{
        id: 'ExitCoupon',
        content: 'ExitCoupon',
        panelID: 'ExitCoupon'
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
      ),
      (
        <Tabs.Panel id="ImageReviews">
          <ImageReviews/>
        </Tabs.Panel>
      ),
      (
        <Tabs.Panel id="Salespop">
          <Salespop/>
        </Tabs.Panel>
      ),
      (
        <Tabs.Panel id="Buyme">
          <Buyme/>
        </Tabs.Panel>
      ),
      (
        <Tabs.Panel id="PushNotifications">
          <PushNotifications/>
        </Tabs.Panel>
      ),
      (
        <Tabs.Panel id="CurrencyConverter">
          <CurrencyConverter/>
        </Tabs.Panel>
      ),
      (
        <Tabs.Panel id="ExitCoupon">
          <ExitCoupon/>
        </Tabs.Panel>
      )
    ];

    return (
        <Page
          title="Settings"
          fullWidth
          primaryAction={{ content:  this.state.saveState === "progress" ? "Saving ..." : "Save", onAction: () => this.props.saveSettings(this.props.settings,this.saveState), disabled:this.state.saveState === "progress" }}
          secondaryActions={[
            { content: "Go back", onAction: () => this.props.history.goBack() }
          ]}
        >

         <Tabs
          selected={selectedTab}
          tabs={tabs}
          onSelect={this.handleTabChange}
        />
        { tabPanels[selectedTab]}
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
        saveSettingsInStore: (settings) => {
            dispatch(addSettings(settings))
        },
        loadSettings: () => {
            fetchSettings(dispatch);
        },
        saveSettings: (settings, callback) => {
            callback("progress");
            saveSettings(settings).then(()=>{callback("done")}).catch(()=>{callback("error")});
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Settings);

