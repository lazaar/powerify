// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Layout,
    ColorPicker,
    hsbToHex,
    rgbToHsb,
    Checkbox,
    Select,
    Card,
    FormLayout,
    TextField,
    ChoiceList,
    Popover
} from '@shopify/polaris';

class QuickView extends Component {
    constructor(props) {
        super(props);
        if (this.props.settings.quickview) {
            this.state = this.props.settings.quickview;
        }
        else {
            this.state = {
                enable: true,
                redirect: "cart",
                position:'center',
                viewDetailPageText:"View full product details",
                addToCartText:"Add to cart",

                QVBtnColorText: "#000000",
                QVBtnTxtColorText: "#ffffff",
                PriceColorText: "#000000",
                AToCBtnColorText: "#000000",
                ProductNameColorText: "#000000"
            };
            this.props.onSettingsChange("quickview", this.state);
        }

    }

    componentDidMount() {

        this.blurInputColor("QVBtnColorText", "QVBtnColor");
        this.blurInputColor("QVBtnTxtColorText", "QVBtnTxtColor");
        this.blurInputColor("PriceColorText", "PriceColor");
        this.blurInputColor("AToCBtnColorText", "AToCBtnColor");
        this.blurInputColor("ProductNameColorText", "ProductNameColor");
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
        this.setState({[property]: false})
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
        return (<Layout sectioned>
            <Layout.Section>
                <Card sectioned
                      title="General Settings">
                    <FormLayout>
                        <FormLayout.Group >
                            <Checkbox label="Enable Quick View"
                                      checked={this.state.enable}
                                      onChange={(e) => this.onPropertyChange("enable",e)}
                            />
                            <Select
                                label="Quick View Button Position:"
                                options={[
                                    {
                                      label: 'Top',
                                      value: 'top'
                                    },
                                    {
                                      label: 'Center',
                                      value: 'center'
                                    },
                                    {
                                      label: 'Bottom',
                                      value: 'bottom'
                                    }
                                 ]}
                                value={this.state.position}
                                onChange={(e) => this.onPropertyChange("position",e)}
                            />
                            <ChoiceList
                                title="After the item is added, the visitor  "
                                choices={[
							    {
							      label: 'is redirected to Cart Page',
							      value: 'cart'
							    },
							    {
							      label: 'Continue Shopping',
							      value: 'close'
							    }
							  ]}
                                selected={this.state.redirect}
                                onChange={(e) => this.onPropertyChange("redirect",e)}
                            />
                        </FormLayout.Group>

                        <FormLayout.Group >
                            <TextField
                                label="Add to cart text"
                                type="text"
                                value={this.state.addToCartText}
                                onChange={(e) => this.onPropertyChange("addToCartText", e) }
                            />
                            <TextField
                                label="View detail page text"
                                type="text"
                                value={this.state.viewDetailPageText}
                                onChange={(e) => this.onPropertyChange("viewDetailPageText", e) }
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
                                   <button
                                      className="powerify-button-color"
                                      style={{backgroundColor:this.state.QVBtnTxtColorText}}
                                      onClick={() => this.setState({showQVBtnTxtColor:true})}> </button>
                                }
                            sectioned>
                            <div className="powerify-color-overlay" onClick={() => this.setState({showQVBtnTxtColor:false})}> </div>
                            <ColorPicker
                                color={this.state.QVBtnTxtColor}
                                onChange={(e) => {
                                        this.setState({QVBtnTxtColor:e});
                                        this.onPropertyChange("QVBtnTxtColorText",this.displayColor(e));
                                     }}
                                onBlur={(e) => this.setState({showQVBtnTxtColor:false})}/>
                        </Popover>

                        <TextField label="Quick View Button Color"
                                   value={this.state.QVBtnColorText}
                                   onChange={(e) => this.onPropertyChange("QVBtnColorText", e) }
                                   onBlur={() => this.blurInputColor("QVBtnColorText", "QVBtnColor") }
                        />
                        <Popover
                            active={this.state.showQVBtnColor}
                            activator={
                                   <button
                                      className="powerify-button-color"
                                      style={{backgroundColor:this.state.QVBtnColorText}}
                                      onClick={() => this.setState({showQVBtnColor:true})}> </button>
                                }
                            sectioned>
                            <div className="powerify-color-overlay" onClick={() => this.setState({showQVBtnColor:false})}> </div>
                            <ColorPicker
                                color={this.state.QVBtnColor}
                                onChange={(e) => {
                                        this.setState({QVBtnColor:e});
                                        this.onPropertyChange("QVBtnColorText",this.displayColor(e));
                                     }}
                                onBlur={(e) => this.setState({showQVBtnColor:false})}/>
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
                                   <button
                                      className="powerify-button-color"
                                      style={{backgroundColor:this.state.AToCBtnColorText}}
                                      onClick={() => this.setState({showAToCBtnColor:true})}> </button>
                                }
                            sectioned>
                            <div className="powerify-color-overlay" onClick={() => this.setState({showAToCBtnColor:false})}> </div>
                            <ColorPicker
                                color={this.state.AToCBtnColor}
                                onChange={(e) => {
                                        this.setState({AToCBtnColor:e});
                                        this.onPropertyChange("AToCBtnColorText",this.displayColor(e));
                                     }}
                                onBlur={(e) => this.setState({showAToCBtnColor:false})}/>
                        </Popover>
                        <TextField label="Product Name Color"
                                   value={this.state.ProductNameColorText}
                                   onChange={(e) => this.onPropertyChange("ProductNameColorText", e) }
                                   onBlur={() => this.blurInputColor("ProductNameColorText", "ProductNameColor") }
                        />
                        <Popover
                            active={this.state.showProductNameColor}
                            activator={
                                   <button
                                      className="powerify-button-color"
                                      style={{backgroundColor:this.state.ProductNameColorText}}
                                      onClick={() => this.setState({showProductNameColor:true})}> </button>
                                }
                            sectioned>
                            <div className="powerify-color-overlay" onClick={() => this.setState({showProductNameColor:false})}> </div>
                            <ColorPicker
                                color={this.state.ProductNameColor}
                                onChange={(e) => {
                                        this.setState({ProductNameColor:e});
                                        this.onPropertyChange("ProductNameColorText",this.displayColor(e));
                                     }}
                                onBlur={(e) => this.setState({showProductNameColor:false})}/>
                        </Popover>
                    </FormLayout.Group>
                    <FormLayout.Group>
                        <TextField label="Price Color"
                                   value={this.state.PriceColorText}
                                   onChange={(e) => this.onPropertyChange("PriceColorText", e) }
                                   onBlur={() => this.blurInputColor("PriceColorText", "PriceColor") }
                        />
                        <Popover
                            active={this.state.showPriceColor}
                            activator={
                                       <button
                                          className="powerify-button-color"
                                          style={{backgroundColor:this.state.PriceColorText}}
                                          onClick={() => this.setState({showPriceColor:true})}> </button>
                                    }
                            sectioned>
                            <div className="powerify-color-overlay" onClick={() => this.setState({showPriceColor:false})}> </div>
                            <ColorPicker
                                color={this.state.PriceColor}
                                onChange={(e) => {
                                            this.setState({PriceColor:e});
                                            this.onPropertyChange("PriceColorText",this.displayColor(e));
                                         }}
                                onBlur={(e) => this.setState({showPriceColor:false})}/>
                        </Popover>
                    </FormLayout.Group>

                </Card>
            </Layout.Section>
        </Layout>);
    }
}

const mapStateToProps = (state) => {
    const {settings} = state;
    return {
        settings: settings
    }
};

export default connect(mapStateToProps, null)(QuickView);