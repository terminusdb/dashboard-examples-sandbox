// This file shows how we can import FrameViewer from @terminusdb/terminusdb-documents-ui
import React from "react"
import Card from "react-bootstrap/Card"
import { FrameObj } from "./frameInit"
import { FrameViewer } from '@terminusdb/terminusdb-documents-ui'
import { getFormData, handleTraverse } from "./controller"
import Button from "react-bootstrap/Button"
import { Stack } from "react-bootstrap"
import { Search } from "./SearchComponent"

export const View = () => { 

  const {
    frames,
    type,
    mode,
    setData,
    setShowCode 
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
      <FrameViewer frame={frames}                   // LEGO_FRAMES from "./lego.constants.js"
        mode={mode}                                 // mode (Create, Edit or View) controlled from "./ModeBar.js"
        formData={getFormData(mode, type, setData)} // formData to prefill the Form in <FrameViewer/>
        onTraverse={handleTraverse}                 // a callback function gets back the ID of a document on click 
        onSelect={<Search/>}                        // A callback function which provides a UI within the <FrameViewer/> from which user can select another document link. 
        onSubmit={handleSubmit}                     // A callback function with some custom logic to process data submitted via form
        type={type}                                 // document type to be displayed in form controlled from "./DocumentTypes.js"
      />
    </Card.Body>
  </Card>
}