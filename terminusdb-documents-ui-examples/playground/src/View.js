import React from "react"
import Card from "react-bootstrap/Card"
import { FrameObj } from "./frameInit"
import { FrameViewer } from '@terminusdb/terminusdb-documents-ui'
import { getFormData, handleTraverse } from "./controller"
import Button from "react-bootstrap/Button"
import { Stack } from "react-bootstrap"
import { Search } from "./SearchComponent"
import { MULTI_LANGUAGE } from "./menu.constants"

//import '@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__darkly.css'
//import '@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__light.css'
//import '../../src/css/terminusdb__darkly.css'
//import '../../src/css/terminusdb__light.css'

export const View = () => { 

  const {
    frames,
    type,
    mode,
    setData,
    setShowCode,
    data,
    menuItem
  } = FrameObj()

  function handleSubmit(data) {
    setData(data)
  }

  return <Card className="w-100">
    <Card.Header className="w-100">
      <Stack direction="horizontal">
        <div> {`Document Type - `}</div>
        <div className="text-warning fw-bolder">{type}</div>
        <Button className="ms-auto btn btn-sm" onClick={(e) => setShowCode(Date.now())}>View Code</Button>
      </Stack>
    </Card.Header>
    <Card.Body>
     {frames && <FrameViewer frame={frames}
        mode={mode}
        formData={data}
        onTraverse={handleTraverse}
        language={menuItem === MULTI_LANGUAGE ? "ka" : "en"} 
        onSelect={<Search/>}
        theme="darkly"
        //showThemeSelector={true}
        onSubmit={handleSubmit}
        type={type}
      />}
    </Card.Body>
  </Card>
}