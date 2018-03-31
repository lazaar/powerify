// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Layout, rgbToHsb,hsbToHex, Checkbox, Popover, ColorPicker, Select, Card, FormLayout, TextField,} from '@shopify/polaris';

class Upsell extends Component {
    constructor(props) {
        super(props);
       
        if(false){
            this.state = this.props.settings.upsell;
        }
        else{
            this.state = {
                enable: true,
                title:"Want to add one of these?",
                subtitle:"Based on what's in your cart we thought you might want grab one of these items too.",
                titleColor:"#000000",
                titleFontSize:"15",
                titleFont:"inherit",
                successMessage:"Product Added!",

                btnColor:"#FFFFFF",
                btnFont:"inherit",
                btnBackgroundColor:"#000000",
                btnText:"Got to checkout",

                priceColor:"#000000",
                priceFontSize:"15",
                addToCartColor:"#FFFFFF",
                addToCartText:"Add to cart",
                addToCartBgColor:"#000000"
            };
            this.props.onSettingsChange("upsell", this.state);
        }

    }
    componentDidMount(){
        this.blurInputColor("titleColor","titleColorHSB");
        this.blurInputColor("btnColor","btnColorHSB");
        this.blurInputColor("btnBackgroundColor","btnBackgroundColorHSB");
        this.blurInputColor("priceColor","priceColorHSB");
        this.blurInputColor("addToCartColor","addToCartColorHSB");
        this.blurInputColor("addToCartBgColor","addToCartBgColorHSB");
    }

    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("upsell", value, property);
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
        return (
        <Layout sectioned>
            <Layout.Section
                title="Settings"
                description="">
                <Card sectioned title="Upsell general settings">
                    <FormLayout>
                        <Checkbox
                            checked={this.state.enable}
                            onChange={(e) => this.onPropertyChange("enable", e) }
                            label="Enable Upsell"/>
                        <TextField
                            label="Title"
                            type="text"
                            value={this.state.title}
                            onChange={(e) => this.onPropertyChange("title", e) }
                        />
                        <FormLayout.Group>
                            <Select
                                label="Title Font"
                                placeholder="Select"
                                value={this.state.titleFont}
                                options={[
                                     {
                                      label: 'By default',
                                      value: 'inherit'
                                    },{
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
                                onChange={(e) => this.onPropertyChange("titleFont", e) }
                            />
                            <TextField
                                label="Title Font size"
                                type="number"
                                value={this.state.titleFontSize}
                                readOnly={false}
                                suffix="px"
                                onChange={(e) => this.onPropertyChange("titleFontSize", e) }

                            />
                        </FormLayout.Group>
                        <FormLayout.Group>
                            <TextField label="Title Color"
                                       value={this.state.titleColor}
                                       onChange={(e) => this.onPropertyChange("titleColor", e) }
                                       onBlur={() => this.blurInputColor("titleColor", "titleColorHSB") }
                            />
                            <Popover
                                active={this.state.titleColorPopup}
                                activator={
                                       <button
                                          className="powerify-button-color"
                                          style={{backgroundColor:this.state.titleColor}}
                                          onClick={() => this.setState({titleColorPopup:true})}> </button>
                                    }
                                sectioned>
                                <div className="powerify-color-overlay" onClick={() => this.setState({titleColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.titleColorHSB}
                                    onChange={(e) => {
                                            this.setState({titleColorHSB:e});
                                            this.onPropertyChange("titleColor",this.displayColor(e));
                                         }}
                                    onBlur={(e) => this.setState({titleColorPopup:false})}/>
                            </Popover>
                        </FormLayout.Group>

                        <TextField
                            label="Subtitle"
                            type="text"
                            multiline={3}
                            value={this.state.subtitle}
                            onChange={(e) => this.onPropertyChange("subtitle", e) }
                        />
                        <TextField
                            label="Product added message"
                            type="text"
                            value={this.state.successMessage}
                            onChange={(e) => this.onPropertyChange("successMessage", e) }
                        />
                    </FormLayout>
                </Card>
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            <TextField
                                label="Button Text"
                                type="text"
                                value={this.state.btnText}
                                onChange={(e) => this.onPropertyChange("btnText", e) }
                            />
                            <Select
                                label="Button Font"
                                placeholder="Select"
                                value={this.state.btnFont}
                                options={[
                                     {
                                      label: 'By default',
                                      value: 'inherit'
                                    },{
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
                                onChange={(e) => this.onPropertyChange("btnFont", e) }
                            />
                        </FormLayout.Group>
                        <FormLayout.Group>
                            <TextField label="Button text Color"
                                       value={this.state.btnColor}
                                       onChange={(e) => this.onPropertyChange("btnColor", e) }
                                       onBlur={() => this.blurInputColor("btnColor", "btnColorHSB") }
                            />
                            <Popover
                                active={this.state.btnColorPopup}
                                activator={
                                       <button
                                          className="powerify-button-color"
                                          style={{backgroundColor:this.state.btnColor}}
                                          onClick={() => this.setState({btnColorPopup:true})}> </button>
                                    }
                                sectioned>
                                <div className="powerify-color-overlay" onClick={() => this.setState({btnColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.btnColorHSB}
                                    onChange={(e) => {
                                            this.setState({btnColorHSB:e});
                                            this.onPropertyChange("btnColor",this.displayColor(e));
                                         }}
                                    onBlur={(e) => this.setState({btnColorPopup:false})}/>
                            </Popover>

                            <TextField label="Button background Color"
                                       value={this.state.btnBackgroundColor}
                                       onChange={(e) => this.onPropertyChange("btnBackgroundColor", e) }
                                       onBlur={() => this.blurInputColor("btnBackgroundColor", "btnBackgroundColorHSB") }
                            />
                            <Popover
                                active={this.state.btnBackgroundColorPopup}
                                activator={
                                       <button
                                          className="powerify-button-color"
                                          style={{backgroundColor:this.state.btnBackgroundColor}}
                                          onClick={() => this.setState({btnBackgroundColorPopup:true})}> </button>
                                    }
                                sectioned>
                                <div className="powerify-color-overlay" onClick={() => this.setState({btnBackgroundColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.btnBackgroundColorHSB}
                                    onChange={(e) => {
                                            this.setState({btnBackgroundColorHSB:e});
                                            this.onPropertyChange("btnBackgroundColor",this.displayColor(e));
                                         }}
                                    onBlur={(e) => this.setState({btnBackgroundColorPopup:false})}/>
                            </Popover>
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            <TextField label="Price Color"
                                       value={this.state.priceColor}
                                       onChange={(e) => this.onPropertyChange("priceColor", e) }
                                       onBlur={() => this.blurInputColor("priceColor", "priceColorHSB") }
                            />
                            <Popover
                                active={this.state.priceColorPopup}
                                activator={
                                       <button
                                          className="powerify-button-color"
                                          style={{backgroundColor:this.state.priceColor}}
                                          onClick={() => this.setState({priceColorPopup:true})}> </button>
                                    }
                                sectioned>
                                <div className="powerify-color-overlay" onClick={() => this.setState({priceColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.priceColorHSB}
                                    onChange={(e) => {
                                            this.setState({priceColorHSB:e});
                                            this.onPropertyChange("priceColor",this.displayColor(e));
                                         }}
                                    onBlur={(e) => this.setState({priceColorPopup:false})}/>
                            </Popover>
                            <TextField
                                label="Price Font size"
                                type="number"
                                value={this.state.priceFontSize}
                                readOnly={false}
                                suffix="px"
                                onChange={(e) => this.onPropertyChange("priceFontSize", e) }

                            />
                        </FormLayout.Group>


                        <TextField
                            label="Add To cart Text"
                            type="text"
                            value={this.state.addToCartText}
                            onChange={(e) => this.onPropertyChange("addToCartText", e) }
                        />
                        <FormLayout.Group>
                            <TextField label="Add to cart background color"
                                       value={this.state.addToCartBgColor}
                                       onChange={(e) => this.onPropertyChange("addToCartBgColor", e) }
                                       onBlur={() => this.blurInputColor("addToCartBgColor", "addToCartBgColorHSB") }
                            />
                            <Popover
                                active={this.state.addToCartBgColorPopup}
                                activator={
                                       <button
                                          className="powerify-button-color"
                                          style={{backgroundColor:this.state.addToCartBgColor}}
                                          onClick={() => this.setState({addToCartBgColorPopup:true})}> </button>
                                    }
                                sectioned>
                                <div className="powerify-color-overlay" onClick={() => this.setState({addToCartBgColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.addToCartBgColorHSB}
                                    onChange={(e) => {
                                            this.setState({addToCartBgColorHSB:e});
                                            this.onPropertyChange("addToCartBgColor",this.displayColor(e));
                                         }}
                                    onBlur={(e) => this.setState({addToCartBgColorPopup:false})}/>
                            </Popover>

                            <TextField label="Add to cart text color"
                                       value={this.state.addToCartColor}
                                       onChange={(e) => this.onPropertyChange("addToCartColor", e) }
                                       onBlur={() => this.blurInputColor("addToCartColor", "addToCartColorHSB") }
                            />
                            <Popover
                                active={this.state.addToCartColorPopup}
                                activator={
                                       <button
                                          className="powerify-button-color"
                                          style={{backgroundColor:this.state.addToCartColor}}
                                          onClick={() => this.setState({addToCartColorPopup:true})}> </button>
                                    }
                                sectioned>
                                <div className="powerify-color-overlay" onClick={() => this.setState({addToCartColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.addToCartColorHSB}
                                    onChange={(e) => {
                                            this.setState({addToCartColorHSB:e});
                                            this.onPropertyChange("addToCartColor",this.displayColor(e));
                                         }}
                                    onBlur={(e) => this.setState({addToCartColorPopup:false})}/>
                            </Popover>
                        </FormLayout.Group>
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

export default connect(mapStateToProps, null)(Upsell);

