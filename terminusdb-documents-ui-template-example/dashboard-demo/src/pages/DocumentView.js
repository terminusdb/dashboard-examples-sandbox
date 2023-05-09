import React, {useEffect}  from "react";
import {ViewDocumentComponent,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import {useParams,useNavigate } from "react-router-dom";
import {Alert , ProgressBar} from 'react-bootstrap'
import {decodeUrl} from "./utils"
import {EDIT_DOC} from "./constants"
import {ClientObj} from '../dashboard-context'

export const DocumentView = (props) => {  
    const {tdbClient} = ClientObj() 
    const {type, docid} = useParams()
    const navigate = useNavigate()
    
    const {
        frames,
        selectedDocument,
        error,
        deleteDocument,
        getSelectedDocument,
        getDocumentFrames,
        setError,
        getDocumentById,
    } = useTDBDocuments(tdbClient)

    let documentID=decodeUrl(docid)
 
    useEffect(() => {
        if(tdbClient){
            getDocumentFrames()
            getSelectedDocument(documentID)
        }
	}, [tdbClient] )

    async function callDeleteDocument(){
        var answer = window.confirm("Are you sure you want to delete this document");
        if (answer) {
            const delCall = await deleteDocument(documentID)
            if(delCall){
                navigate(-1)
            }
        } 
    }

    if(!selectedDocument || !frames) return  <ProgressBar animated now={100} label={`Fetching ${documentID} ...`}/>
    
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error
    
    return <React.Fragment>
       {error && <Alert variant="danger" className="m-5" onClose={() => setError(false)} dismissible>
                Server Error: {errorMessage} </Alert>}
        <ViewDocumentComponent 
            type={type}
            getDocumentById={getDocumentById}
            documentJson={selectedDocument}
            frames={frames}
            closeButtonClick={()=>navigate(-1)}
            documentID={documentID}
            deleteDocument={callDeleteDocument}
            editDocument = {()=>navigate(`${EDIT_DOC}`)}
        />
    </React.Fragment>
}
