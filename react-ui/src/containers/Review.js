// @flow
import React, {Component} from 'react';
import { Tabs, Page,SkeletonBodyText, Card, Heading,ResourceList,Thumbnail } from '@shopify/polaris';
import axios from 'axios';
import { Alert } from '@shopify/polaris/embedded';

class Review extends Component {
  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);
    this.deleteAddedReview = this.deleteAddedReview.bind(this);
    this.deletePublishedReview = this.deletePublishedReview.bind(this);
    this.state = {
        selectedTab: 0,
        isLoading:true,
        isLoadingPublished:true,
        reviewItems:[],
        reviewPublished:[]
    };
  }

    componentDidMount(){
        axios.get('/v1/api/reviewServer?productId='+this.props.match.params.reviewProductId +'&shop='+this.props.match.params.shop).then((e)=> {
            this.setState({
                isLoading: false,
                reviewItems:e.data.rows
            });
        }).catch(()=> {
            this.setState({
                isLoading: false
            });
        });

        axios.get('/v1/api/reviews?productId='+this.props.match.params.reviewProductId).then((e)=> {
            this.setState({
                isLoadingPublished: false,
                reviewPublished:JSON.parse(e.data.value)
            });
        }).catch(()=> {
            this.setState({
                isLoadingPublished: false
            });
        });
    }

    handleTabChange(selectedTab) {
        this.setState({selectedTab});
    }

    deleteAddedReview(id, index) {
        axios.delete('/v1/api/reviewServer?id='+id).then((e)=> {
            var tmpItems  = this.state.reviewItems;
            tmpItems.splice(index, 1);
            this.setState({
                reviewItems:tmpItems
            });
        }).catch((e)=> {
            console.log("Error on deleting review",e);
        });
    }

    publishReview(id, index) {
        var itemToAdd = this.state.reviewItems[index];
        delete itemToAdd.createdAt;
        delete itemToAdd.productId;

        axios.post('/v1/api/reviews',{
            productId: this.props.match.params.reviewProductId,
            reviews: [itemToAdd,...this.state.reviewPublished]
        }).then(()=> {
            this.deleteAddedReview(id,index);
            this.setState({
                reviewPublished: [itemToAdd,...this.state.reviewPublished]
            });
        }).catch(()=> {
            console.log("Error on publishing review");
        });
    }

    deletePublishedReview(index) {
        var imagePath = this.state.reviewPublished[index].image;
        var tmpItems  = this.state.reviewPublished;
        tmpItems.splice(index, 1);

        axios.post('/v1/api/reviews',{
            productId: this.props.match.params.reviewProductId,
            reviews: tmpItems,
            imageToDelete:imagePath
        }).then(()=> {
            this.setState({
                reviewPublished: tmpItems
            });
        }).catch(()=> {
            console.log("Error on publishing review");
        });
    }

    deleteReview(callback, ...args) {
        this.setState({
            showDeleteConfirmation: true,
            deleteAction:()=>{
                callback(...args);
            }
        });
    }

    render() {
    const {selectedTab} = this.state;

    const tabs = [
      {
        id: 'reviews-added',
        content: 'Reviews added ('+ this.state.reviewItems.length+')',
        panelID: 'reviews-added'
      },
      {
        id: 'reviews-publishd',
        content: 'Reviews published ('+ this.state.reviewPublished.length+')',
        panelID: 'reviews-publishd'
      }
    ];

    const tabPanels = [
      (<Tabs.Panel id="reviews-added">
          {this.state.isLoading && (<SkeletonBodyText />)}
          {!this.state.isLoading && this.state.reviewItems.length > 0 && (<ResourceList
              items={this.state.reviewItems.map((item,index) => ({
                    media: item.image && <Thumbnail source={window.location.origin+"/" + item.image} alt={item.title} />,
                    attributeOne: item.title,
                    attributeTwo: item.content,
                    attributeThree: item.name + (item.email ? ": " + item.email : ""),
                    badges: [
                        {
                            content: item.stars,
                            status:  "warning"
                        }
                    ],
                    actions: [
                        {
                            icon:  "save",
                            onClick: () => (this.publishReview(item.id,index)),
                            primary: true,
                            plain: false

                        },
                        {
                            icon: 'delete',
                            onClick: () => (this.deleteReview( this.deleteAddedReview, item.id, index)),
                            destructive: true
                        }],
                    persistActions: true
              }))
              }
              renderItem={(item, index) => {
                  return <ResourceList.Item key={index} {...item} />;
              }}
          />)}
          {!this.state.isLoading && this.state.reviewItems.length === 0 && (<Heading>No reviews added for this product</Heading>)}
        </Tabs.Panel>),
        (<Tabs.Panel id="reviews-publishd">
            {this.state.isLoadingPublished && (<SkeletonBodyText />)}
            {!this.state.isLoadingPublished && this.state.reviewPublished.length > 0 && (<ResourceList
                items={this.state.reviewPublished.map((item,index) => ({
                    media: item.image && <Thumbnail source={window.location.origin+"/" + item.image} alt={item.title} />,
                    attributeOne: item.title,
                    attributeTwo: item.content,
                    attributeThree: item.name + (item.email ? ":" + item.email : ""),
                    badges: [
                        {
                            content: item.stars,
                            status:  "warning"
                        }
                    ],
                    actions: [
                        {
                            icon: 'delete',
                            onClick: () => (this.deleteReview(this.deletePublishedReview, index)),
                            destructive: true
                        }],
                    persistActions: true
              }))
              }
                renderItem={(item, index) => {
                  return <ResourceList.Item key={index} {...item}/>;
              }}
            />)}
            {!this.state.isLoadingPublished && this.state.reviewPublished.length === 0 && (<Heading>No reviews published for this product</Heading>)}
        </Tabs.Panel>)
    ];

    return (
        <Page
          title="Product reviews"
          fullWidth>
            <Alert
                title="Delete review"
                open={this.state.showDeleteConfirmation}
                destructive={true}
                confirmContent="Delete"
                onConfirm={() => {
                    this.setState({showDeleteConfirmation: false});
                    this.state.deleteAction();
                }}
                cancelContent="Cancel"
                onCancel={() => this.setState({showDeleteConfirmation: false})}>

                Are you sure you want to delete this review ?
            </Alert>
         <Tabs
          selected={selectedTab}
          tabs={tabs}
          onSelect={this.handleTabChange}
        />
        <Card sectioned>
            {tabPanels[selectedTab]}
        </Card>
      </Page>
    );
  }
}


export default Review;

