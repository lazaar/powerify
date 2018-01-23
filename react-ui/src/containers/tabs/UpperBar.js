// @flow
import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './style.css';
import './fonts.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { connect } from 'react-redux';
import {Layout, ColorPicker, rgbToHsb,hsbToHex,   Select, Card, FormLayout, TextField, Checkbox, Popover} from '@shopify/polaris';

class UpperBar extends Component {
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

        if(this.props.settings.upperBar){
            this.state = this.props.settings.upperBar;
        }
        else{
            this.state = {
                enable: true,
                enableDate:false,
                font: "Chewy",
                selectedDate: moment(),
                text: "Free shipping / happy customer",
                color: color,
                colorText: this.displayColor(color),
                bg_color: bg_color,
                bg_colorText: this.displayColor(bg_color),
                showme: false,
                showmetoo: false,
            };
        }
    }

    
    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("upperBar", property, value);
        });

        if (typeof callback === "function") {
            callback();
        }
    };

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




    render() {
        const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
        }
        return (<Layout sectioned>
            <Layout.AnnotatedSection
                title="Display Upper Bar"
                description="Show/hide the Upper Bar">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            <Checkbox
                                checked={this.state.enable}
                                onChange={(e) => this.onPropertyChange("enable", e) }
                                label="Show Upper Bar"/>
                            <Checkbox
                                checked={this.state.enableDate}
                                onChange={(e) => this.onPropertyChange("enableDate", e) }
                                label="Enable date limit"/>
                        </FormLayout.Group>
                        {
                            this.state.enableDate && (
                                <div>
                                    <TextField
                                        label="Show Upper Bar until "
                                        value={this.state.selectedDate.format("YYYY/MM/DD HH:mm")}/>
                                    < DatePicker
                                    selected={this.state.selectedDate}
                                    onChange={(e) => this.onPropertyChange("selectedDate", e)}
                                    showTimeSelect
                                    inline
                                    minDate={moment()}
                                    timeIntervals={30}
                                    dateFormat="YYYY/MM/DD HH:mm"
                                    />
                                </div>
                            )
                        }
                        <TextField
                            label="Text"
                            value={this.state.text}
                            onChange={(e) => this.onPropertyChange("text", e) }
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
                                  label: 'Chewy',
                                  value: 'Chewy',
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
                                  label: 'Josefin Sans',
                                  value: 'Josefin Sans',
                                },{
                                  label: 'Comfortaa',
                                  value: 'Comfortaa',
                                },{
                                  label: 'Lobster',
                                  value: 'Lobster Two',
                                },{
                                  label: 'Quattrocento',
                                  value: 'Quattrocento Sans',
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
                              color:hsbToHex(this.state.color),
                              backgroundColor:hsbToHex(this.state.bg_color),
                              fontFamily: this.state.font
                            }}
                        >
                            {this.state.text} 
                        </div>
                        <FormLayout.Group condensed>
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
                            <TextField 
                                
                                type="text"
                                value={this.state.colorText}

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

export default connect(mapStateToProps, null)(UpperBar);



