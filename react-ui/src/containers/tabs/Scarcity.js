// @flow
import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './style.css';
import './fonts.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Layout, ColorPicker, hsbToRgb,rgbToHsb,hsbToHex,  Select, Card, FormLayout, TextField, Checkbox} from '@shopify/polaris';

class Scarcity extends Component {
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
        this.state = {
            enable: true,
            enableDate:false,
            font: "Chewy",
            selectedDate: moment(),
            text: "",
            color: color,
            colorText: this.displayColor(color),
            bg_color: bg_color,
            bg_colorText: this.displayColor(bg_color),
        };

    }

    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }));
        if (typeof callback === "function") {
            callback();
        }
    };

    displayColor = (hsbColor) => {
        let color = hsbToRgb(hsbColor);
        return color.red + "," + color.green + "," + color.blue;
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
        return (<Layout sectioned>
            <Layout.AnnotatedSection
                title="Display Upper Bar"
                description="Show/hide the Upper Bar">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            <Checkbox
                                value={this.state.enable}
                                checked={this.state.enable}
                                onChange={(e) => this.onPropertyChange("enable", e) }
                                label="Show Upper Bar"/>
                            <Checkbox
                                value={this.state.enableDate}
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
                                  label: 'Montserrat',
                                  value: 'Montserrat',
                                },{
                                  label: 'Titillium',
                                  value: 'Titillium',
                                },{
                                  label: 'Pacifico',
                                  value: 'Pacifico',
                                },{
                                  label: 'Orbitron',
                                  value: 'Orbitron',
                                },{
                                  label: 'Comfortaa',
                                  value: 'Comfortaa',
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
                            <TextField
                                label="Text Color RGB "
                                value={this.state.colorText}
                                onChange={(e) => this.onPropertyChange("colorText", e) }
                                onBlur={() => this.blurInputColor("colorText", "color") }/>
                            <TextField
                                label="Background Color RGB "
                                value={this.state.bg_colorText}
                                onChange={(e) => this.onPropertyChange("bg_colorText", e) }
                                onBlur={() => this.blurInputColor("bg_colorText", "bg_color") }/>
                        </FormLayout.Group>
                        <FormLayout.Group condensed>
                            <ColorPicker
                                color={this.state.color}
                                onChange={(e) => this.onPropertyChange("color", e, () => this.onPropertyChange("colorText", this.displayColor(e)))}
                            />
                            <ColorPicker
                                color={this.state.bg_color}
                                onChange={(e) => this.onPropertyChange("bg_color", e, () => this.onPropertyChange("bg_colorText", this.displayColor(e)))}
                            />
                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
        </Layout>);
    }
}

export default Scarcity;