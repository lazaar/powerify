// @flow
import React, {Component} from 'react';
import {Layout, ColorPicker, rgbToHsb,hsbToHex,  Select, Card, FormLayout, TextField, ChoiceList, Popover} from '@shopify/polaris';

class ExitCoupon extends Component {
    constructor(props) {
        super(props);
        let color = {
            hue: 120,
            brightness: 1,
            saturation: 0
        };
         let secondLineColor = {
            hue: 120,
            brightness: 1,
            saturation: 0
        };
        let bg_color = {
            hue: 181,
            brightness: 0.57,
            saturation: 1
        };
        let couponTextColor = {
            hue: 45,
            brightness: 1,
            saturation: 1
        };

        this.state = {
            enable: true,
            enableDate:false,
            font: "Raleway",
            fontweight: "bold",
            fontsize: 20,
            firstline: "Get 10% off your purchase Today",
            textalign: "center",
            secondline: "Coupon Code:",
            couponcode: "Giveme10",
            text: "",
            displayOn: "cartandproduct",
            shopValue: "Cartnoempty",
            color: color,
            colorText: this.displayColor(color),
            bg_color: bg_color,
            bg_colorText: this.displayColor(bg_color),
            secondLineColor: secondLineColor,
            secondLineColorText: this.displayColor(secondLineColor),
            couponTextColor: couponTextColor,
            couponTextColorText: this.displayColor(couponTextColor),
            showCouponBgColor: false,
            showcouponTextColor: false,
            showFirstLineColor: false,
            showsecondLineColor: false,

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
                        <FormLayout.Group>
                            
                         
                        </FormLayout.Group>

                        <FormLayout.Group >
                         
  						<TextField
  						  label="First Line"
  						  type="text"
  						  value={this.state.firstline}
  						  readOnly={false}
  						  onChange={(e) => this.onPropertyChange("firstline", e) }

  						/>
  						<TextField
  						  label="Second Line"
  						  type="text"
  						  value={this.state.secondline}
  						  readOnly={false}
  						  onChange={(e) => this.onPropertyChange("secondline", e) }

  						/>
  						<TextField
  						  label="Coupon code"
  						  type="text"
  						  value={this.state.couponcode}
  						  readOnly={false}
  						  onChange={(e) => this.onPropertyChange("couponcode", e) }

  						/>
  						<ChoiceList
  						  title="Shopping Cart value: (cart value condition for the popup to display)"
  						  choices={[
  						    {
  						      label: 'Any value (regardless of cart is empty or not)',
  						      value: 'Any',
  						    },
  						    {
  						      label: 'Cart not empty',
  						      value: 'Cartnoempty',
  						    },
  						  ]}
                onChange={(e) => this.onPropertyChange("shopValue", e) }
  						  selected={this.state.shopValue}
  						/>
  						<ChoiceList
  						  title="Display on: "
  						  choices={[
  						    {
  						      label: 'All pages',
  						      value: 'Allpages',
  						    },
  						    {
  						      label: 'Cart and product Only (recommended)',
  						      value: 'cartandproduct',
  						    }
  						  ]}
                onChange={(e) => this.onPropertyChange("displayOn", e) }
  						  selected={this.state.displayOn}
  						/>
  						

                          </FormLayout.Group> 
                      </FormLayout>
                  </Card>
              </Layout.Section>



            <Layout.Section
                title="Style Settings"
                description="Customize the style of the Upper Bar">
                <Card sectioned>
                    <FormLayout>
                        
                        <FormLayout.Group>
                        	<div className = "template_selected_preview">
                        	<div className = "coupon-select-preview" style = {{
		                              color:hsbToHex(this.state.color),
		                              backgroundColor:hsbToHex(this.state.bg_color),
		                              fontFamily: this.state.font
		                            }} >
                        		<div className = "coupon-wrapper-preview">
	                        		<div className = "coupon-innerbox-preview"> 
		                        		<h3 className = "coupon-title-preview" >{this.state.firstline} </h3>
		                        		<br/> 
		                        		<h4 className="coupon-subtitle-preview " style={{color: hsbToHex(this.state.secondLineColor)}}>{this.state.secondline} </h4>
	                        			<div className="coupon-code-preview" style={{color: hsbToHex(this.state.couponTextColor)}}> {this.state.couponcode} </div>
                        			</div>

                        		</div>

                        	</div>
                        	</div>
                        	
                        </FormLayout.Group>
                        
                         <FormLayout.Group >
                         	
  							<TextField label="Coupon backgroundColor" 
  										value={this.state.bg_colorText}
  								    	onClick={(e) => this.onPropertyChange("showCouponBgColor", true)}

  							
  							/>
                <Popover
							  active={this.state.showCouponBgColor}
							  activator={ 
							  	<button className="button" style={{
				                backgroundColor:hsbToHex(this.state.bg_color),
							  	 }} 
							  	 onClick={(e) => this.onPropertyChange("showCouponBgColor", true)}
							  	 ></button>
                          }
							  sectioned
						  	>

							  <FormLayout>

							  	<div style={ cover } onClick={(e) => this.handleClose("showCouponBgColor") }/>
							    <ColorPicker
                                color={this.state.bg_color}
                                onChange={(e) => this.onPropertyChange("bg_color", e, () => this.onPropertyChange("bg_colorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showCouponBgColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
							<TextField label="First Line Color" 
  										value={this.state.bg_colorText}
  								    	onClick={(e) => this.onPropertyChange("showFirstLineColor", true)}
  							
  							/>
							<Popover
							  active={this.state.showFirstLineColor}
							  activator={ 
							  	<button className="button" style={{
				                backgroundColor:hsbToHex(this.state.color),
				      			 
							  	 }} 
							  	 onClick={(e) => this.onPropertyChange("showFirstLineColor", true)}
							  	 ></button>

							  			}
							  sectioned
							>

							  <FormLayout>

							  	<div style={ cover } onClick={(e) => this.handleClose("showFirstLineColor") }/>
							    <ColorPicker
                                color={this.state.color}
                                onChange={(e) => this.onPropertyChange("color", e, () => this.onPropertyChange("colorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showFirstLineColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
							<TextField label="Second Line Color" 
  										value={this.state.bg_colorText}
  								    	onClick={(e) => this.onPropertyChange("showsecondLineColor", true)}
  							
  							/>
							<Popover
							  active={this.state.showsecondLineColor}
							  activator={ 
							  	<button className="button" style={{
				                backgroundColor:hsbToHex(this.state.secondLineColor),
				      			 
							  	 }} 
							  	 onClick={(e) => this.onPropertyChange("showsecondLineColor", true)}
							  	 ></button>

							  			}
							  sectioned
							>

							  <FormLayout>

							  	<div style={ cover } onClick={(e) => this.handleClose("showsecondLineColor")} />
							    <ColorPicker
                                color={this.state.secondLineColor}
                                onChange={(e) => this.onPropertyChange("secondLineColor", e, () => this.onPropertyChange("secondLineColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showsecondLineColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
							<TextField label="Coupon Text Color" 
  										value={this.state.bg_colorText}
  								    	onClick={(e) => this.onPropertyChange("showcouponTextColor", true)}
  							/>
							<Popover
							  active={this.state.showcouponTextColor}
							  activator={ 
							  	<button className="button" style={{
				                backgroundColor:hsbToHex(this.state.couponTextColor),
				      			 
							  	 }} 
							  	 onClick={(e) => this.onPropertyChange("showcouponTextColor", true)}
							  	 ></button>

							  			}
							  sectioned
							>

							  <FormLayout>

                  <div style={ cover } onClick={(e) => this.handleClose("showcouponTextColor")} />
							    <ColorPicker
                                color={this.state.couponTextColor}
                                onChange={(e) => this.onPropertyChange("couponTextColor", e, () => this.onPropertyChange("couponTextColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showcouponTextColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
						</FormLayout.Group>
						<FormLayout.Group>
							
                            <Select
                              label="Font"
                              placeholder="Select"
                              value={this.state.font}
                              options={[
                                {
                                  label: 'Raleway',
                                  value: 'Raleway',
                                },{
                                  label: 'Chewy',
                                  value: 'Chewy',
                                },{
                                  label: 'Montserrat',
                                  value: 'Montserrat',
                                },{
                                  label: 'Titillium',
                                  value: 'Titillium',
                                },{
                                  label: 'Pacifico',
                                  value: 'Pacifico',
                                },{
                                  label: 'Josefin Sans',
                                  value: 'Josefin Sans',
                                },{
                                  label: 'Comfortaa',
                                  value: 'Comfortaa',
                                },{
                                  label: 'Lobster',
                                  value: 'Lobster Two',
                                },{
                                  label: 'Quattrocento',
                                  value: 'Quattrocento Sans',
                                }
                              ]}
                              onChange={(e) => this.onPropertyChange("font", e) }
                            />
                           
							
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.Section>
        </Layout>);
    }
}

export default ExitCoupon;