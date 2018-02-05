// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Layout, ColorPicker , hsbToHex , rgbToHsb, Checkbox, Select, Card, FormLayout, TextField,Heading, ChoiceList, Popover} from '@shopify/polaris';

class QuickView extends Component {
    constructor(props) {
        super(props);
      
        
        
        if(this.props.settings.quickview){
            this.state = this.props.settings.quickview;
        }
        else{
        this.state = {
            enable: true,
            redirect: "Cart",
            imgWidth: 345,
            popWidth: 800,
            popHeight: 500,
            maxWords: 30,
            QVBtnColorText: "#ffffff",
            QVBtnTxtColorText: "#ffffff",
            PriceColorText: "#ffffff",
            AToCBtnColorText: "#ffffff",
            ProductNameColorText: "#ffffff",
            showPriceColor: false,
            showQVBtnTxtColor: false,
            showmecouponTextColor: false,
            showQVBtnColor: false,
            showAToCBtnColor: false,
        };
         this.props.onSettingsChange("quickview", this.state);
     }
    		
    }
    componentDidMount(){ 
    	
        this.blurInputColor("QVBtnColorText","QVBtnColor");
        this.blurInputColor("QVBtnTxtColorText","QVBtnTxtColor");
        this.blurInputColor("PriceColorText","PriceColor");
        this.blurInputColor("AToCBtnColorText","AToCBtnColor");
        this.blurInputColor("ProductNameColorText","ProductNameColor");
    }
    
    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("quickview", value, property);
        });

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

    hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    };

    blurInputColor = (property, changeProperty) => {
        const colors = this.hexToRgb(this.state[property]);
        if (colors !== null && colors.length === 3) {
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
            			<FormLayout.Group condensed>
            			<TextField label="Quick View Button Text Color" 
  										value={this.state.QVBtnTxtColorText}
  								    	onChange={(e) => this.onPropertyChange("QVBtnTxtColorText", e) }
                                		onBlur={() => this.blurInputColor("QVBtnTxtColorText", "QVBtnTxtColor") }
  							/>
            			<Popover
							  active={this.state.showQVBtnTxtColor}
							  activator={ 
							  	<button className="powerify-button-color" style={{
				                backgroundColor:this.state.QVBtnTxtColorText,
				      			 
							  	 }} 
							  	 onClick={() => this.setState({showQVBtnTxtColor:true})}
							  	 ></button>

							  			}
							  sectioned
							>

							  <FormLayout>

							  	<div style={ cover }   onClick={() => this.setState({showQVBtnTxtColor:false}) }/>
							    <ColorPicker
                                color={this.state.QVBtnTxtColor}
                                onChange={(e) => this.onPropertyChange("QVBtnTxtColor", e, () => this.onPropertyChange("QVBtnTxtColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showQVBtnTxtColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>

							<TextField label="Quick View Button Color" 
  										value={this.state.QVBtnColorText}
  								    	onChange={(e) => this.onPropertyChange("QVBtnColorText", e) }
                                		onBlur={() => this.blurInputColor("QVBtnColorText", "QVBtnColor") }
  							/>
							<Popover
							  active={this.state.showQVBtnColor}
							  activator={ 
							  	<button className="powerify-button-color" style={{
				                backgroundColor:this.state.QVBtnColorText,
				      			 
							  	 }} 
							  	 onClick={() => this.setState({showQVBtnColor:true})}
							  	 ></button>

							  			}
							  sectioned>

							  <FormLayout>

							  	<div style={ cover }  onClick={() => this.setState({showQVBtnColor:false})} />
							    <ColorPicker
                                color={this.state.QVBtnColor}
                                onChange={(e) => this.onPropertyChange("QVBtnColor", e, () => this.onPropertyChange("QVBtnColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showQVBtnColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
							</FormLayout.Group>
							<FormLayout.Group condensed>
							<TextField label="Add to Cart Button Color" 
  										value={this.state.AToCBtnColorText}
										onChange={(e) => this.onPropertyChange("AToCBtnColorText", e) }
                                		onBlur={() => this.blurInputColor("AToCBtnColorText", "AToCBtnColor") }
                                		/>
							<Popover
							  active={this.state.showAToCBtnColor}
							  activator={ 
							  	<button className="powerify-button-color" style={{
				                backgroundColor:this.state.AToCBtnColorText,
				      			 
							  	 }} 
							  	 onClick={() => this.setState({showAToCBtnColor:true})}
							  	 ></button>

							  			}
							  sectioned>

							  <FormLayout>

							  	<div style={ cover }  onClick={() => this.setState({showAToCBtnColor:false})}/>
							    <ColorPicker
                                color={this.state.AToCBtnColor}
                                onChange={(e) => this.onPropertyChange("AToCBtnColor", e, () => this.onPropertyChange("AToCBtnColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showAToCBtnColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
							<TextField label="Product Name Color" 
  										value={this.state.ProductNameColorText}
										onChange={(e) => this.onPropertyChange("ProductNameColorText", e) }
                                		onBlur={() => this.blurInputColor("ProductNameColorText", "ProductNameColor") }  />
							<Popover
							  active={this.state.showProductNameColor}
							  activator={ 
							  	<button className="powerify-button-color" style={{
				                backgroundColor:this.state.ProductNameColorText,
				      			 
							  	 }} 
							  	 onClick={() => this.setState({showProductNameColor:true})}
							  	 ></button>

							  			}
							  sectioned>

							  <FormLayout>

							  	<div style={ cover } onClick={() => this.setState({showProductNameColor:false})}/>
							    <ColorPicker
                                color={this.state.ProductNameColor}
                                onChange={(e) => this.onPropertyChange("ProductNameColor", e, () => this.onPropertyChange("ProductNameColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showProductNameColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
							</FormLayout.Group>

							<FormLayout.Group condensed>
							<TextField label="Price Color" 
  										value={this.state.PriceColorText}
  								    	onChange={(e) => this.onPropertyChange("PriceColorText", e) }
                                		onBlur={() => this.blurInputColor("PriceColorText", "PriceColor") }
  							/>
							<Popover
							  active={this.state.showPriceColor}
							  activator={ 
							  	<button className="powerify-button-color" style={{
				                backgroundColor:this.state.PriceColorText,
				      			 
							  	 }} 
							  	 onClick={() => this.setState({showPriceColor:true})}
							  	 ></button>

							  			}
							  sectioned>

							  <FormLayout>

							  	<div style={ cover } onClick={() => this.setState({showPriceColor:false})}/>
							    <ColorPicker
                                color={this.state.PriceColor}
                                onChange={(e) => this.onPropertyChange("PriceColor", e, () => this.onPropertyChange("PriceColorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showPriceColor", false)}
                            	/>
							    
							  </FormLayout>
							</Popover>
            			</FormLayout.Group>
            	</Card>
            </Layout.Section>
        </Layout>);
    }
}

const mapStateToProps = (state) => {
    const {settings} = state;
    return{
        settings: settings
    }
};

export default connect(mapStateToProps, null) (QuickView);