import React,{useEffect} from "react"
import {useTDBDocuments,DocumentsGraphqlTable} from "@terminusdb/terminusdb-documents-ui-template"
import {gql} from "@apollo/client"
import {ClientObj} from '../dashboard-context'
/**
 * 
 * @param {*} setSelected function to get selected document link by user 
 * @param {*} doctype document type selected
 * @returns 
 */
export const DocumentSearchComponent = ({setSelected, doctype}) => {
    const {apolloClient,tdbClient} = ClientObj()
    const {documentTablesConfig,getGraphqlTablesConfig} = useTDBDocuments(tdbClient)

    useEffect(() => {
        if(doctype){       
            getGraphqlTablesConfig()         
        }
     },[doctype]);

    const querystr  = documentTablesConfig && documentTablesConfig.objQuery ? documentTablesConfig.objQuery[doctype].query : null
    const gqlQuery = querystr ? gql`${querystr}` : null
    const tableConfig =  documentTablesConfig && documentTablesConfig.tablesColumnsConfig ? documentTablesConfig.tablesColumnsConfig[type] : []
    const advancedSearchConfig = documentTablesConfig && documentTablesConfig.advancedSearchObj ? documentTablesConfig.advancedSearchObj[type] : null
    if(!gqlQuery || !tableConfig) return <div/>


    return  <DocumentsGraphqlTable tableConfig={tableConfig} 
                advancedSearchConfig={advancedSearchConfig}
                type={doctype} 
                gqlQuery={gqlQuery}
                apolloClient={apolloClient}
                onRowClick={setSelected} 
                showGraphqlTab={false} />

}