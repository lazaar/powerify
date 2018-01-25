// @flow
import { connect } from 'react-redux';
import React, {Component} from 'react';
import {Layout, ColorPicker, rgbToHsb, hsbToHex, Popover, Select, Card, FormLayout, TextField, Checkbox} from '@shopify/polaris';

class Buyme extends Component {
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
       
        if(this.props.settings.buyme){
            this.state = this.props.settings.buyme;
        }
        else{
        this.state = {

            backgroundTheme: "Dark Theme",
            position: "top",
            Size: "Medium",
            callToAction: "Buy Now",
            enable: true,
            color: color,
            colorText: this.displayColor(color),
            bg_color: bg_color,
            bg_colorText: this.displayColor(bg_color),
            showme: false,
            showmetoo: false,
            
        };
        }
    }
      handleClose = () => {
    this.setState({ showme: false })
    };

    handleCloseToo = () => {
    this.setState({ showmetoo: false })
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

    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("buyme", value, property);
        });
        if (typeof callback === "function") {
            callback();
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
        return (
        <Layout sectioned>
            <Layout.AnnotatedSection
                title="Settings"
                description="">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            <Checkbox
                                checked={this.state.enable}
                                onChange={(e) => this.onPropertyChange("enable", e) }
                                label="Enable Sticky add to cart "/>
                            <TextField
                            label="Call to Action"
                            value={this.state.callToAction}
                            onChange={(e) => this.onPropertyChange("callToAction", e) }
                            />
                            <Select
                              label="Choose the position"
                              value={this.state.position}
                              options={[
                                {
                                  label: 'Show at top',
                                  value: 'top',
                                },{
                                  label: 'Show at bottom',
                                  value: 'bottom',
                                }
                                     ]}
                              onChange={(e) => this.onPropertyChange("position", e) }
                            />
 
                            <Select
                              label="Size"
                              value={this.state.Size}
                              options={[
                                {
                                  label: 'Small ',
                                  value: '40px',
                                },{
                                  label: 'Medium ',
                                  value: '50px',
                                },{
                                  label: 'Big ',
                                  value: '60px',
                                },{
                                  label: 'Very big ',
                                  value: '70px',
                                }
                                     ]}
                              onChange={(e) => this.onPropertyChange("Size", e) }
                            />
                            <Popover
                              active={this.state.showme}
                              activator={ 
                                <button className="button" style={{
                                backgroundColor:hsbToHex(this.state.color),
                                 
                                 }} 
                                 onClick={(e) => this.onPropertyChange("showme", true)}
                                 ></button>

                                        }
                              sectioned
                            >

                              <FormLayout>

                                <div style={ cover } onClick={ this.handleClose }/>
                                <ColorPicker
                                color={this.state.color}
                                onChange={(e) => this.onPropertyChange("color", e, () => this.onPropertyChange("colorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showme", false)}
                                />
                                
                              </FormLayout>
                            </Popover>

                            <Popover
                              active={this.state.showmetoo}
                              activator={ 
                                <button className="button" style={{
                                backgroundColor:hsbToHex(this.state.bg_color),
                                 
                                 }} 
                                 onClick={(e) => this.onPropertyChange("showmetoo", true)}
                                 ></button>
                                        }
                              sectioned
                            >

                              <FormLayout>

                                <div style={ cover } onClick={ this.handleCloseToo }/>
                                <ColorPicker
                                color={this.state.bg_color}
                                onChange={(e) => this.onPropertyChange("bg_color", e, () => this.onPropertyChange("bg_colorText", this.displayColor(e)))}
                                onBlur={(e) => this.onPropertyChange("showmetoo", false)}
                                />
                                
                              </FormLayout>
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

export default connect(mapStateToProps, null)(Buyme);
