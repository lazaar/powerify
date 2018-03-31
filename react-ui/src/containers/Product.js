// @flow
import React, {Component} from 'react';
import { Layout, Checkbox, Thumbnail, ResourceList, Page, Card, FormLayout, TextField,Spinner } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                disableScarcity:false,
                text: "Hurry Up! Sales Ends In",
                days: 0,
                hours: 0,
                numberStock: 10,
                keepStock: 3,
                decrementStock: true,
                minutes: 44,
                seconds: 8,
                upsell:{
                    disable:false,
                    title:"Want to add one of these ? ",
                    subtitle:"Based on what's in your cart we thought you might want grab one of these items too.",
                    products:[]
                }
            },
            finishLoading: false
        };
    }

    componentDidMount(){
        axios.get('/v1/api/product?productId='+this.props.match.params.productId).then((e)=> {
            this.setState({finishLoading: true});
            if(e.data && e.data.value){
                this.setState({settings:JSON.parse(e.data.value)});
            }
        }).catch(()=> {
            this.setState({finishLoading: true});
        });
    }

    onPropertyChange = (property, value) => {
        let settings = this.state.settings;
         _.set(settings, property, value);
        this.setState(()=>({
            settings: settings
        }));
    };

    handleResourceSelected = (products)=> {
        console.log(products);
        const tmpProducts = _.map(_.take(products.products, 3), function(object) {
            return _.pick(object, ['id', 'title','image.src','handle','variants', 'options']);
        });
        this.setState({ resourcePickerOpen: false});
        this.onPropertyChange("upsell.products", _.get(this.state,"settings.upsell.products",[]).concat(tmpProducts));
    };

    deleteProduct = (index)=> {
        const tmpProducts = this.state.settings.upsell.products;
        tmpProducts.splice(index, 1);
        this.onPropertyChange("upsell.products",tmpProducts);
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
                                checked={this.state.settings.disableScarcity}
                                onChange={(e) => this.onPropertyChange("disableScarcity", e) }
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

                    <Card
                        title="UpSell Settings" sectioned
                        primaryFooterAction={{ content:  "Add products", onAction: () => this.setState({ resourcePickerOpen: true }), disabled:_.get(this.state,"settings.upsell.products",[]).length > 2 }}>
                        <FormLayout>
                            <Checkbox
                            checked={_.get(this.state.settings,'upsell.disable',false)}
                            onChange={(e) => this.onPropertyChange("upsell.disable", e) }
                            label="Disable upsell on this product"/>
                        <TextField
                            label="Title"
                            type="text"
                            value={_.get(this.state.settings,'upsell.title',"")}
                            onChange={(e) => this.onPropertyChange("upsell.title", e) }
                        />
                            <TextField
                                label="Subtitle"
                                type="text"
                                multiline={5}
                                value={_.get(this.state.settings,'upsell.subtitle',"")}
                                onChange={(e) => this.onPropertyChange("upsell.subtitle", e) }
                            />
                        <ResourcePicker
                            products
                            allowMultiple
                            open={this.state.resourcePickerOpen}
                            onSelection={this.handleResourceSelected}
                            onCancel={() => this.setState({ resourcePickerOpen: false })}
                        />
                        <ResourceList
                            items={_.get(this.state,"settings.upsell.products",[]).map((item,index) => ({
                                media: item.image && <Thumbnail source={item.image.src} alt={item.title} />,
                                attributeOne: item.title,
                                actions: [
                                    {
                                        icon: 'delete',
                                        onClick: () => (this.deleteProduct(index)),
                                        destructive: true
                                    }],
                                persistActions: true
                              }))
                             }
                            renderItem={(item, index) => {
                              return <ResourceList.Item key={index} {...item} />;
                            }}
                        />
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

