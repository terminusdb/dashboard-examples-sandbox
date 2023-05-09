import schemaJson from './lego_schema'
import React, {useState, useEffect, useContext} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
import { ApolloClient,ApolloLink, concat, InMemoryCache, HttpLink } from '@apollo/client';
export const ClientContext = React.createContext()
export const ClientObj = () => useContext(ClientContext) 


export const ClientProvider = ({children, params}) => {

    //let apolloClient
    const [tdbClient, setClient] = useState(null)
    const [loadingServer, setLoadingServer] = useState(null)
    const [error, setError] = useState(null)
    const [apolloClient , setApolloClient] = useState(null)

    const createApolloClient = (client)=>{
        const httpLink = new HttpLink({uri:client.connectionConfig.branchBase("graphql")})
        const authMiddleware = new ApolloLink((operation, forward) => {
              // add the authorization to the headers
              operation.setContext(({ headers = {} }) => ({
              headers: {
                  ...headers,
                  authorization: `Token ${params.token}`}
              }));
              return forward(operation);
          })
          
          const cache = new InMemoryCache({
              addTypename: false
          });
          
          const value = concat(authMiddleware, httpLink)
      
          return new ApolloClient({
              cache:cache,
              defaultOptions: {
                watchQuery: {
                  fetchPolicy: 'no-cache',
                  errorPolicy: 'all',
                },
                query: {
                  fetchPolicy: 'no-cache',
                  errorPolicy: 'all',
                },
              },
              link: value,       
          });
      }

      const createDatabase = async(dbClient) =>{
        const currentyDB = localStorage.getItem("___SANDBOX_DATABASE_NAME___")
        if(currentyDB){
            dbClient.db(currentyDB)
        }else{
            const dbName =  `SANDBOX__${crypto.randomUUID()}`
            const dbObj  = { label: dbName, comment: 'add db', schema: true }
            await dbClient.createDatabase(dbName,dbObj)
            await dbClient.addDocument(schemaJson,{graph_type:"schema",full_replace:true}); 
            localStorage.setItem("___SANDBOX_DATABASE_NAME___",dbName)
        }
      }

     useEffect(() => {
        const initClient = async()=>{
            try{
                const dbClient = new TerminusClient.WOQLClient(params.server,params)
                await createDatabase(dbClient)
                //dbClient.db(params.db)
                setApolloClient(createApolloClient(dbClient))
                setClient(dbClient)
            } catch (err) {
                setError(err.message)
            }finally {
                setLoadingServer(false)
            }
        }
        if(params && params.server){           
            //to be review the local connection maybe don't need a user in the cloud
            //and don't need auth0 too
            setLoadingServer(true)
            initClient()   
         }
    }, [])


   


    return (
        <ClientContext.Provider
            value={{
                loadingServer,
                error,
                tdbClient,
                apolloClient
            }}
        >
            {children}
        </ClientContext.Provider>
    )
}
