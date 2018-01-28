// @flow
import React, {Component} from 'react';
import { Layout, Page, Card, FormLayout, Select  } from '@shopify/polaris';
import { connect } from 'react-redux';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: 0,
        saveState : "done"
    };
  }

  render() {

    return (
        <Page
          title="Settings for Product"
          fullWidth
          primaryAction={{ content:  this.state.saveState === "progress" ? "Saving ..." : "Save", onAction: () => this.props.saveSettings(this.props.settings,this.saveState), disabled:this.state.saveState === "progress" }}
          secondaryActions={[
            { content: "Go back", onAction: () => this.props.history.goBack() }
          ]}>
            <Layout sectioned>
                <Layout.Section>
                    <Card
                        title="Scarify Settings"
                        sectioned>
                        <FormLayout>
                            <FormLayout.Group >
                                <Select
                                    label="Quick View Button Position:"
                                    options={[
                                        {
                                          label: 'Top',
                                          value: 'Top',
                                        },
                                        {
                                          label: 'Center',
                                          value: 'Center',
                                        },
                                        {
                                          label: 'Bottom',
                                          value: 'Bottom',
                                        }
                                     ]}/>
                            </FormLayout.Group>
                        </FormLayout>
                    </Card>
                </Layout.Section>
            </Layout>
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
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Product);

