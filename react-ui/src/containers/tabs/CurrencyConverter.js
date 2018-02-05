// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Layout, Card, FormLayout, TextField, Select, Checkbox, ChoiceList} from '@shopify/polaris';

class CurrencyConverter extends Component {
    constructor(props) {
        super(props);
        
       
        if(false){
            this.state = this.props.settings.currencyconverter;
        }
        else{
        this.state = {
            isEnable:true,
            roundTo: 12,
            theme: "Flag",
            displayWith: "symbol",
            checkoutNotification: true,
            decimals: 3,
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
                              checked = {this.state.isEnable}
				              onChange={(e) => this.onPropertyChange("isEnable", e) }
				              />
                              <Checkbox 
                              label="Checkout currency notification" 
                              checked = {this.state.checkoutNotification}
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
                                      value: 'symbol',
                                    },{
                                      label: 'Use currency Code',
                                      value: 'code',
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
                                          value: 3,
                                        },{
                                          label: "Remove decimal part",
                                          value: 0,
                                        },{
                                          label: "Round to next digit",
                                          value: 1,
                                        },{
                                          label: "Round to .99",
                                          value: 0.99,
                                        },{
                                          label: "Custom rounding",
                                          value: 2,
                                        }
		                                     ]}
		                            onChange={(e) => this.onPropertyChange("decimals", e) }
		                    />
                            { (this.state.decimals === 2) && (
                                <div>
                                  	<TextField
                                    label="Rounding number to"
                                    type="number"
                                    value={this.state.roundTo}
                                    onChange={(e) => this.onPropertyChange("roundTo", e) }
                                    
                                  	/>
                                </div>
                            )
                            }

                        </FormLayout.Group>
                      </FormLayout>  
                </Card>
        </Layout>);
    }
}
const mapStateToProps = (state) => {
    const {settings} = state;
    return{
        settings: settings
    }
};

export default connect(mapStateToProps, null)(CurrencyConverter);
