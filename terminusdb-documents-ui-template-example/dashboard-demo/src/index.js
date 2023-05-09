import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ClientProvider} from './dashboard-context'
import "@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__styles.css"
import './App.css' 



const localSettings = {server:"https://cloud-dev.terminusdb.com/sandbox",
                       organization:"sandbox",
                       user:"sandboxuser@terminusdb.com",
                       token:"dGVybWludXNkYjovLy9kYXRhL2tleXNfYXBpLzNjYjc2NTdkYjRmYmVlNTA0MzM5NGI5ODlhMjcxMTkzMDg0YmNlN2ZlZDcyM2UxNzQwNTViMGQ3MGZkZjZmYjY=_3d06283d6bd49f39ff07755931fcccdf0c05baacc2900f5d87d2c7d207b50381854a88aa2e870bf576453f0becc26815764e21d9238ec90ddb37ec1b7a32a6d571a570a668d716a2",
                      }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClientProvider params={localSettings}>
    <App/>
  </ClientProvider>
 
);
