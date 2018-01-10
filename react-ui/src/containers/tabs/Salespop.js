// @flow
import React, {Component} from 'react';
//import DatePicker from 'react-datepicker';
import './style.css';
import './fonts.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Layout,  Select, Card, FormLayout, TextField,  TextContainer, Heading, Checkbox} from '@shopify/polaris';

class Salespop extends Component {
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
        return (<Layout sectioned>
            <Layout.AnnotatedSection
                title="Design"
                description="">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            <Checkbox 
				              label="Display notifications in random order" 
				              value = {this.state.upsell}
				              onChange={(e) => this.onPropertyChange("upsell", e) }
				              />
				              <Checkbox 
				              label="Loop notifications " 
				              value = {this.state.upsell}
				              onChange={(e) => this.onPropertyChange("upsell", e) }
				              />
				              <Checkbox 
				              label="Hide on mobile" 
				              value = {this.state.upsell}
				              onChange={(e) => this.onPropertyChange("upsell", e) }
				              />
				              <Checkbox 
				              label="Hide on desktop" 
				              value = {this.state.upsell}
				              onChange={(e) => this.onPropertyChange("upsell", e) }
				              />
				              <Checkbox 
				              label="Allow users to close notifications" 
				              value = {this.state.upsell}
				              onChange={(e) => this.onPropertyChange("upsell", e) }
				              />
				              <Checkbox 
				              label="Randomize delay between notifications " 
				              value = {this.state.upsell}
				              onChange={(e) => this.onPropertyChange("upsell", e) }
				              />
				              <Checkbox 
				              label="Open notification links in a new tab" 
				              value = {this.state.upsell}
				              onChange={(e) => this.onPropertyChange("upsell", e) }
				              />
				              <Checkbox 
				              label="Enable entire notification to be a clickable link" 
				              value = {this.state.upsell}
				              onChange={(e) => this.onPropertyChange("upsell", e) }
				              />
				              <Checkbox 
				              label="Max notifications per user session" 
				              value = {this.state.upsell}
				              onChange={(e) => this.onPropertyChange("upsell", e) }
				              />
				              <Checkbox 
				              label="Live visitors tracking" 
				              value = {this.state.upsell}
				              onChange={(e) => this.onPropertyChange("upsell", e) }
				              />
				            
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
                title="Behavior"
                description="">
                <Card sectioned>
                    <FormLayout>
                        
                        <FormLayout.Group >
                           <TextContainer>
                          <Heading> Note: you must first create the discount on Shopify, and then enter its details. </Heading>
                          </TextContainer>
                          </FormLayout.Group >
                          <FormLayout.Group >
   
                          <TextField
                            label="Initial Delay"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          />
                          <TextField
                            label="Max per page"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          />
                          <TextField
                            label="Display time"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          />
                          <Select
                              label="Position"
                              value={this.state.emtiming}
                              options={[
                                'Bottom left',
                                'Bottom right',
                                'top left',
                                'top right',
                                'top center',
                                'Bottom center',
                                     ]}
                              onChange={(e) => this.onPropertyChange("emtiming", e) }
                            />
                           <Select
                              label="Mobile Position"
                              value={this.state.emtiming}
                              options={[
                                'Bottom left',
                                'Bottom right',
                                'top left',
                                'top right',
                                'top center',
                                'Bottom center',
                                     ]}
                              onChange={(e) => this.onPropertyChange("emtiming", e) }
                            />
                            <Select
                              label="Language"
                              value={this.state.emtiming}
                              options={[
                                'English',
                                'Spanish',
                                'French',
                                'Arabic',
                                'Italian',
                                'German',
                                     ]}
                              onChange={(e) => this.onPropertyChange("emtiming", e) }
                            />
                        </FormLayout.Group>
                      </FormLayout>  
                </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
                  title="Theme"
                description="">
                <Card sectioned>

		                <FormLayout.Group>
		                <TextField
                            label="Notification message: "
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          />	
		                  <Select
		                              label="Shape"
		                              value={this.state.emtiming}
		                              options={[
		                                'Classic',
		                                'Curved',
		                                'Pill',
		                                'Split',
		                                     ]}
		                              onChange={(e) => this.onPropertyChange("emtiming", e) }

		                                />
		                     </FormLayout.Group>
		                     <FormLayout.Group>
		                   <Checkbox 
						              label="Show Preview Image" 
						              value = {this.state.upsell}
						              onChange={(e) => this.onPropertyChange("upsell", e) }
						              />
		            	</FormLayout.Group>
			            <FormLayout.Group>

			                        
			              <Checkbox 
			              label="shadow" 
			              value = {this.state.shadow}
			              onChange={(e) => this.onPropertyChange("shadow", e) }
			              />
			            </FormLayout.Group>

             	</Card>
             </Layout.AnnotatedSection>
        </Layout>);
    }
}

export default Salespop;