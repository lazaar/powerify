// @flow
import React, {Component} from 'react';
import {Layout, hsbToHex, Checkbox, Popover, ColorPicker, Select, Card, FormLayout, ChoiceList, TextField,} from '@shopify/polaris';

class Upsell extends Component {
    constructor(props) {
        super(props);
        let color = {
            hue: 120,
            brightness: 1,
            saturation: 0
        };
       
        
        this.state = {
            Language: "English",
            enableDate:false,
            bundleType: "standardUpsell",
            offerHeadline: "bold",
            discountCoupon: "TAKE10",
            minCartValue: 20,
            color: color,
            colorText: this.displayColor(color),
            hideOutOfStock: true,
            hideAlreadyInCart: false,
            discount: 0,
            discounttype: "",
            after: "Purchase",
            text: "",
            emtiming: "3 days",
            customizeColor: "",
            emailsubject: "",
            emailtext: "",
            upsell: true,
            colpic: false,
            showcolor: false,
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
    displayColor = (hsbColor) => {
        let color = hsbToHex(hsbColor);
        return color;
    };
    handleClose = (property) => {
    this.setState({ [property]: false })
    };

    render() {
        const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
        }
        return (
        <Layout sectioned>
            <Layout.Section
                title="Settings"
                description="">
                <Card sectioned title="Create New Bundle">
                    <FormLayout>
                            <TextField 
                              label = "Bundle Name"
                              type = "text"
                              value = {this.state.bundleName}
                              onChange={(e) => this.onPropertyChange("bundleName", e) }
                               />

                             <ChoiceList
                              title="Bundle Type"
                              choices={[
                                {
                                  label: 'Standard Upsell ',
                                  value: 'standardUpsell',
                                  helpText: "Standard upsell will present your customers with products upon checkout depending on items in their cart."

                                },
                                {
                                  label: 'Discount Upsell',
                                  value: 'discountUpsell',
                                  helpText: "Discount upsell offers a percentage discount if your customers add a certain monetary amount to their cart during the upsell"
                                },
                                {
                                  label: 'Free shipping upsell',
                                  value: 'freeShippingUpsell',
                                  helpText: "Free Shipping offers free shipping if your customers add a certain monetary amount to their cart during the upsell"
                                },
                              ]}
                              onChange={(e) => this.onPropertyChange("bundleType", e) }
                              selected={this.state.bundleType}
                            />
                            <TextField 
                              label = "Offer Headline"
                              type = "text"
                              value = {this.state.offerHeadline}
                              onChange={(e) => this.onPropertyChange("offerHeadline", e) }
                               />
                               <button> Trigger products</button>
                               <button> Bundle products </button>

                            <Select
                              label="Discount code"
                              value={this.state.discountCoupon}
                              options={[
                                'Fetch Code 1',
                                'Fetch Code 2',
                                'Fetch Code 3',
                                'GIME10'
                                     ]}
                              onChange={(e) => this.onPropertyChange("discountCoupon", e) }
                            />
                            <TextField
                            label="Minimum Cart Value for discount "
                            type="number"
                            value={this.state.minCartValue}
                            onChange={(e) => this.onPropertyChange("minCartValue", e) }
                          />
                           <Checkbox label="Hide products that are out of stock" 
                           checked={this.state.hideOutOfStock}
                            onChange={(e) => this.onPropertyChange("hideOutOfStock", e) }
                          
                           />
                           <Checkbox label="Hide items that are already in the customer's cart"
                           checked={this.state.hideAlreadyInCart}
                            onChange={(e) => this.onPropertyChange("hideAlreadyInCart", e) }
                            />
                          <TextField
                            label="Choose your Text button color "
                            type="number"
                            checked={this.state.discount}
                            onChange={(e) => this.onPropertyChange("discount", e) }
                          />
				                   
                           <Checkbox label="Customize Colors" 
                              checked = {this.state.customizeColor}
                              onChange={(e) => this.onPropertyChange("customizeColor", e) }

                           />

                           <Popover
                            active={this.state.showcolor}
                            activator={ 
                              <button className="button" style={{
                                    backgroundColor:hsbToHex(this.state.color),
                               }} 
                               onClick={(e) => this.onPropertyChange("showcolor", true)}
                               ></button>
                                      }
                            sectioned
                            >

                            <FormLayout>

                              <div style={ cover } onClick={(e) => this.handleClose("showcolor") }/>
                              <ColorPicker
                                            color={this.state.color}
                                            onChange={(e) => this.onPropertyChange("color", e, () => this.onPropertyChange("colorText", this.displayColor(e)))}
                                            onBlur={(e) => this.onPropertyChange("showcolor", false)}
                                          />
                              
                            </FormLayout>
                           </Popover>

                    </FormLayout>
                </Card>
            </Layout.Section>
        </Layout>);
    }
}

export default Upsell;