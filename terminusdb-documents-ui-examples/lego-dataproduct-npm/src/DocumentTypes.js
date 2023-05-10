// lets you choose various document types available in Parts & Components Inventory Data product 
// This component provides you with a Nav in which you can see the <FrameViewer/> component changing 
// when clicked on a particular type
import React, { useState } from "react"
import { FrameObj } from "./frameInit"
import Nav from 'react-bootstrap/Nav';

export const DocumentTypes = () => {
  const [activeKey, setActiveKey] = useState("Theme")
  const {
		frames,
    setType
	} = FrameObj()

  if(!frames) return <div/>
  let docTypes = []

  function handleNavClick(selectedKey) {
    setActiveKey(selectedKey)
    setType(selectedKey)
  }

  for(let docs in frames) {
    // display on classes 
    if(frames[docs].hasOwnProperty("@type") && 
      frames[docs]["@type"] === "Class" && 
      !frames[docs].hasOwnProperty("@subdocument")) {
        docTypes.push(<Nav.Item>
          <Nav.Link eventKey={docs}>{docs}</Nav.Link>
        </Nav.Item>)
      }
  }

  return <Nav
    activeKey={activeKey}
    variant="pills"
    className="mb-4"
    onSelect={(selectedKey) => handleNavClick(selectedKey)}
  >
    {docTypes}
  </Nav>

}