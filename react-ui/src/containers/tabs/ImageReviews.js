// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Layout,  Select, Card, FormLayout, TextField,  TextContainer, Heading, ChoiceList, Checkbox} from '@shopify/polaris';

class ImageReviews extends Component {
    constructor(props) {
        super(props);
        
        if(this.props.settings.imagereviews){
            this.state = this.props.settings.imagereviews;
        }
        else{
        this.state = {
            Language: "English",
            Publishing: "Automatically",
            code: "center",
            discount: 0,
            discounttype: "",
            after: "Purchase",
            emtiming: "3 days",
            logourl: "",
            emailsubject: "",
            emailtext: "",
            upsell: true,
        };
      }
    }

    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("imagereviews", property, value);
        });
        if (typeof callback === "function") {
            callback();
        }
    };

    displayColor = (hsbColor) => {
      
    };

    blurInputColor = (property, changeProperty) => {
        
        
    };


    render() {
        return (<Layout sectioned>
            <Layout.AnnotatedSection
                title="Display Scarcity Countdown"
                description="Show/hide the Upper Bar">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            
                          <Select
                              label="Language"
                              placeholder="English"
                              value={this.state.Language}
                              options={[
                                {
                                  label: 'English',
                                  value: 'English',
                                },{
                                  label: 'Español',
                                  value: 'Español',
                                },{
                                  label: 'Français',
                                  value: 'Français',
                                },{
                                  label: 'Italiano',
                                  value: 'Italiano',
                                },{
                                  label: 'Deutsch',
                                  value: 'Deutsch',
                                },{
                                  label: 'Netherland',
                                  value: 'Netherland',
                                },{
                                  label: 'Portuguese',
                                  value: 'Portuguese',
                                },{
                                  label: 'Custom',
                                  value: 'Custom',
                                }
                              ]}
                              onChange={(e) => this.onPropertyChange("Language", e) }
                            />
                            <ChoiceList
                                title="Publish new reviews"
                                choices={[
                                  {
                                    label: 'Automatically',
                                    value: 'Automatically',
                                  },
                                  {
                                    label: 'Only after approval',
                                    value: 'approval',
                                  },
                                ]}
                                selected={this.state.Publishing}
                                onChange={(e) => this.onPropertyChange("Publishing", e) }

                              />
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
                title="Style Settings"
                description="Customize the style of the Upper Bar">
                <Card sectioned>
                    <FormLayout>
                        
                        <FormLayout.Group >
                           <TextContainer>
                          <Heading> Note: you must first create the discount on Shopify, and then enter its details. </Heading>
                          </TextContainer>
                          </FormLayout.Group >
                          <FormLayout.Group >
                          <Select
                              label="Type of discount"
                              options={[
                                'None',
                                'Percentage (%)',
                                'Fixed'
                              ]}
                              value = {this.state.discounttype}
                            onChange={(e) => this.onPropertyChange("discounttype", e) }
                            />

                          <TextField
                            label="Amount"
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          />

                          <TextField
                            label="Code"
                            type="text"
                            placeholder = "Coupon code here "
                            value={this.state.code}

                            onChange={(e) => this.onPropertyChange("code", e) }
                            helpText = "Note: you must first create the discount on Shopify, and then enter its details"
                          />
                        </FormLayout.Group>
                      </FormLayout>  
                </Card>
            </Layout.AnnotatedSection>
             <Layout.AnnotatedSection
                  titre = "Review request email"
                  description = ""
             >
                <Card sectioned>

                <FormLayout.Group condensed>
                  <Select
                              label="Email timing"
                              value={this.state.emtiming}
                              options={[
                                '3 days',
                                '7 days',
                                '10 days',
                                '14 days',
                                '21 days',
                                '28 days',
                                '35 days',
                                '42 days',
                                '50 days',
                                '60 days',
                                '70 days',
                                     ]}
                              onChange={(e) => this.onPropertyChange("emtiming", e) }

                                />
                  <Select
                              label="after"
                              value={this.state.after}
                              options={[
                                'Purchase',
                                'Fulfillment', 
                                     ]}
                              onChange={(e) => this.onPropertyChange("after", e) }
                                />
            </FormLayout.Group>
            <FormLayout.Group >
              <TextField
                            label="Logo URL (max width 400px)"
                            type="text"
                            placeholder = "Full url, png/jpg image"
                            value = {this.state.logourl}
                            onChange={(e) => this.onPropertyChange("logourl", e) }
                         />             
              <TextField
                            label="Email subject"
                            type="text"
                            placeholder = "[Name], tell us what you think!"
                            value={this.state.emailsubject}
                            onChange={(e) => this.onPropertyChange("emailsubject", e) }
                            helpText="Use [Name] as a placeholder for the user's first name"
                         /> 
              <TextField
                            label="Email text"
                            type="text"
                            placeholder = "We would be grateful if you shared how things look and feel. Your review helps us and the community that supports us, and it only takes a few seconds."
                            onChange={(e) => this.onPropertyChange("emailtext", e) }
                            value = {this.state.emailtext}
                            helpText="Use [Name] as a placeholder for the user's first name"
                            multiline
                         /> 
              <Checkbox 
              label="Smart Upsell" 
              checked = {this.state.upsell}
              onChange={(e) => this.onPropertyChange("upsell", e) }
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

export default connect(mapStateToProps, null)(ImageReviews);