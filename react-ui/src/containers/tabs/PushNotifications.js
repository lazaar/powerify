// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Layout, Card, FormLayout, TextField, Checkbox, ChoiceList} from '@shopify/polaris';

class PushNotifications extends Component {
    constructor(props) {
        super(props);
        
       
        if(false){
            this.state = this.props.settings.pushnotifications;
        }
        else{
            this.state = {
                enable:true,
                messages:"Continue shopping in our store; You have {cartCount} products in cart; More than 100 original products waiting for you; Discover {productTitle}",
                showOnlyHidden:['true'],
                loop:false,
                minTime:6,
                maxTime:10
            };
        }
    }
    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("pushnotifications", value, property);
        });
        if (typeof callback === "function") {
            callback();
        }
    };


    render() {
        return (<Layout sectioned>
            <Layout.AnnotatedSection
                title="Set up Push notifications"
                description="">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            <Checkbox label="Enable Notifications"
                                      checked={this.state.enable}
                                      onChange={(e) => this.onPropertyChange("enable",e)}

                            />
                            <ChoiceList
                                title="Show notification only if window is inactive"
                                choices={[
							    {
							      label: 'yes',
							      value: 'true'
							    },
							    {
							      label: 'No',
							      value: 'false'
							    }
							  ]}
                                selected={this.state.showOnlyHidden}
                                onChange={(e) => this.onPropertyChange("showOnlyHidden",e)}
                            />
                        </FormLayout.Group>
                        <TextField
                            label="Messages separated by ';'"
                            type="text"
                            helpText='Use {cartCount} for number of items in cart, {productTitle} for random product title and {country} for user country'
                            multiline={5}
                            value={this.state.messages}
                            onChange={(e) => this.onPropertyChange("messages", e) }
                        />
                        <Checkbox label="Loop message"
                                  checked={this.state.loop}
                                  onChange={(e) => this.onPropertyChange("loop",e)}

                        />
                        <FormLayout.Group>
                            <TextField
                                label="Minimum Time between notifications (minute)"
                                type="number"
                                value={this.state.minTime}
                                onChange={(e) => this.onPropertyChange("minTime", e) }
                            />
                            <TextField
                                label="Maximum Time between notifications (minute)"
                                type="number"
                                value={this.state.maxTime}
                                onChange={(e) => this.onPropertyChange("maxTime", e) }
                            />
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
        </Layout>);
    }
}

const mapStateToProps = (state) => {
    const {settings} = state;
    return{
        settings: settings
    }
};

export default connect(mapStateToProps, null)(PushNotifications);