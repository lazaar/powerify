// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Layout, ColorPicker, Popover, rgbToHsb,hsbToHex,  Select, Card, FormLayout, TextField,  TextContainer, Heading} from '@shopify/polaris';

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

        if(this.props.settings.scarcity){
            this.state = this.props.settings.scarcity;
        }
        else{
        this.state = {
            font: "Chewy",
            fontweight: "bold",
            textabovetimer: "Hurry! Sales Ends In",
            fontsize: 20,
            days: 0,
            hours: 0,
            minutes: 44,
            seconds: 8,
            textalign: "center",
            scarcityStyle: "Flipper",
            text: "",
            color: color,
            colorText: this.displayColor(color),
            bg_color: bg_color,
            bg_colorText: this.displayColor(bg_color),
            showbg_color: false,
        };
      }
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
                                onChange={(e) => this.onPropertyChange("days", e) }

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
                              value={this.state.scarcityStyle}
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
                              onChange={(e) => this.onPropertyChange("scarcityStyle", e) }
                            />
                            
                        </FormLayout.Group>
                        <FormLayout.Group>
                        	<TextContainer>
        		  					<Heading>Text Above Timer</Heading> 
        		  					</TextContainer>
                            
                        </FormLayout.Group>

                        <FormLayout.Group>
                        	 <TextField label="Second Line Color" 
                            value={this.state.bg_colorText}
                            onClick={(e) => this.onPropertyChange("showbg_color", true)}
                            />

                          <Popover
                            active={this.state.showbg_color}
                            activator={ 
                              <button className="button" style={{
                                    backgroundColor:hsbToHex(this.state.bg_color),
                                 
                               }} 
                               onClick={(e) => this.onPropertyChange("showbg_color", true)}
                               ></button>

                                  }
                            sectioned
                          >

                            <FormLayout>

                              <div style={ cover } onClick={(e) => this.handleClose("showbg_color")} />
                              <ColorPicker
                                            color={this.state.bg_color}
                                            onChange={(e) => this.onPropertyChange("bg_color", e, () => this.onPropertyChange("bg_colorText", this.displayColor(e)))}
                                            onBlur={(e) => this.onPropertyChange("showbg_color", false)}
                                          />
                              
                            </FormLayout>
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
                							  value={this.state.textalign}
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
