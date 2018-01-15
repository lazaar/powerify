// @flow
import React, {Component} from 'react';
import {Layout,  Select, Card, FormLayout, TextField,  TextContainer, Heading, Checkbox} from '@shopify/polaris';

class Salespop extends Component {
    constructor(props) {
        super(props);
        
       
        
        this.state = {
            Language: "English",
            randomOrder:false,
            loopNotif: false,
            hideMobile: false,
            hideDesktop: false,
            usersNotifications:false,
            randomDelay: false,
            openNotifsNewTab: false,
            clickableNotifs: true,
            maxNotifsPerUser:false,
            visitorTracking: false,
            initialDelay: 20,
            displayTime: 13,
            position: "center",
            maxPerPage: 0,
            notificationMessage: " someone in San Francisco, USA purchased",
            showPreviewImage: true,
            text: "",
            emtiming: "3 days",
            logourl: "",
            upsell: true,
            shadow: false,
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
                      checked = {this.state.randomOrder}
				              label="Display notifications in random order" 
				              value = {this.state.randomOrder}
				              onChange={(e) => this.onPropertyChange("randomOrder", e) }
				              />
				              <Checkbox 
				              label="Loop notifications " 
				              value = {this.state.loopNotif}
                      checked = {this.state.loopNotif}
				              onChange={(e) => this.onPropertyChange("loopNotif", e) }
				              />
				              <Checkbox 
				              label="Hide on mobile" 
				              value = {this.state.hideMobile}
                      checked = {this.state.hideMobile}
				              onChange={(e) => this.onPropertyChange("hideMobile", e) }
				              />
				              <Checkbox 
				              label="Hide on desktop" 
				              value = {this.state.hideDesktop}
                      checked = {this.state.hideDesktop}
				              onChange={(e) => this.onPropertyChange("hideDesktop", e) }
				              />
				              <Checkbox 
				              label="Allow users to close notifications" 
				              value = {this.state.usersNotifications}
                      checked = {this.state.usersNotifications}
				              onChange={(e) => this.onPropertyChange("usersNotifications", e) }
				              />
				              <Checkbox 
				              label="Randomize delay between notifications " 
				              value = {this.state.randomDelay}
                      checked = {this.state.randomDelay}
				              onChange={(e) => this.onPropertyChange("randomDelay", e) }
				              />
				              <Checkbox 
				              label="Open notification links in a new tab" 
				              value = {this.state.openNotifsNewTab}
                      checked = {this.state.openNotifsNewTab}
				              onChange={(e) => this.onPropertyChange("openNotifsNewTab", e) }
				              />
				              <Checkbox 
				              label="Enable entire notification to be a clickable link" 
				              value = {this.state.clickableNotifs}
                      checked = {this.state.clickableNotifs}
				              onChange={(e) => this.onPropertyChange("clickableNotifs", e) }
				              />
				              <Checkbox 
				              label="Max notifications per user session" 
				              value = {this.state.maxNotifsPerUser}
                      checked = {this.state.maxNotifsPerUser}
				              onChange={(e) => this.onPropertyChange("maxNotifsPerUser", e) }
				              />
				              <Checkbox 
				              label="Live visitors tracking" 
				              value = {this.state.visitorTracking}
                      checked = {this.state.visitorTracking}
				              onChange={(e) => this.onPropertyChange("visitorTracking", e) }
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
                            value={this.state.initialDelay}
                            onChange={(e) => this.onPropertyChange("initialDelay", e) }
                          />
                          <TextField
                            label="Max per page"
                            type="number"
                            value={this.state.maxPerPage}
                            onChange={(e) => this.onPropertyChange("maxPerPage", e) }
                          />
                          <TextField
                            label="Display time"
                            type="number"
                            value={this.state.displayTime}
                            onChange={(e) => this.onPropertyChange("displayTime", e) }
                          />
                          <Select
                              label="Position"
                              value={this.state.position}
                              options={[
                                'Bottom left',
                                'Bottom right',
                                'top left',
                                'top right',
                                'top center',
                                'Bottom center',
                                     ]}
                              onChange={(e) => this.onPropertyChange("position", e) }
                            />
                           <Select
                              label="Mobile Position"
                              value={this.state.mobilePosition}
                              options={[
                                'Bottom',
                                'top',
                                
                                     ]}
                              onChange={(e) => this.onPropertyChange("mobilePosition", e) }
                            />
                            <Select
                              label="Language"
                              value={this.state.Language}
                              options={[
                                'English',
                                'Spanish',
                                'French',
                                'Arabic',
                                'Italian',
                                'German',
                                     ]}
                              onChange={(e) => this.onPropertyChange("Language", e) }
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
                            type="text"
                            value={this.state.notificationMessage}
                            onChange={(e) => this.onPropertyChange("notificationMessage", e) }
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
						              value = {this.state.showPreviewImage}
                          checked = {this.state.showPreviewImage}
						              onChange={(e) => this.onPropertyChange("showPreviewImage", e) }
						              />
		            	</FormLayout.Group>
			            <FormLayout.Group>

			                        
			              <Checkbox 
			              label="shadow" 
			              value = {this.state.shadow}
                    checked = {this.state.shadow}
			              onChange={(e) => this.onPropertyChange("shadow", e) }
			              />
			            </FormLayout.Group>

             	</Card>
             </Layout.AnnotatedSection>
        </Layout>);
    }
}

export default Salespop;