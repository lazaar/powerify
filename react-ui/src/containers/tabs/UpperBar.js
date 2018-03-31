// @flow
import React, {Component} from 'react';
import './style.css';
import './fonts.css';
import { connect } from 'react-redux';
import {Layout, ColorPicker, rgbToHsb,hsbToHex,   Select, Card, FormLayout, TextField, Checkbox, Popover} from '@shopify/polaris';

class UpperBar extends Component {
    constructor(props) {
        super(props);

        if(this.props.settings.upperBar){
            this.state = this.props.settings.upperBar;
        }
        else{
            this.state = {
                enable: true,
                font: "Raleway",
                text: "Free shipping / happy customer",
                colorText: "#000000",
                bg_colorText: "#ffffff",
                link:""
            };
            this.props.onSettingsChange("upperBar", this.state);
        }
    }
    componentDidMount(){
        this.blurInputColor("colorText","color");
        this.blurInputColor("bg_colorText","bg_color");
    }
    
    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("upperBar", value, property);
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
        return (<Layout sectioned>
            <Layout.AnnotatedSection
                title="Display Upper Bar"
                description="Show/hide the Upper Bar">
                <Card sectioned>
                    <FormLayout>
                        <Checkbox
                            checked={this.state.enable}
                            onChange={(e) => this.onPropertyChange("enable", e) }
                            label="Show Upper Bar"/>
                        <TextField
                            label="Text"
                            value={this.state.text}
                            onChange={(e) => this.onPropertyChange("text", e)}
                            helpText=" use {country} to insert the visitor's country, and {flag} to use his flag "
                        />
                        <TextField
                            label="Link on upper bar click"
                            value={this.state.link}
                            onChange={(e) => this.onPropertyChange("link", e)}
                            helpText="Use a relative link in your store (ex: /cart to redirect to cart page)"
                        />
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
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
                title="Style Settings"
                description="Customize the style of the Upper Bar">
                <Card sectioned>
                    <FormLayout>
                        <div className="powerify_upper_bar"
                            style={{
                              color:this.state.colorText,
                              backgroundColor:this.state.bg_colorText,
                              fontFamily: this.state.font
                            }}
                        >
                            {this.state.text} 
                        </div>

                        <FormLayout.Group condensed>
                            <TextField label="Text Color"
                                       value={this.state.colorText}
                                       onChange={(e) => this.onPropertyChange("colorText", e) }
                                       onBlur={() => this.blurInputColor("colorText", "color") }
                            />
                            <Popover
                                active={this.state.textColorPopup}
                                activator={
                                   <button
                                      className="powerify-button-color"
                                      style={{backgroundColor:this.state.colorText}}
                                      onClick={() => this.setState({textColorPopup:true})}> </button>
                                }
                                sectioned>
                                <div className="powerify-color-overlay" onClick={() => this.setState({textColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.color}
                                    onChange={(e) => {
                                        this.setState({color:e});
                                        this.onPropertyChange("colorText",this.displayColor(e));
                                     }}
                                    onBlur={(e) => this.setState({textColorPopup:false})}/>
                            </Popover>
                             


                            <TextField
                                label="Background Color"
                                value={this.state.bg_colorText}
                                onChange={(e) => this.onPropertyChange("bg_colorText", e) }
                                onBlur={() => this.blurInputColor("bg_colorText", "bg_color") }
                            />
                            <Popover
                              active={this.state.backColorPopup}
                              activator={ 
                                <button
                                    className="powerify-button-color"
                                    style={{backgroundColor:this.state.bg_colorText}}
                                    onClick={() => this.setState({backColorPopup:true})}
                                 > </button>

                              }
                              sectioned>
                                <div className = "powerify-color-overlay" onClick={() => this.setState({backColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.bg_color}
                                    onChange={(e) => {
                                        this.setState({bg_color:e});
                                        this.onPropertyChange("bg_colorText",this.displayColor(e));
                                     }}
                                    onBlur={(e) => this.setState({backColorPopup:false})}
                                />
                            </Popover>
                            
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
        </Layout>);
    }
}

const mapStateToProps = (state) => {
    const {settings} = state;
    return{
        settings: settings
    }
};

export default connect(mapStateToProps, null)(UpperBar);



