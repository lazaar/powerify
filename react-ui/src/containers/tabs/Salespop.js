// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Layout, ChoiceList,TextField, Select, Card, FormLayout, Checkbox} from '@shopify/polaris';

class Salespop extends Component {
    constructor(props) {
        super(props);
        
       
        if(this.props.settings.salespop){
            this.state = this.props.settings.salespop;
        }
        else{
            this.state = {
                enableDesktop:true,
                enableMobile:true,
                locations:"San Francisco; New York; Paris; London; Pekin",
                excludeProducts:[],
                showOnProduct:['false'],
                showCurrentProduct:['true'],
                timeout:5,
                color:'info',
                position:'bottomLeft',
                minTime:6,
                maxTime:10,
                textTemplate : 'Someone in {{location}} just bought {{product}}'
            };
      }
    }
    onPropertyChange = (property, value, callback) => {
        this.setState(()=>({
            [property]: value
        }), function () {
            this.props.onSettingsChange("salespop", this.state);
        });
        if (typeof callback === "function") {
            callback();
        }
    };


    render() {
        return (<Layout sectioned>
            <Layout.Section

            >
                <Card sectioned
                      title="Display Sales Pop"
                >
                    <FormLayout>

                        <FormLayout.Group >
                            <Checkbox label="Enable Sales Pop on Desktop"
                                      checked={this.state.enableDesktop}
                                      onChange={(e) => this.onPropertyChange("enableDesktop",e)}

                            />
                            <Checkbox label="Enable Sales Pop on Mobile"
                                      checked={this.state.enableMobile}
                                      onChange={(e) => this.onPropertyChange("enableMobile",e)}

                            />
                            <Select
                                label="Sales Pop position : "
                                placeholder="Select"
                                value={this.state.position}
                                options={[
                                 {
                                  label: 'Top Left',
                                  value: 'topLeft'
                                },{
                                  label: 'Top Center',
                                  value: 'topCenter'
                                },{
                                  label: 'Top Right',
                                  value: 'topRight'
                                },{
                                  label: 'Bottom Left',
                                  value: 'bottomLeft'
                                },{
                                  label: 'Bottom Center',
                                  value: 'bottomCenter'
                                },{
                                  label: 'Bottom Right',
                                  value: 'bottomRight'
                                }
                              ]}
                                onChange={(e) => this.onPropertyChange("position", e) }
                            />
                            <ChoiceList
                                title="Show only on product page"
                                choices={[
							    {
							      label: 'yes',
							      value: 'true'
							    },
							    {
							      label: 'No',
							      value: 'false'
							    }
							  ]}
                                selected={this.state.showOnProduct}
                                onChange={(e) => this.onPropertyChange("showOnProduct",e)}
                            />

                            <ChoiceList
                                title="In product page, show only the current product"
                                choices={[
							    {
							      label: 'yes',
							      value: 'true'
							    },
							    {
							      label: 'No',
							      value: 'false'
							    }
							  ]}
                                selected={this.state.showCurrentProduct}
                                onChange={(e) => this.onPropertyChange("showCurrentProduct",e)}
                            />


                        </FormLayout.Group>
                    </FormLayout>
                </Card>

                <Card sectioned
                      title="Content of Sales Pop"
                >
                    <FormLayout>
                        <div className={["powerify_sales-pop-"+this.state.color, "powerify_sales-pop"].join(' ')}>
                            {this.state.textTemplate}
                        </div>
                        <TextField
                            label="Text"
                            type="text"
                            helpText="Use {{location}} for location and {{product}} for Product title"
                            value={this.state.textTemplate}
                            onChange={(e) => this.onPropertyChange("textTemplate", e) }
                        />
                        <FormLayout.Group >
                            <Select
                                label="Color : "
                                placeholder="Select"
                                value={this.state.color}
                                options={[
                                 {
                                  label: 'Blue',
                                  value: 'info'
                                },{
                                  label: 'Green',
                                  value: 'success'
                                },{
                                  label: 'Red',
                                  value: 'error'
                                },{
                                  label: 'Yellow',
                                  value: 'warning'
                                }
                              ]}
                                onChange={(e) => this.onPropertyChange("color", e) }
                            />
                            <TextField
                                label="Display Time (seconds)"
                                type="number"
                                helpText="0 for sticky notifications"
                                value={this.state.timeout}
                                onChange={(e) => this.onPropertyChange("timeout", e) }
                            />
                            <TextField
                                label="Minimum Time between notifications (seconds)"
                                type="number"
                                value={this.state.minTime}
                                onChange={(e) => this.onPropertyChange("minTime", e) }
                            />
                            <TextField
                                label="Maximum Time between notifications (seconds)"
                                type="number"
                                value={this.state.maxTime}
                                onChange={(e) => this.onPropertyChange("maxTime", e) }
                            />
                        </FormLayout.Group>
                        <TextField
                            label="Locations"
                            type="text"
                            helpText='Separated by ";"'
                            multiline={5}
                            value={this.state.locations}
                            onChange={(e) => this.onPropertyChange("locations", e) }
                        />
                    </FormLayout>
                </Card>
            </Layout.Section>
        </Layout>);
    }
}

const mapStateToProps = (state) => {
    const {settings} = state;
    return{
        settings: settings
    }
};

export default connect(mapStateToProps, null)(Salespop);