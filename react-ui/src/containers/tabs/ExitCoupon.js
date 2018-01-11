// @flow
import React, {Component} from 'react';
//import DatePicker from 'react-datepicker';
import './style.css';
import './fonts.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Layout, ColorPicker, hsbToRgb,rgbToHsb,hsbToHex,  Select, Card, FormLayout, TextField,  TextContainer, Heading, ChoiceList, Popover} from '@shopify/polaris';

class ExitCoupon extends Component {
    constructor(props) {
        super(props);
        let color = {
            hue: 120,
            brightness: 1,
            saturation: 0
        };
        let bg_color = {
            hue: 0,
            brightness: 0,
            saturation: 0
        };
        this.state = {
            enable: true,
            enableDate:false,
            font: "Chewy",
            fontweight: "bold",
            textabovetimer: "Hurry! Sales Ends In",
            fontsize: 20,
            firstline: "Get 10% off your purchase Today",
            textalign: "center",
            secondline: "Coupon Code:",
            couponcode: "Giveme10",
            text: "",
            color: color,
            colorText: this.displayColor(color),
            bg_color: bg_color,
            bg_colorText: this.displayColor(bg_color),
            showme: false,
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
    handleClose = () => {
    this.setState({ showme: false })
  	};

    
    displayColor = (hsbColor) => {
        let color = hsbToRgb(hsbColor);
        return color.red + "," + color.green + "," + color.blue;
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
						  selected={['Cart not empty']}
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
						  selected={['Cart and product Only (recommended)']}
						/>

                        </FormLayout.Group> 
                    </FormLayout>
                </Card>
            </Layout.Section>
            <Layout.AnnotatedSection
                title="Style Settings"
                description="Customize the style of the Upper Bar">
                <Card sectioned>
                    <FormLayout>
                        
                        <FormLayout.Group>
                        	<TextContainer>
		  					<Heading>Text Above Timer</Heading> 
		  					</TextContainer>
                        </FormLayout.Group>
                        
                         <FormLayout.Group >
                         	<Popover
							  active={this.state.showme}
							  activator={ 
							  	<button className="button" style={{
				                backgroundColor:hsbToHex(this.state.bg_color),
				      			 
							  	 }} 
							  	 onClick={(e) => this.onPropertyChange("showme", true)}
							  	 ></button>

							  			}
							  sectioned
							>

							  <FormLayout>

							  	<div style={ cover } onClick={ this.handleClose }/>
							    <ColorPicker
                                color={this.state.bg_color}
                                onChange={(e) => this.onPropertyChange("bg_color", e, () => this.onPropertyChange("bg_colorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showme", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
						</FormLayout.Group>
						<FormLayout.Group>
							<TextField
							        label="Background color"
							        value={this.state.bg_colorText}
							        onFocus={(e) => this.onPropertyChange("showme", true)}
							      /> 
                            <Select
                              label="Font"
                              placeholder="Select"
                              value={this.state.font}
                              options={[
                                {
                                  label: 'Raleway',
                                  value: 'Raleway',
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
                                  label: 'Orbitron',
                                  value: 'Orbitron',
                                },{
                                  label: 'Comfortaa',
                                  value: 'Comfortaa',
                                }
                              ]}
                              onChange={(e) => this.onPropertyChange("font", e) }
                            />
                            <TextField
							  label="font size"
							  type="number"
							  value={this.state.fontsize}
							  readOnly={false}
							  suffix="px"
							  onChange={(e) => this.onPropertyChange("fontsize", e) }
							/>
							
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
        </Layout>);
    }
}

export default ExitCoupon;