import React, {useState,useEffect}  from 'react';
import {TDBReactTable} from '@terminusdb/terminusdb-react-table'
import {columnsConfiguration} from './columnsConfiguration'
import data from './data.json'
import './terminusdb-react-table-main.css'
import {Container,Alert,Row} from "react-bootstrap"
const App = (props) =>{

    const [rowSelected, setRowSelected] = useState(false)
    const [limit, setLimit] = useState(5)
    const [start, setStart] = useState(0)
    const [filter, setFilter] = useState([])
    const [order, setOrder] = useState([])
    const hiddenColumnsArr  = ['_id',
                               'desc', 
                               'MGLT',
                               'length', 
                               'cost_in_credits',
                               'max_atmosphering_speed',
                               '_speed',
                               'crew',
                               'passengers',
                               'cargo_capacity',
                               'consumables',
                               'hyperdrive_rating',
                               'starship_class',
                               'created,edited',
                               'url']

    const [dataWithPagination, setData] = useState(data)

    const onRowClick = (row) =>{
        setRowSelected(row.original['fullID'])
    }

    const tableConfigObj = {}
    tableConfigObj.columns = columnsConfiguration
    tableConfigObj.rowClick = onRowClick

    const setHiddenColumns = (id, selected)=>{

        //you can implement a way to save this status
        
    }
    const changeFilters = (filterArr)=>{
        setFilter(filterArr)
    }

    const changeLimits = (currentlimit,currentpage)=>{
            setLimit(currentlimit)
            setStart(currentpage)
    }
    const changeOrders = (orderArr)=>{
        setOrder(orderArr)
    }

    useEffect(() => {
        const tmpData = data.slice(start,(limit+start))
        setData(tmpData)
	},[limit,start])
    
    return <Container className='my-5 py-5'>
        <Alert><pre>{`Row selected id ${rowSelected}`} 
                    YOU NEED TO IMPLEMENT A LOGIC TO STORE THE ColumnsHidden status</pre></Alert>
        <Alert><pre>{`YOU NEED TO IMPLEMENT A FILTER LOGIC, 
Table filter ${JSON.stringify(filter)}`}</pre></Alert>
        <Alert><pre>
                 {`YOU NEED TO IMPLEMENT AN ORDER LOGIC, 
Table order ${JSON.stringify(order)}`}</pre></Alert>
       <Row className='width-100 overflow-auto text-break'  >
        <TDBReactTable
            result={dataWithPagination}
            freewidth={true}
            config ={tableConfigObj}
            hiddenColumnsArr = {hiddenColumnsArr}
            setHiddenColumns = {setHiddenColumns}
            limit={limit}
            start={start}
            orderBy={[]} 
            filterBy={[]}
            setFilters = {changeFilters}
            setLimits={changeLimits}
            setOrder={changeOrders}
            loading={false}
            totalRows={10}
        />
        </Row>
    </Container>

}
export default App;
