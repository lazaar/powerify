// @flow
import React, {Component} from 'react';
import {Layout,  Select, Card, FormLayout, TextField, Checkbox,} from '@shopify/polaris';

class CrossSell extends Component {
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
            text: "Customers Who Bought This Item Also Bought",
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
            <Layout.Section
                title="Settings"
                description="">
                <Card sectioned title="Create New Bundle">
                       <FormLayout>
                        <FormLayout.Group>
                            

                            <Select
                              label="Recommandation Algorithm"
                              value={this.state.emtiming}
                              options={[
                                'Manual : Define manually',
                                'use collection: recommand other product from same collection',
                                'Randomly: recommand random products that a user might like'
                                     ]}
                              onChange={(e) => this.onPropertyChange("emtiming", e) } />
                              <button> trigger product </button>
                              <button> "Also bought" products  </button>
                             <Checkbox
                                label="enable automatic Recommandations"
                                value={this.state.enable}
                                checked={this.state.enable}
                                onChange={(e) => this.onPropertyChange("enable", e) }
                                />
                            
                            />

				            
                        </FormLayout.Group>
                        <FormLayout.Group> 
                        <TextField
                            label="Text above the recommendation box"
                            value={this.state.text}
                            onChange={(e) => this.onPropertyChange("text", e) }
                        />
                        <TextField
                            label="Vertical padding"
                            type="number"
                            value={this.state.text}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                        />
                        </FormLayout.Group>
                        <FormLayout.Group>

                        <Checkbox  label="Show product name"/>
                        <Checkbox  label="Show product price"/>
                        <Checkbox  label="Show add to cart button"/>

                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.Section>
        </Layout>);
    }
}

export default CrossSell;