// @flow
import React, {Component} from 'react';
//import DatePicker from 'react-datepicker';
import './style.css';
import './fonts.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Layout, Card, FormLayout, TextField, Select} from '@shopify/polaris';

class PushNotifications extends Component {
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
                title="Set up Push notifications"
                description="">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            <Select
								    label="Prompt Delay"
		                            value={this.state.emtiming}
		                            options={[
		                                'Instant',
		                                '5 seconds',
		                                '10 seconds',
		                                '15 seconds',
		                                '30 seconds',
		                                '1 min'
		                                     ]}
		                            onChange={(e) => this.onPropertyChange("emtiming", e) }
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
                            <TextField
                            label="Title"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          	/>
                          	<TextField
                            label="Description"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          	/>
                          	<TextField
                            label="Call to Action"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          	/>				   
				             
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
                title="Sent 1 hour after cart abandonment"
                description="">
                <Card sectioned>
                    <FormLayout>
                        
                        <FormLayout.Group >
                           <TextField
                            label="Title"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          	/>
                          	<TextField
                            label="Description"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          	/>
                          	<TextField
                            label="Call to Action"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          	/>	
                        </FormLayout.Group>
                      </FormLayout>  
                </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
                  title="Sent 24 hour after cart abandonment"
                description="">
                <Card sectioned>

		                <FormLayout.Group>
		               	    <TextField
                            label="Title"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          	/>
                          	<TextField
                            label="Description"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          	/>
                          	<TextField
                            label="Call to Action"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          	/>
			            </FormLayout.Group>

             	</Card>
             </Layout.AnnotatedSection>
        </Layout>);
    }
}

export default PushNotifications;