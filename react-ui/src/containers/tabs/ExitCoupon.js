// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Layout, ColorPicker,Checkbox, rgbToHsb,hsbToHex,  Select, Card, FormLayout, TextField, ChoiceList, Popover} from '@shopify/polaris';

class ExitCoupon extends Component {
    constructor(props) {
        super(props);

        if(this.props.settings.exitCoupon){
            this.state = this.props.settings.exitCoupon;
        }
        else{
            this.state = {
                enableDesktop : true,
                onlyOnCart:['true'],
                onlyFirstTime:['true'],
                onlyOnNotEmptyCart : ['true'],
                delay : 0.5,
                font: "Raleway",
                firstline: "Get 10% off your purchase Today",
                secondline: "Coupon Code:",
                couponcode: "Giveme10",
                backgroundColorText:"#087c7e",
                firstColorText:"#ffffff",
                secondColorText:"#ffffff",
                couponColorText:"#ffbf00"
            };
            this.props.onSettingsChange("exitCoupon", this.state);
      }
    }

    componentDidMount(){
        this.blurInputColor("backgroundColorText","backgroundColor");
        this.blurInputColor("firstColorText","firstColor");
        this.blurInputColor("secondColorText","secondColor");
        this.blurInputColor("couponColorText","couponColor");
    }
    
    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("exitCoupon", value, property);
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

    hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    };


    render() {
        return (<Layout sectioned>
            <Layout.Section>
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group >
                            <Checkbox
                                checked={this.state.enableDesktop}
                                onChange={(e) => this.onPropertyChange("enableDesktop", e) }
                                label="Enable Exit Coupon"/>
                            <ChoiceList
                                title="Show the coupon only the first time"
                                choices={[
                                {
                                  label: 'Yes',
                                  value: 'true'
                                },
                                {
                                  label: 'No',
                                  value: 'falses'
                                }]}
                                onChange={(e) => this.onPropertyChange("onlyFirstTime", e) }
                                selected={this.state.onlyFirstTime}
                            />
                            <TextField
                                label="Delay before displaying (Seconds)"
                                type="number"
                                value={this.state.delay}
                                onChange={(e) => this.onPropertyChange("delay", e) }/>
                            <TextField
                                label="First Line"
                                type="text"
                                value={this.state.firstline}
                                onChange={(e) => this.onPropertyChange("firstline", e) }/>
                            <TextField
                              label="Second Line"
                              type="text"
                              value={this.state.secondline}
                              readOnly={false}
                              onChange={(e) => this.onPropertyChange("secondline", e) }/>
                            <TextField
                              label="Coupon code"
                              type="text"
                              value={this.state.couponcode}
                              onChange={(e) => this.onPropertyChange("couponcode", e) }/>
                            <ChoiceList
                              title="Shopping Cart value: (cart value condition for the popup to display)"
                              choices={[
                                {
                                  label: 'Any value (regardless of cart is empty or not)',
                                  value: 'false'
                                },
                                {
                                  label: 'Cart not empty',
                                  value: 'true'
                                }]}
                              onChange={(e) => this.onPropertyChange("onlyOnNotEmptyCart", e) }
                              selected={this.state.onlyOnNotEmptyCart}
                            />
                            <ChoiceList
                              title="Display on: "
                              choices={[
                                {
                                  label: 'All pages',
                                  value: 'false'
                                },
                                {
                                  label: 'Cart and product Only (recommended)',
                                  value: 'true'
                                }]}
                              onChange={(e) => this.onPropertyChange("onlyOnCart", e) }
                              selected={this.state.onlyOnCart}
                            />
                          </FormLayout.Group> 
                      </FormLayout>
                  </Card>
              </Layout.Section>



            <Layout.Section
                title="Style Settings"
                description="Customize the style of the Coupon Popup">
                <Card sectioned>
                    <FormLayout>
                        <div className = "template_selected_preview">
                            <div className = "coupon-select-preview" style = {{
                                      color:this.state.firstColorText,
                                      backgroundColor:this.state.backgroundColorText,
                                      fontFamily: this.state.font
                                    }} >
                                <div className = "coupon-wrapper-preview">
                                    <div className = "coupon-innerbox-preview">
                                        <h3 className = "coupon-title-preview" >{this.state.firstline} </h3>
                                        <br/>
                                        <h4 className="coupon-subtitle-preview " style={{color: this.state.secondColorText}}>{this.state.secondline} </h4>
                                        <div className="coupon-code-preview" style={{color:this.state.couponColorText}}> {this.state.couponcode} </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <FormLayout.Group>
                            <TextField label="Coupon background color"
                                       value={this.state.backgroundColorText}
                                       onChange={(e) => this.onPropertyChange("backgroundColorText", e) }
                                       onBlur={() => this.blurInputColor("backgroundColorText", "backgroundColor") }
                            />
                            <Popover
                                active={this.state.showBgColorPopup}
                                activator={
							  	<button
							  	    className="powerify-button-color"
							  	    style={{backgroundColor:this.state.backgroundColorText}}
							  	    onClick={() => this.setState({showBgColorPopup:true})}> </button>
                                }
                                sectioned>
                                <div className = "powerify-color-overlay" onClick={() => this.setState({showBgColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.backgroundColor}
                                    onChange={(e) => {
                                        this.setState({backgroundColor:e});
                                        this.onPropertyChange("backgroundColorText",this.displayColor(e));
                                     }}
                                    onBlur={(e) => this.setState({showBgColorPopup:false})}/>
                            </Popover>
                        </FormLayout.Group>

                        <FormLayout.Group>
                            <TextField label="First Line Color"
                                       value={this.state.firstColorText}
                                       onChange={(e) => this.onPropertyChange("firstColorText", e) }
                                       onBlur={() => this.blurInputColor("firstColorText", "firstColor") }
                            />
                            <Popover
                                active={this.state.showFirstColorPopup}
                                activator={
							  	<button
							  	    className="powerify-button-color"
							  	    style={{backgroundColor:this.state.firstColorText}}
							  	    onClick={() => this.setState({showFirstColorPopup:true})}> </button>
                                }
                                sectioned>
                                <div className = "powerify-color-overlay" onClick={() => this.setState({showFirstColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.firstColor}
                                    onChange={(e) => {
                                        this.setState({firstColor:e});
                                        this.onPropertyChange("firstColorText",this.displayColor(e));
                                     }}
                                    onBlur={(e) => this.setState({showFirstColorPopup:false})}/>
                            </Popover>
                        </FormLayout.Group>

                        <FormLayout.Group>
                            <TextField label="Second Line Color"
                                       value={this.state.secondColorText}
                                       onChange={(e) => this.onPropertyChange("secondColorText", e) }
                                       onBlur={() => this.blurInputColor("secondColorText", "secondColor") }
                            />
                            <Popover
                                active={this.state.showSecondColorPopup}
                                activator={
							  	<button
							  	    className="powerify-button-color"
							  	    style={{backgroundColor:this.state.secondColorText}}
							  	    onClick={() => this.setState({showSecondColorPopup:true})}> </button>
                                }
                                sectioned>
                                <div className = "powerify-color-overlay" onClick={() => this.setState({showSecondColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.secondColor}
                                    onChange={(e) => {
                                        this.setState({secondColor:e});
                                        this.onPropertyChange("secondColorText",this.displayColor(e));
                                     }}
                                    onBlur={(e) => this.setState({showSecondColorPopup:false})}/>
                            </Popover>
                        </FormLayout.Group>

                        <FormLayout.Group>
                            <TextField label="Coupon Text Color"
                                       value={this.state.couponColorText}
                                       onChange={(e) => this.onPropertyChange("secondColorText", e) }
                                       onBlur={() => this.blurInputColor("couponColorText", "couponColor") }
                            />
                            <Popover
                                active={this.state.showCouponColorPopup}
                                activator={
							  	<button
							  	    className="powerify-button-color"
							  	    style={{backgroundColor:this.state.couponColorText}}
							  	    onClick={() => this.setState({showCouponColorPopup:true})}> </button>
                                }
                                sectioned>
                                <div className = "powerify-color-overlay" onClick={() => this.setState({showCouponColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.couponColor}
                                    onChange={(e) => {
                                        this.setState({couponColor:e});
                                        this.onPropertyChange("couponColorText",this.displayColor(e));
                                     }}
                                    onBlur={(e) => this.setState({showCouponColorPopup:false})}/>
                            </Popover>
                        </FormLayout.Group>

                        <Select
                            label="Font"
                            placeholder="Select"
                            value={this.state.font}
                            options={[
                                {
                                  label: 'Raleway',
                                  value: 'Raleway'
                                },{
                                  label: 'Chewy',
                                  value: 'Chewy'
                                },{
                                  label: 'Montserrat',
                                  value: 'Montserrat'
                                },{
                                  label: 'Titillium',
                                  value: 'Titillium'
                                },{
                                  label: 'Pacifico',
                                  value: 'Pacifico'
                                },{
                                  label: 'Josefin Sans',
                                  value: 'Josefin Sans'
                                },{
                                  label: 'Comfortaa',
                                  value: 'Comfortaa'
                                },{
                                  label: 'Lobster',
                                  value: 'Lobster Two'
                                },{
                                  label: 'Quattrocento',
                                  value: 'Quattrocento Sans'
                                }
                              ]}
                            onChange={(e) => this.onPropertyChange("font", e) }
                        />
                    </FormLayout>
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

export default connect(mapStateToProps, null)(ExitCoupon);