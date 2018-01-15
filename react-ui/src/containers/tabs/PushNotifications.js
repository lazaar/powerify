// @flow
import React, {Component} from 'react';
import {Layout, Card, FormLayout, TextField, Select} from '@shopify/polaris';

class PushNotifications extends Component {
    constructor(props) {
        super(props);
        
       
        
        this.state = {
            Language: "English",
            enableDate:false,
            promptDelay: "Chewy",
            twentyTitle: "bold",
            twentyDescription: "Hurry! Sales Ends In",
            fontsize: 20,
            hourTitle: "callToAction",
            hourDescription: "center",
            threeHourTitle: "",
            threeHourDescription: "",
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
		                            onChange={(e) => this.onPropertyChange("promptDelay", e) }
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
                            type="text"
                            value={this.state.twentyTitle}
                            onChange={(e) => this.onPropertyChange("twentyTitle", e) }
                          	/>
                          	<TextField
                            label="Description"
                            type="text"
                            value={this.state.twentyDescription}
                            onChange={(e) => this.onPropertyChange("twentyDescription", e) }
                            multiline
                          	/>
                          	<TextField
                            label="Call to Action"
                            type="text"
                            value={this.state.callToAction}
                            onChange={(e) => this.onPropertyChange("callToAction", e) }
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
                            type="text"
                            value={this.state.hourTitle}
                            onChange={(e) => this.onPropertyChange("hourTitle", e) }
                          	/>
                          	<TextField
                            label="Description"
                            type="text"
                            value={this.state.hourDescription}
                            onChange={(e) => this.onPropertyChange("hourDescription", e) }
                            multiline
                          	/>
                          	<TextField
                            label="Call to Action"
                            type="text"
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
                            type="text"
                            value={this.state.threeHourTitle}
                            onChange={(e) => this.onPropertyChange("threeHourTitle", e) }
                          	/>
                          	<TextField
                            label="Description"
                            type="text"
                            value={this.state.threeHourDescription}
                            onChange={(e) => this.onPropertyChange("threeHourDescription", e) }
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

export default PushNotifications;