// @flow
import React, {Component} from 'react';
import {Page, Banner, Spinner, Layout, Card, Button, EmptyState} from '@shopify/polaris';
import {connect} from 'react-redux';
import axios from 'axios';

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFileOk: 0,
            isThemeOk : 0
        };

        var objURL = {};
        var url = this.props.location.search;
        url.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function ($0, $1, $2, $3) {
                objURL[$1] = $3;
            }
        );
        if (objURL.productId) {
            this.handleGoToState('product/' + objURL.productId);
        }
        else if (objURL.reviewProductId) {
            this.handleGoToState('review/' + objURL.shop + '/' + objURL.reviewProductId);
        }
    }

    componentDidMount() {
        axios.get('/v1/api/isFileAdded').then(()=> {
            this.setState({isFileOk : 1});
        }).catch((e)=> {
            if(e.response.status === 500){
                this.setState({isFileOk : -1});
            }
        });

        axios.get('/v1/api/isThemeUpdated').then(()=> {
            this.setState({isThemeOk : 1});
        }).catch((e)=> {
            if(e.response.status === 500){
                this.setState({isThemeOk : -1});
            }
        });
    }

    handleGoToState = route => {
        const {history} = this.props;

        history.push('/' + route);
    };

    addFiles = () => {
        this.setState({isFileOk : 2});
        axios.get('/v1/api/addFiles').then(()=> {
            this.setState({isFileOk : 1});
        }).catch(()=> {
            this.setState({isFileOk : -1});
        });
    };

    updateTheme = () => {
        this.setState({isThemeOk : 2});
        axios.get('/v1/api/updateTheme').then(()=> {
            this.setState({isThemeOk : 1});
        }).catch(()=> {
            this.setState({isThemeOk : -1});
        });
    };

    render() {
        return (
            <Page
                title="Home"
                fullWidth
                primaryAction={{
              content: 'Settings',
              onAction: () => this.handleGoToState('settings')
           }}
            >
                {(this.state.isFileOk === 2 || this.state.isThemeOk === 2)  && (<Spinner size="small" color="inkLightest" />)}
                {this.state.isFileOk === -1  && (
                    <Banner
                        action={{content: 'Add Files', onAction: () => this.addFiles()}}
                        status="critical"
                    >
                        <p>One or multiple required file for Powerify is missing for the current theme</p>
                    </Banner>)}

                {this.state.isThemeOk === -1  && (
                    <Banner
                        action={{content: 'Update theme', onAction: () => this.updateTheme()}}
                        status="warning"
                    >
                        <p>Your current theme files are not updated for Powerify </p>
                    </Banner>)}
                {this.state.isThemeOk === 1  && this.state.isFileOk === 1  && (
                    <Banner status="success">
                        <p>Your Powerify is well installed </p>
                    </Banner>)}

                <Layout>
                    <Layout.Section>
                        <EmptyState
                            heading="Manage the Powerify Features"
                            action={{content: 'Settings',onAction: () => this.handleGoToState('settings')}}
                            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                        >
                            <p>Powerify offers more than 10 features to boost your business</p>
                        </EmptyState>
                    </Layout.Section>
                </Layout>
                
                <Layout>
                    <Layout.Section>
                        <Card title="Documentation" sectioned>
                            <p>Browse the documentation online to take full advantage of all the features that offer Powerify</p>
                            <Button>Go to documentation</Button>
                        </Card>
                    </Layout.Section>
                    <Layout.Section secondary>
                        <Card title="Contact Us" sectioned>
                            <p>Don't hesitate to contact us if you have questions, comments or suggestions : contact@powerify.io</p>
                        </Card>
                    </Layout.Section>
                </Layout>

            </Page>
        );
    }
}

export default connect(null, null)(IndexPage);

