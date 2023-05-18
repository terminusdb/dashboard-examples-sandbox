import React, { useState }  from 'react';
import {AdvancedSearch} from '@terminusdb/terminusdb-react-table'
import conf from './configuration.json'
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert"
const App = (props) =>{
    
     const [addFilter,setAdvancedFilters] = useState({})
     
    return <Container>     
            <AdvancedSearch fields={conf} setFilter={setAdvancedFilters}/>
            <Alert><pre>{`YOU SHOULD IMPLEMENT A LOGIC FOR THE ADVANCED FILTER
                     ${JSON.stringify(addFilter,null,4)}`}</pre></Alert>
            </Container>
}
export default App;
