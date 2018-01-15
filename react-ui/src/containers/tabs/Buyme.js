// @flow
import React, {Component} from 'react';
import {Layout,  Select, Card, FormLayout, TextField,} from '@shopify/polaris';

class Buyme extends Component {
    constructor(props) {
        super(props);
        
       
        
        this.state = {
            backgroundTheme: "Dark Theme",
            position: "Show at top",
            Size: "Medium",
            discount: 0,
            discounttype: "",
            
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
            <Layout.AnnotatedSection
                title="Settings"
                description="">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            <Select
                              label="Choose the position"
                              value={this.state.position}
                              options={[
                                'Show at top',
                                'Show at bottom'
                                     ]}
                              onChange={(e) => this.onPropertyChange("position", e) }
                            />
                            <Select
                              label="Choose background theme"
                              value={this.state.backgroundTheme}
                              options={[
                                'Light Theme',
                                'Dark Theme'
                                     ]}
                              onChange={(e) => this.onPropertyChange("backgroundTheme", e) } />

                            <Select
                              label="Size"
                              value={this.state.Size}
                              options={[
                                'Small',
                                'Medium',
                                'Big',
                                'Very big'
                                     ]}
                              onChange={(e) => this.onPropertyChange("Size", e) }
                            />
                            <TextField
                            label="Choose your Button color "
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          />
                          <TextField
                            label="Choose your Text button color "
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          />
				            
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
        </Layout>);
    }
}

export default Buyme;