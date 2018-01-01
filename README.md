
# Powerify with Node and React

Shopify Application starter with React, Polaris, Express, and Postgres.

## Description

In this App we use : 

* React, JSX, ES6, and Flow syntax support.
* A Webpack Dev server with live reloading
* State management with Redux
* React Router v4
* Embedded App SDK and Polaris
* Unit testing with Jest
* All the code for authenticating with a shop via oAuth using Express middleware
* Middleware for setting up billing and recurring charges
* Best practices from the community

## Getting started

1. Update/install the MVN to update Node and Npm : 
```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

2. Update/install Node : 
```sh
Nvm install node --reinstall-packages-from=node
```

3. Update/install npm : 
```sh
npm install -g npm
```

4. Download and install Postgres : 
https://www.postgresql.org/download/macosx/

5. Install and run Redis :
```sh
curl -O http://download.redis.io/redis-stable.tar.gz
tar xzvf redis-stable.tar.gz
cd redis-stable
make
make test
sudo make install
redis-server
```

6. Run **npm install** from the root to install main dependencies (/powerify)

7. Run **cd react-ui && npm install** for client-side dependencies 

8. Expose your application to the Internet using ngrok. See [Shopify's documentation](https://help.shopify.com/api/tutorials/building-public-app) . (replace port 4567 with 3000)

9. Becoming a Shopify App Developer and create new APP

10. When you start ngrok, it'll give you a random subdomain (*.ngrok.io). 
In the project root directory, open `server/config/index.js`. Set `APP_URL` to the subdomain ngrok assigned to you. In production, this value should match your deployment URL (for example, **.herokuapp.com). Also, set your `APP_NAME`.

11. In the project root directory, create a new file named `.env` and open it in a text editor. Login to your Shopify partner account and find your App credentials. Set your API key and App secret in the `.env` file. 

```sh
SHOPIFY_API_KEY=your API key
SHOPIFY_API_SECRET=app secret
```

12. In the `react-ui` directory, create a new file named `.env` and open it in a text editor. Set your API key and development store URL. 
```sh
REACT_APP_SHOPIFY_API_KEY=your API key
REACT_APP_SHOP_ORIGIN=your-development-store.myshopify.com
```
You'll only use these values in development. The Embedded app SDK uses them to initialize itself. In production, they are injected by the Express server in the built client app. 

13. Your api credentials should not be in source control**. In production, keep your keys in environment variables. 
In your partner dashboard, go to App info. For the App URL, set 
```
https://#{app_url}/home
```
Here `app_url` is the root path of your application (the same value as APP_URL in your config file).
For Whistlisted redirection URL, set 
```
https://#{app_url}/auth/callback
```

14. This project uses Postgres for its persistence layer, with Sequelize ORM. Create local databases for development and testing. Then run the Sequelize migration script to create a shop table:

```sh
createdb shopify-app-development # or test/production
npm run sequelize db:migrate
```
In production, you connect to the database through an environment variable DATABASE_URL. 

15. Run the app on your local machine

```sh
npm run start:dev
```
This will start `nodemon` on the server side and `create-react-app` on the client. The Node server will restart when you make changes in that part of the code. 

The page will reload if you make edits in the `react-ui` folder. You'll see the build errors and lint warnings in the console.

15. Step 5: Install your app on a test store
