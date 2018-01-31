// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Layout, ColorPicker, Checkbox, Popover, rgbToHsb,hsbToHex,  Select, Card, FormLayout, TextField, Heading} from '@shopify/polaris';


class Scarcity extends Component {
    constructor(props) {
        super(props);

        if(this.props.settings.scarcity){
            this.state = this.props.settings.scarcity;
        }
        else{
            this.state = {
                enable:true,
                font: "Chewy",
                fontweight: "bold",
                fontsize: 20,
                textalign: "center",
                scarcityStyle: "Flipper",
                colorText: "#FFFFFF"
            };
            this.props.onSettingsChange("scarcity", this.state);
      }
    }

    componentDidMount(){
        this.blurInputColor("colorText","color");
    }
    
    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("scarcity", value, property);
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
            <Layout.AnnotatedSection
                title="Style Settings"
                description="Customize the style of the Upper Bar">
                <Card sectioned>
                    <FormLayout>
                    <Checkbox
                        checked={this.state.enable}
                        onChange={(e) => this.onPropertyChange("enable", e) }
                        label="Enable Scarcity"/>
                    <Select
                          label="Style"
                          placeholder="Select"
                          value={this.state.scarcityStyle}
                          options={[
                            {
                              label: 'Simple Timer',
                              value: 'Simple'
                            },{
                              label: 'FlipClock',
                              value: 'FlipClock'
                            },{
                              label: 'Flipper',
                              value: 'Flipper'
                            }
                          ]}
                          onChange={(e) => this.onPropertyChange("scarcityStyle", e) }
                        />
                        <Heading>Text Above Timer</Heading>
                        <FormLayout.Group>
                            <TextField label="Text Color"
                                       value={this.state.colorText}
                                       onChange={(e) => this.onPropertyChange("colorText", e) }
                                       onBlur={() => this.blurInputColor("colorText", "color") }
                            />
                            <Popover
                                active={this.state.showColorPopup}
                                activator={
                                            <button
                                                className="powerify-button-color"
                                                style={{backgroundColor:this.state.colorText}}
                                                onClick={() => this.setState({showColorPopup:true})}> </button>
                                    }
                                sectioned>
                                <div className = "powerify-color-overlay" onClick={() => this.setState({showColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.color}
                                    onChange={(e) => {
                                            this.setState({color:e});
                                            this.onPropertyChange("colorText",this.displayColor(e));
                                         }}
                                    onBlur={(e) => this.setState({showColorPopup:false})}/>
                            </Popover>
                        </FormLayout.Group>
                         <FormLayout.Group condensed>

                            <Select
                              label="Font"
                              placeholder="Select"
                              value={this.state.font}
                              options={[
                                {
                                  label: 'Raleway',
                                  value: 'Raleway'
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
                                  label: 'Orbitron',
                                  value: 'Orbitron'
                                },{
                                  label: 'Comfortaa',
                                  value: 'Comfortaa'
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
                            <Select
                              label="Text Align"
                              value={this.state.textalign}
                              options={[
                                'left',
                                'center',
                                'right'
                              ]}
                                onChange={(e) => this.onPropertyChange("textalign", e) }
                              placeholder="Select"
                            />
                            <Select
                              label="Font Weight"
                              value={this.state.fontweight}
                              options={[
                                'normal',
                                'bold'
                              ]}
                             onChange={(e) => this.onPropertyChange("fontweight", e) }
                            />

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

export default connect(mapStateToProps, null)(Scarcity);
