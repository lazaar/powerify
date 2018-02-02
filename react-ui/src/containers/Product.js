// @flow
import React, {Component} from 'react';
import { Layout, Checkbox, Page, Card, FormLayout, TextField,Spinner } from '@shopify/polaris';
import { connect } from 'react-redux';
import axios from 'axios';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                disable:false,
                text: "Hurry Up! Sales Ends In",
                days: 0,
                hours: 0,
                numberStock: 10,
                keepStock: 3,
                decrementStock: true,
                minutes: 44,
                seconds: 8
            },
            finishLoading: false
        };
    }

    componentDidMount(){
        axios.get('/v1/api/product?productId='+this.props.match.params.productId).then((e)=> {
            this.setState({
                finishLoading: true
            });
            if(e.data && e.data.value){
                this.setState({settings:JSON.parse(e.data.value)});
            }
        }).catch(()=> {
            this.setState({
                finishLoading: true
            });
        });
    }

    onPropertyChange = (property, value) => {
        this.setState(()=>({
            settings: {
                ...this.state.settings,
                [property]: value
            }
        }));
    };

    save = () => {
        this.setState({
            isSaving: true
        });
        axios.post('/v1/api/product',{
            productId: this.props.match.params.productId,
            settings: this.state.settings
        }).then(()=> {
            this.setState({
                isSaving: false
            });
        }).catch(()=> {
            this.setState({
                isSaving: false
            });
        });

    };

  render() {

    return (
        <Page
          title="Settings for Product"
          fullWidth
          primaryAction={{ content:  this.state.isSaving ? "Saving ...":"Save", onAction: () => this.save(), disabled:this.state.isSaving }}
          secondaryActions={[
            { content: "Go back", onAction: () => this.props.history.goBack() }
          ]}>
            {!this.state.finishLoading && (<Spinner size="large" />)}
            {this.state.finishLoading && (
            <Layout sectioned>
                <Layout.Section>
                    <Card
                        title="Scarify Settings"
                        sectioned>
                        <FormLayout>
                            <Checkbox
                                checked={this.state.settings.disable}
                                onChange={(e) => this.onPropertyChange("disable", e) }
                                label="Disable Scarcity on this product"/>
                            <TextField
                                label="Text"
                                type="text"
                                helpText="Use {{stock}} for quantity in stock"
                                value={this.state.settings.text}
                                onChange={(e) => this.onPropertyChange("text", e) }
                            />
                            <TextField
                                label="Left in stock"
                                type="number"
                                value={this.state.settings.numberStock}
                                onChange={(e) => this.onPropertyChange("numberStock", e) }
                            />
                            <FormLayout.Group condensed>
                                <Checkbox
                                    checked={this.state.settings.decrementStock}
                                    onChange={(e) => this.onPropertyChange("decrementStock", e) }
                                    label="Decrement the quantity on stock"/>
                                <TextField
                                    label="Keep in stock"
                                    type="number"
                                    helpText="Stop on this number when decrementing the quantity in stock"
                                    value={this.state.settings.keepStock}
                                    onChange={(e) => this.onPropertyChange("keepStock", e) }
                                />
                            </FormLayout.Group>
                            <FormLayout.Group condensed>
                                <TextField
                                    label="Days"
                                    type="number"
                                    value={this.state.settings.days}
                                    readOnly={false}
                                    onChange={(e) => this.onPropertyChange("days", e) }

                                />
                                <TextField
                                    label="Hours"
                                    type="number"
                                    value={this.state.settings.hours}
                                    readOnly={false}
                                    onChange={(e) => this.onPropertyChange("hours", e) }

                                />
                                <TextField
                                    label="Minutes"
                                    type="number"
                                    value={this.state.settings.minutes}
                                    readOnly={false}
                                    onChange={(e) => this.onPropertyChange("minutes", e) }

                                />
                                <TextField
                                    label="Seconds"
                                    type="number"
                                    value={this.state.settings.seconds}
                                    readOnly={false}
                                    onChange={(e) => this.onPropertyChange("seconds", e) }

                                />
                            </FormLayout.Group>
                        </FormLayout>
                    </Card>
                </Layout.Section>
            </Layout>)}
      </Page>
    );
  }
}
const mapStateToProps = (state) => {
    const {settings} = state;
    return{
        settings: settings
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Product);

