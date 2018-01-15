// @flow
import React, {Component} from 'react';
import {Layout, ColorPicker , hsbToHex , rgbToHsb, Checkbox, Select, Card, FormLayout, TextField,Heading, ChoiceList, Popover} from '@shopify/polaris';

class QuickView extends Component {
    constructor(props) {
        super(props);
        let color = {
            hue: 120,
            brightness: 1,
            saturation: 0
        }
        let QVBtnTxtColor = {
            hue: 181,
            brightness: 0.57,
            saturation: 1
        };

        this.state = {
            enable: true,
            enableDate:false,
            redirect: "Cart",
            font: "Raleway",
            fontweight: "bold",
            fontsize: 20,
            imgWidth: 345,
            popWidth: 800,
            popHeight: 500,
            maxWords: 30,
            text: "",
            QVBtnColor: color,
            QVBtnColorText: this.displayColor(color),
            QVBtnTxtColor: QVBtnTxtColor,
            QVBtnTxtColorText: this.displayColor(color),
            PriceColor: color,
            PriceColorText: this.displayColor(color),
            AToCBtnColor: color,
            AToCBtnColorText: this.displayColor(color),
            ProductNameColor: color,
            ProductNameColorText: this.displayColor(color),
            showPriceColor: false,
            showQVBtnTxtColor: false,
            showmecouponTextColor: false,
            showQVBtnColor: false,
            showAToCBtnColor: false,
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
   
    handleClose = (property) => {
    this.setState({ [property]: false })
  	};

    

    displayColor = (hsbColor) => {
        let color = hsbToHex(hsbColor);
        return color;
    };

    blurInputColor = (property, changeProperty) => {
        const colors = this.state[property].split(",");
        if (colors.length === 3) {
            const color = {
                red: colors[0],
                green: colors[1],
                blue: colors[2]
            };
            this.setState(()=>({
                [changeProperty]: rgbToHsb(color)
            }));
        }
    };



    render() {
    	const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    	}
        return (<Layout sectioned>
            <Layout.Section

                >
                <Card sectioned>
                    <FormLayout>
                       
                        <FormLayout.Group >
                        <Heading>General Settings beta</Heading>
						<Select
						  label="Quick View Button Position:"
						  options={[
						    {
						      label: 'Top',
						      value: 'Top',
						    },
						    {
						      label: 'Center',
						      value: 'Center',
						    },
						    {
						      label: 'Bottom',
						      value: 'Bottom',
						    },
						  ]}
						  selected={['Cartnoempty']}
						  />
						  <ChoiceList
							  title="After the item is added, the visitor  "
							  choices={[
							    {
							      label: 'is redirected to Cart Page',
							      value: 'Cart',
							    },
							    {
							      label: 'Continue Shopping',
							      value: 'continueShopping',
							    }
							  ]}
							  selected={this.state.redirect}
							  onChange={(e) => this.onPropertyChange("redirect",e)}
							/>

							<Checkbox label="Enable Quick View" 
							  checked={this.state.enable}

							  onChange={(e) => this.onPropertyChange("enable",e)}

							/>


                        </FormLayout.Group> 
                    </FormLayout>
                </Card>
            </Layout.Section>



            <Layout.Section
                title="Popup Settings"
                description="">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
	                       <TextField
							  label="Main Image Width:"
							  type="number"
							  value={this.state.imgWidth}
							  readOnly={false}
							  onChange={(e) => this.onPropertyChange("imgWidth", e) }
							  suffix="px"
							/>
							<TextField
							  label="Popup window Width:"
							  type="number"
							  value={this.state.popWidth}
							  readOnly={false}
							  onChange={(e) => this.onPropertyChange("popWidth", e) }
							  suffix="px"
							/>
							<TextField
							  label="Popup window Height:"
							  type="number"
							  value={this.state.popHeight}
							  readOnly={false}
							  onChange={(e) => this.onPropertyChange("popHeight", e) }
							  suffix="px"
							/>
							<TextField
							  label="Description Max Words:"
							  type="number"
							  value={this.state.maxWords}
							  readOnly={false}
							  onChange={(e) => this.onPropertyChange("maxWords", e) }
							/>

                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.Section>
            <Layout.Section
            	>
            	<Card 
            		title="Colors"
            		sectioned>
            			<FormLayout>
            			<TextField label="Quick View Button Text Color" 
  										value={this.state.QVBtnTxtColorText}
  								    	onClick={(e) => this.onPropertyChange("showQVBtnTxtColor", true)}
  							/>
            			<Popover
							  active={this.state.showQVBtnTxtColor}
							  activator={ 
							  	<button className="button" style={{
				                backgroundColor:hsbToHex(this.state.QVBtnTxtColor),
				      			 
							  	 }} 
							  	 onClick={(e) => this.onPropertyChange("showQVBtnTxtColor", true)}
							  	 ></button>

							  			}
							  sectioned
							>

							  <FormLayout>

							  	<div style={ cover } onClick={(e) =>  this.handleClose("showQVBtnTxtColor") }/>
							    <ColorPicker
                                color={this.state.QVBtnTxtColor}
                                onChange={(e) => this.onPropertyChange("QVBtnTxtColor", e, () => this.onPropertyChange("QVBtnTxtColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showQVBtnTxtColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
							<TextField label="Quick View Button Color" 
  										value={this.state.QVBtnColorText}
  								    	onClick={(e) => this.onPropertyChange("showQVBtnColor", true)}
  							/>
							<Popover
							  active={this.state.showQVBtnColor}
							  activator={ 
							  	<button className="button" style={{
				                backgroundColor:hsbToHex(this.state.QVBtnColor),
				      			 
							  	 }} 
							  	 onClick={(e) => this.onPropertyChange("showQVBtnColor", true)}
							  	 ></button>

							  			}
							  sectioned>

							  <FormLayout>

							  	<div style={ cover } onClick={(e) =>  this.handleClose("showQVBtnColor") }/>
							    <ColorPicker
                                color={this.state.QVBtnColor}
                                onChange={(e) => this.onPropertyChange("QVBtnColor", e, () => this.onPropertyChange("QVBtnColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showQVBtnColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
							<TextField label="Add to Cart Button Color" 
  										value={this.state.AToCBtnColorText}
  								    	onClick={(e) => this.onPropertyChange("showAToCBtnColor", true)}
  							/>
							<Popover
							  active={this.state.showAToCBtnColor}
							  activator={ 
							  	<button className="button" style={{
				                backgroundColor:hsbToHex(this.state.AToCBtnColor),
				      			 
							  	 }} 
							  	 onClick={(e) => this.onPropertyChange("showAToCBtnColor", true)}
							  	 ></button>

							  			}
							  sectioned>

							  <FormLayout>

							  	<div style={ cover } onClick={(e) =>  this.handleClose("showAToCBtnColor") }/>
							    <ColorPicker
                                color={this.state.AToCBtnColor}
                                onChange={(e) => this.onPropertyChange("AToCBtnColor", e, () => this.onPropertyChange("AToCBtnColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showAToCBtnColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
							<TextField label="Product Name Color" 
  										value={this.state.ProductNameColorText}
  								    	onClick={(e) => this.onPropertyChange("showProductNameColor", true)}
  							/>
							<Popover
							  active={this.state.showProductNameColor}
							  activator={ 
							  	<button className="button" style={{
				                backgroundColor:hsbToHex(this.state.ProductNameColor),
				      			 
							  	 }} 
							  	 onClick={(e) => this.onPropertyChange("showProductNameColor", true)}
							  	 ></button>

							  			}
							  sectioned>

							  <FormLayout>

							  	<div style={ cover } onClick={(e) =>  this.handleClose("showProductNameColor") }/>
							    <ColorPicker
                                color={this.state.ProductNameColor}
                                onChange={(e) => this.onPropertyChange("ProductNameColor", e, () => this.onPropertyChange("ProductNameColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showProductNameColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
							<TextField label="Price Color" 
  										value={this.state.PriceColorText}
  								    	onClick={(e) => this.onPropertyChange("showPriceColor", true)}
  							/>
							<Popover
							  active={this.state.showPriceColor}
							  activator={ 
							  	<button className="button" style={{
				                backgroundColor:hsbToHex(this.state.PriceColor),
				      			 
							  	 }} 
							  	 onClick={(e) => this.onPropertyChange("showPriceColor", true)}
							  	 ></button>

							  			}
							  sectioned>

							  <FormLayout>

							  	<div style={ cover } onClick={(e) =>  this.handleClose("showPriceColor") }/>
							    <ColorPicker
                                color={this.state.PriceColor}
                                onChange={(e) => this.onPropertyChange("PriceColor", e, () => this.onPropertyChange("PriceColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showPriceColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>

            			</FormLayout>
            	</Card>
            </Layout.Section>
        </Layout>);
    }
}

export default QuickView;