// @flow
import React, {Component} from 'react';
//import DatePicker from 'react-datepicker';
import './style.css';
import './fonts.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Layout,  Select, Card, FormLayout, TextField,} from '@shopify/polaris';

class Buyme extends Component {
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
            <Layout.AnnotatedSection
                title="Settings"
                description="">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            <Select
                              label="Choose the position"
                              value={this.state.emtiming}
                              options={[
                                'Show at top',
                                'Show at bottom'
                                     ]}
                              onChange={(e) => this.onPropertyChange("emtiming", e) }
                            />
                            <Select
                              label="Choose background theme"
                              value={this.state.emtiming}
                              options={[
                                'Light Theme',
                                'Dark Theme'
                                     ]}
                              onChange={(e) => this.onPropertyChange("emtiming", e) } />

                            <Select
                              label="Size"
                              value={this.state.emtiming}
                              options={[
                                'Small',
                                'Medium',
                                'Big',
                                'Very big'
                                     ]}
                              onChange={(e) => this.onPropertyChange("emtiming", e) }
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