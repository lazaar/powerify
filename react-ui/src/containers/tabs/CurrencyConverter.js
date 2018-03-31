// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Card, FormLayout, Select, Checkbox, ChoiceList} from '@shopify/polaris';

class CurrencyConverter extends Component {
    constructor(props) {
        super(props);


        if (this.props.settings.currencyconverter) {
            this.state = this.props.settings.currencyconverter;
        }
        else {
            this.state = {
                isEnable: true,
                displayWith: "symbol",
                decimals: 0
            };
            this.props.onSettingsChange("currencyconverter", this.state);
        }
    }

    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("currencyconverter", value, property);
        });

        if (typeof callback === "function") {
            callback();
        }
    };


    render() {
        return (
            <Layout sectioned>
                <Card
                    title="Enable"
                    sectioned>
                    <FormLayout>
                        <FormLayout.Group>

                            <Checkbox
                                label="Enable autoSwitch currency"
                                checked={this.state.isEnable}
                                onChange={(e) => this.onPropertyChange("isEnable", e) }
                            />
                            <Checkbox
                                label="Checkout currency notification"
                                checked={this.state.checkoutNotification}
                                onChange={(e) => this.onPropertyChange("checkoutNotification", e) }
                            />

                        </FormLayout.Group>
                    </FormLayout>
                </Card>
                <Card
                    title="Price Configuration"
                    sectioned>
                    <FormLayout>

                        <FormLayout.Group>
                            <ChoiceList
                                title="Company name"
                                choices={[
                                    {
                                      label: 'Use currency Cymbol',
                                      value: 'symbol'
                                    },{
                                      label: 'Use currency Code',
                                      value: 'code'
                                    }
                                    ]}
                                selected={this.state.displayWith}
                                onChange={(e) => this.onPropertyChange("displayWith", e) }
                            />


                            <Select
                                label="Chose how to display decimals"
                                value={this.state.decimals}
                                options={[
                                        {
                                          label: "Don't round",
                                          value: 0
                                        },{
                                          label: "Remove decimal part",
                                          value: 1
                                        },{
                                          label: "Round to next digit",
                                          value: 2
                                        },{
                                          label: "Round to next .99",
                                          value: 3
                                        }
		                        ]}
                                onChange={(e) => this.onPropertyChange("decimals", e) }
                            />

                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout>);
    }
}
const mapStateToProps = (state) => {
    const {settings} = state;
    return {
        settings: settings
    }
};

export default connect(mapStateToProps, null)(CurrencyConverter);
