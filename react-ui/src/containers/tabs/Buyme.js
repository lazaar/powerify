// @flow
import { connect } from 'react-redux';
import React, {Component} from 'react';
import {Layout, ColorPicker, rgbToHsb, hsbToHex, Popover, Select, Card, FormLayout, TextField, Checkbox} from '@shopify/polaris';

class Buyme extends Component {
    constructor(props) {
        super(props);
        
       
        if(false){
            this.state = this.props.settings.buyme;
        }
        else{
        this.state = {

            backgroundTheme: "Dark Theme",
            position: "top",
            Size: "50px",
            callToAction: "Buy Now",
            enable: true,
            colorText: "#ffffff",
            bg_colorText: "#ffffff",
            showme: false,
            showmetoo: false,
            
        };
         this.props.onSettingsChange("buyme", this.state);

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
            this.props.onSettingsChange("buyme", value, property);
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
                            <TextField label="Chose Call to Action color" 
                               value={this.state.colorText}
                               onChange={(e) => this.onPropertyChange("colorText", e) }
                               onBlur={() => this.blurInputColor("colorText", "color") }
                            />
                          <Popover
                            active={this.state.showme}
                            activator={ 
                              <button className="powerify-button-color" style={{
                                    backgroundColor:this.state.colorText,
                                 
                               }}
                               onClick={() => this.setState({showme:true})} 
                               ></button>

                                  }
                            sectioned
                          >

                            <FormLayout>

                              <div style={ cover } onClick={() => this.setState({showme:false})} />
                              <ColorPicker
                                            color={this.state.color}
                                            onChange={(e) => this.onPropertyChange("color", e, () => this.onPropertyChange("colorText", this.displayColor(e)))}
                                            onBlur={(e) => this.onPropertyChange("showme", false)}
                                          />
                              
                            </FormLayout>
                          </Popover>

                            
                              <TextField label="Chose button color" 
                               value={this.state.bg_colorText}
                               onChange={(e) => this.onPropertyChange("bg_colorText", e) }
                               onBlur={() => this.blurInputColor("bg_colorText", "bg_color") }
                            />
                              <Popover
                            active={this.state.showmetoo}
                            activator={ 
                              <button className="powerify-button-color" style={{
                                    backgroundColor:this.state.bg_colorText,
                                 
                               }} 
                               onClick={() => this.setState({showmetoo:true})} 
                               ></button>
                                  }
                            sectioned
                               >

                            <FormLayout>

                              <div style={ cover } onClick={() => this.setState({showmetoo:false})} />
                              <ColorPicker
                                            color={this.state.bg_color}
                                            onChange={(e) => this.onPropertyChange("bg_color", e, () => this.onPropertyChange("bg_colorText", this.displayColor(e)))}
                                            onBlur={(e) => this.onPropertyChange("showmetoo", false)}
                                          />
                              
                            </FormLayout>
                          </Popover>
                          <button style={{ width: 250, height: this.state.Size, backgroundColor: this.state.bg_colorText, fontSize: 20, color: this.state.colorText}}> {this.state.callToAction} </button>

				            
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
