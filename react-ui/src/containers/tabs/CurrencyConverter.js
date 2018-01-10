// @flow
import React, {Component} from 'react';
//import DatePicker from 'react-datepicker';
import './style.css';
import './fonts.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Layout, Card, FormLayout, TextField, Select, Checkbox} from '@shopify/polaris';

class CurrencyConverter extends Component {
    constructor(props) {
        super(props);
        
       
        
        this.state = {
            Language: "English",
            enableDate:false,
            font: "Chewy",
            fontweight: "bold",
            textabovetimer: "Hurry! Sales Ends In",
            fontsize: 20,
            Publishing: "Automatically",
            code: "center",
            discount: 0,
            discounttype: "",
            after: "Purchase",
            text: "",
            emtiming: "3 days",
            logourl: "",
            emailsubject: "",
            emailtext: "",
            upsell: true,
            colpic: false,
        };

    }
    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }));
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
				              value = {this.state.shadow}
				              onChange={(e) => this.onPropertyChange("shadow", e) }
				              />
				              <Checkbox 
				              label="Auto Switch" 
				              value = {this.state.shadow}
				              onChange={(e) => this.onPropertyChange("shadow", e) }
				              />
				              <Checkbox 
				              label="Hide converted label" 
				              value = {this.state.shadow}
				              onChange={(e) => this.onPropertyChange("shadow", e) }
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
		                            value={this.state.emtiming}
		                            options={[
		                                'Flag ',
		                                'No theme'
		                                     ]}
		                            onChange={(e) => this.onPropertyChange("emtiming", e) }
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
				              value = {this.state.shadow}
				              onChange={(e) => this.onPropertyChange("shadow", e) }
				              />

                           <Select
								    label=" Chose how to display decimals"
		                            value={this.state.emtiming}
		                            options={[
		                                "Remove",
		                                "Round to next digit",
		                                "Round to .99",
		                                "Custom Rounding"
		                                     ]}
		                            onChange={(e) => this.onPropertyChange("emtiming", e) }
		                    />

                          	<TextField
                            label="Rounding number to"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                            multiline
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
				              value = {this.state.shadow}
				              onChange={(e) => this.onPropertyChange("shadow", e) }
				             />
                          	<TextField
                            label="Message"
                            type="text"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
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

export default CurrencyConverter;