// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Layout, Card, FormLayout, TextField, Select, Checkbox} from '@shopify/polaris';

class CurrencyConverter extends Component {
    constructor(props) {
        super(props);
        
       
        if(this.props.settings.currencyconverter){
            this.state = this.props.settings.currencyconverter;
        }
        else{
        this.state = {
            isEnable:false,
            autoSwitch: true,
            hideConvLabel: true,
            isCurrencyCode: true,
            roundTo: 12,
            theme: "Flag",
            message: "Chewy",
            checkoutNotification: true,
            discount: 0,
            decimals: "Remove",
        };
         }
    }
    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("currencyconverter", property, value);
        });

        if (typeof callback === "function") {
            callback();
        }
    };


    render() {
        return (
        	
        	<Layout sectioned>
        	<Card
				  title="Online store dashboard"
				  sectioned
				> 

	        	<p> You need to edit your Money . <a href="http://www.example.com/default.htm"> Click here to see how </a> </p>
				   

			</Card>
            <Layout.AnnotatedSection
                title="Select Currencies"
                description="Select the currencies that will appear in the Currency Switcher on your website.">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                        	
	                         <Checkbox 
				              label="Enable App" 
                              checked = {this.state.isEnable}
				              onChange={(e) => this.onPropertyChange("isEnable", e) }
				              />
				              <Checkbox 
				              label="Auto Switch" 
				              checked = {this.state.autoSwitch}
				              onChange={(e) => this.onPropertyChange("autoSwitch", e) }
				              />
				              <Checkbox 
				              label="Hide converted label" 
				              checked = {this.state.hideConvLabel}
				              onChange={(e) => this.onPropertyChange("hideConvLabel", e) }
				              />
                            	   
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
                title="Sent 20 min. after cart abandonment"
                description="">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            <Select
								    label="Currency Switcher Theme"
		                            value={this.state.theme}
		                            options={[
		                                'Flag ',
		                                'No theme'
		                                     ]}
		                            onChange={(e) => this.onPropertyChange("theme", e) }
		                    />		
                          	<TextField
                            label="Background color"
                            type="text"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                            multiline
                          	/>
                          	<TextField
                            label="Text Color"
                            type="text"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                            multiline
                          	/>	
                          	<TextField
                            label="Hover color"
                            type="text"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                            multiline
                          	/>			   
				             
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
                title="Price Configuration"
                description="">
                <Card sectioned>
                    <FormLayout>
                       
                        <FormLayout.Group>
                        	
                        	<Checkbox 
				              label="Display Currency Code" 
                              checked = {this.state.isCurrencyCode}
				              onChange={(e) => this.onPropertyChange("isCurrencyCode", e) }
				              />

                           <Select
								    label=" Chose how to display decimals"
		                            value={this.state.decimals}
		                            options={[
		                                "Remove",
		                                "Round to next digit",
		                                "Round to .99",
		                                "Custom Rounding"
		                                     ]}
		                            onChange={(e) => this.onPropertyChange("decimals", e) }
		                    />

                          	<TextField
                            label="Rounding number to"
                            type="number"
                            value={this.state.roundTo}
                            onChange={(e) => this.onPropertyChange("roundTo", e) }
                            
                          	/>

                        </FormLayout.Group>
                      </FormLayout>  
                </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
                  title="Extra Features"
                description="">
                <Card sectioned>

		                <FormLayout.Group>
		               	    <Checkbox 
				              label="Checkout currency notification" 
				              checked = {this.state.checkoutNotification}
				              onChange={(e) => this.onPropertyChange("checkoutNotification", e) }
				             />
                          	<TextField
                            label="Message"
                            type="text"
                            value={this.state.message}
                            onChange={(e) => this.onPropertyChange("message", e) }
                            multiline
                          	/>
                          	<TextField
                            label="Call to Action"
                            type="text"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          	/>
			            </FormLayout.Group>

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

export default connect(mapStateToProps, null)(CurrencyConverter);
