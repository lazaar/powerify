// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Layout, ColorPicker,Checkbox, rgbToHsb,hsbToHex, Card, FormLayout, TextField, Popover} from '@shopify/polaris';

class ImageReviews extends Component {
    constructor(props) {
        super(props);
        
        if(this.props.settings.imagereviews){
            this.state = this.props.settings.imagereviews;
        }
        else{
            this.state = {
                enable : true,
                errorMessage:"Error on saving review",
                successMessage:"Review Added, Thanks !",
                bgColorText:"#000000",
                submitColorText:"#FFFFFF"
            };
            this.props.onSettingsChange("imagereviews", this.state);
      }
    }
    componentDidMount(){
        this.blurInputColor("bgColorText","bgColor");
        this.blurInputColor("submitColorText","submitColor");
    }

    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("imagereviews", value, property);
        });
        if (typeof callback === "function") {
            callback();
        }
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
                title="Image Reviews Settings"
                description="Show/hide the form">
                <Card sectioned>
                    <FormLayout>
                        <Checkbox
                            checked={this.state.enable}
                            onChange={(e) => this.onPropertyChange("enable", e) }
                            label="Enable Image Reviews"/>
                        <FormLayout.Group>
                            <TextField label="Adding review message"
                                       value={this.state.successMessage}
                                       onChange={(e) => this.onPropertyChange("successMessage", e) }
                            />
                            <TextField label="Adding review error message"
                                       value={this.state.errorMessage}
                                       onChange={(e) => this.onPropertyChange("errorMessage", e) }
                            />
                        </FormLayout.Group>
                        <FormLayout.Group>
                            <TextField label="Button background color"
                                       value={this.state.bgColorText}
                                       onChange={(e) => this.onPropertyChange("bgColorText", e) }
                                       onBlur={() => this.blurInputColor("bgColorText", "bgColor") }
                            />
                            <Popover
                                active={this.state.showBgColorPopup}
                                activator={
          							  	<button
          							  	    className="powerify-button-color"
          							  	    style={{backgroundColor:this.state.bgColorText}}
          							  	    onClick={() => this.setState({showBgColorPopup:true})}> </button>
                                }
                                sectioned>
                                <div className = "powerify-color-overlay" onClick={() => this.setState({showBgColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.bgColor}
                                    onChange={(e) => {
                                        this.setState({bgColor:e});
                                        this.onPropertyChange("bgColorText",this.displayColor(e));
                                     }}
                                    onBlur={(e) => this.setState({showBgColorPopup:false})}/>
                            </Popover>
                        </FormLayout.Group>
                        <FormLayout.Group>
                            <TextField label="Button text color"
                                       value={this.state.submitColorText}
                                       onChange={(e) => this.onPropertyChange("submitColorText", e) }
                                       onBlur={() => this.blurInputColor("submitColorText", "submitColor") }
                            />
                            <Popover
                                active={this.state.showSubmitColorPopup}
                                activator={
          							  	<button
          							  	    className="powerify-button-color"
          							  	    style={{backgroundColor:this.state.submitColorText}}
          							  	    onClick={() => this.setState({showSubmitColorPopup:true})}> </button>
                                }
                                sectioned>
                                <div className = "powerify-color-overlay" onClick={() => this.setState({showSubmitColorPopup:false})}> </div>
                                <ColorPicker
                                    color={this.state.submitColor}
                                    onChange={(e) => {
                                        this.setState({submitColor:e});
                                        this.onPropertyChange("submitColorText",this.displayColor(e));
                                     }}
                                    onBlur={(e) => this.setState({showSubmitColorPopup:false})}/>
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

export default connect(mapStateToProps, null)(ImageReviews);