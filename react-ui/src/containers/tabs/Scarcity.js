// @flow
import React, {Component} from 'react';
//import DatePicker from 'react-datepicker';
import moment from 'moment';
import './style.css';
import './fonts.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Layout, ColorPicker, hsbToRgb,rgbToHsb,hsbToHex,  Select, Card, FormLayout, TextField,  TextContainer, Heading} from '@shopify/polaris';

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
            fontweight: "bold",
            textabovetimer: "Hurry! Sales Ends In",
            fontsize: 20,
            days: 0,
            hours: 0,
            minutes: 44,
            seconds: 8,
            textalign: "center",
            countdown: "Flipper",
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
                title="Display Scarcity Countdown"
                description="Show/hide the Upper Bar">
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group>
                            
                          <Select
                              label="Text above the timer"
                              placeholder="Select"
                              value={this.state.textabovetimer}
                              options={[
                                {
                                  label: 'Hurry! Sales Ends In',
                                  value: 'Hurry! Sales Ends In',
                                },{
                                  label: 'Hurry Up! Sales Ends In',
                                  value: 'Hurry Up! Sales Ends In',
                                },{
                                  label: 'Hurry! Offer Ends In',
                                  value: 'Hurry! Offer Ends In',
                                },{
                                  label: '1 Time offer, Ending In',
                                  value: '1 Time offer, Ending In',
                                },{
                                  label: 'X CLAIMED. HURRY, ONLY FEW LEFT IN STOCK',
                                  value: 'X CLAIMED. HURRY, ONLY FEW LEFT IN STOCK',
                                },{
                                  label: 'Hurry! Only X left in stock',
                                  value: 'Hurry! Only X left in stock',
                                },{
                                  label: 'Custom text',
                                  value: 'CustomText',
                                }
                              ]}
                              onChange={(e) => this.onPropertyChange("textabovetimer", e) }
                            />
                        </FormLayout.Group>

                        <FormLayout.Group condensed>
                        <TextField
						  label="Days"
						  type="number"
	                 	  value={this.state.days}
						  readOnly={false}
						/>
						<TextField
						  label="Hours"
						  type="number"
						  value={this.state.hours}
						  readOnly={false}
						  onChange={(e) => this.onPropertyChange("hours", e) }

						/>
						<TextField
						  label="Minutes"
						  type="number"
						  value={this.state.minutes}
						  readOnly={false}
						  onChange={(e) => this.onPropertyChange("minutes", e) }

						/>
						<TextField
						  label="Seconds"
						  type="number"
						  value={this.state.seconds}
						  readOnly={false}
						  onChange={(e) => this.onPropertyChange("seconds", e) }

						/>


                        </FormLayout.Group> 
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
                title="Style Settings"
                description="Customize the style of the Upper Bar">
                <Card sectioned>
                    <FormLayout>
                        
                        <FormLayout.Group condensed>
                        <Select
                              label="Style"
                              placeholder="Select"
                              value={this.state.countdown}
                              options={[
                                {
                                  label: 'Simple Timer',
                                  value: 'Simple',
                                },{
                                  label: 'FlipClock',
                                  value: 'FlipClock',
                                },{
                                  label: 'Flipper',
                                  value: 'Flipper',
                                }
                              ]}
                              onChange={(e) => this.onPropertyChange("font", e) }
                            />
                            
                        </FormLayout.Group>
                        <FormLayout.Group>
                        	<TextContainer>
		  					<Heading>Text Above Timer</Heading> 
		  					</TextContainer>
                        </FormLayout.Group>
                        <FormLayout.Group>
                        	 <div className="powerify_color_choose"
                            style={{
                              color:hsbToHex(this.state.color),
                              backgroundColor:hsbToHex(this.state.bg_color),
                              
                            }}
                        >
                            Pick a color  
                        </div>
                        
                         </FormLayout.Group>
                        <FormLayout.Group condensed>

                            <ColorPicker
                                color={this.state.bg_color}
                                onChange={(e) => this.onPropertyChange("bg_color", e, () => this.onPropertyChange("bg_colorText", this.displayColor(e)))}
                            />
                        </FormLayout.Group>
                         <FormLayout.Group condensed>

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
							  value={this.state.fontsize}
							  options={[
							    'left',
							    'center',
							    'right',
							  ]}
					          onChange={(e) => this.onPropertyChange("textalign", e) }

							  placeholder="Select"
							/>
							<Select
							  label="Font Weight"
  							  value={this.state.fontweight}
							  options={[
							    'normal',
							    'bold',
							  ]}
				              onChange={(e) => this.onPropertyChange("fontweight", e) }

							  placeholder="Select"
							/>

                        </FormLayout.Group>
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
        </Layout>);
    }
}

export default Scarcity;