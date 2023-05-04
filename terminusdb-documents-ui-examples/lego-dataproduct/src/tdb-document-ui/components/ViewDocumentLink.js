import React, { useState } from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import Card from "react-bootstrap/Card"
import Stack from "react-bootstrap/Stack"
import { display } from "../helpers/display"
import { TDBLabel } from "./LabelComponent"
import { ToggleComponent } from "./ToggleDocumentLink"
import { getLinkedDescription, getDocumentLinkChoiceDescription } from "./DescriptionComponent"
import { v4 as uuidv4 } from 'uuid';
import Button from "react-bootstrap/Button"
import { BsTrashFill } from "react-icons/bs"
import { SearchExistingLink } from "./SearchExistingLink"
import { CreateDocument, CreateDisplay } from "./CreateDocumentLink"
import { documentInternalProperties } from "../helpers/documentHelpers"

 
const DisplayLinks = ({ documentData, args, uiFrame, index, propertyDocumentation, reference, cardKey, onTraverse, setDocumentData, unfoldable, action, formData, onChange, documentLinkPropertyName, extracted, required, mode, linked_to }) => {
  
  let documentID = formData ? typeof formData=== CONST.STRING_TYPE ? formData : formData["@id"] : false 

  /*if(action === CONST.LINK_NEW_DOCUMENT) {
    // @unfoldable true
    documentID = formData["@id"]
  }
  else {
    // @unfoldable false
    documentID = formData
  } */

  if(!documentID) return <div className={`tdb__${documentLinkPropertyName}__hidden`}/>

  let defaultClassName="", className=""
  let uiClassNames=util.getUIClassNames(uiFrame, documentLinkPropertyName, defaultClassName, index)
  if(uiClassNames === "tdb__doc__input tdb__diff__original") className="tdb__diff__original-underline"
  else if(uiClassNames === "tdb__doc__input tdb__diff__changed") className="tdb__diff__changed-underline"

  return <SearchExistingLink mode={mode} 
      formData={documentID}
      onChange={onChange}
      className={className}
      onTraverse={onTraverse}
      id={cardKey}
      linked_to={linked_to}/>
}



function getAction (formData, unfoldable) {
  if(unfoldable && 
    typeof formData === CONST.OBJECT_TYPE) return CONST.LINK_NEW_DOCUMENT
  return CONST.LINK_EXISTING_DOCUMENT
}

const ViewHelper = ({ linked_to }) => {
  return <Stack direction="horizontal" gap={4}>
    {getLinkedDescription (linked_to)}
  </Stack> 
}
 

// VIEW MODE
export const ViewDocument = ({ name, required, args, uiFrame, reference, index, hideFieldLabel, depth, comment, formData, linked_to, extracted, mode, onChange, unfoldable, onTraverse, propertyDocumentation }) => {

  const [action, setAction] = useState(getAction(formData, unfoldable))
  const [documentData, setDocumentData] = useState(formData)
  const [cardKey, setCardKey]=useState(depth+1)

  if(mode === CONST.VIEW && !formData) return <div className={`tdb__${name}__hidden`}/> 
 

  return <Stack direction="horizontal">
    <TDBLabel name={name} required={required} comment={comment} className={"tdb__label__width"} hideFieldLabel={hideFieldLabel}/>
    <Card bg="secondary" className="mb-3 border border-dark w-100" key={cardKey}>
      <Card.Header>
        <ViewHelper linked_to={linked_to}/>
      </Card.Header>
      <Card.Body>
        <DisplayLinks action={action} 
          extracted={extracted}
          required={required}
          args={args}
          index={index}
          mode={mode}
          unfoldable={unfoldable}
          onTraverse={onTraverse}
          uiFrame={uiFrame}
          onChange={onChange}
          linked_to={linked_to}
          propertyDocumentation={propertyDocumentation}
          cardKey={cardKey}
          reference={reference}
          formData={formData}
          documentLinkPropertyName={name}
          documentData={documentData} 
          setDocumentData={setDocumentData}/>
      </Card.Body>
    </Card>
  </Stack>
}

// logic to display filled frame is @unfoldable is true
/*const DisplayFilledFrame = ({ documentData, args, uiFrame, propertyDocumentation, reference, cardKey, onTraverse, setDocumentData, unfoldable, action, formData, onChange, documentLinkPropertyName, extracted, required, mode, linked_to }) => {


  if(action === CONST.LINK_NEW_DOCUMENT) {

    let fields = []

    function handleChange(data, fieldName) {
      let tempDocumentData = documentData
      // if field name is undefined
      // at this point means that its the document link's data 
      // so we pass linked_to as param
      tempDocumentData[fieldName ? fieldName : documentLinkPropertyName]=data
      setDocumentData(tempDocumentData)
      if(onChange) onChange(tempDocumentData)
    }

    // definitions will have definitions of linked_to frames
    let definitions = util.availableInReference(reference, linked_to) ?  reference[linked_to]: extracted.properties

    let defaultClassName="tdb__doc__input"

    //for(let field in extracted.properties) {
    for(let field in definitions.properties) {  
          
      linked_to = definitions.properties[field][CONST.PLACEHOLDER]
      if(util.availableInReference(reference, linked_to)) {
        // unfolderdLinkPropertyName stores the property name which is linked to unfolded Document
        // we need this value to understand diff uis 
        if(!formData.hasOwnProperty(field)) fields.push(<div className="empty"/>) 
        else fields.push(<ViewDocument name={field} 
          onChange={handleChange}
          linked_to={linked_to}
          mode={mode}
          args={args}
          depth={cardKey}
          reference={reference}
          propertyDocumentation={propertyDocumentation}
          unfoldable={unfoldable}
          formData={formData[field]}
          extracted={definitions}
          //comment={comment}  // review
          required={required} />)
      }
      else {

        // internal properties
        let fieldName = definitions.properties[field].title
        let fieldID=`root_${documentLinkPropertyName}_${fieldName}_${cardKey}`
        let defaultClassName="tdb__doc__input"
        //let fieldUIFrame= util.getFieldUIFrame (uiFrame, subDocumentPropertyName, defaultClassName, index)


        let config = {
          properties: definitions.properties,
          propertyName: documentLinkPropertyName,
          id: fieldID,
          key: `${linked_to}__${uuidv4()}`,
          formData: { [fieldName] : util.getFormDataPerProperty(documentData, fieldName) },
          required: definitions.required.includes(fieldName),
          mode: mode,
          args: args,
          //fieldUIFrame: fieldUIFrame, // review diff ui
          onChange: handleChange,
          defaultClassName: defaultClassName,
          currentDocumentClass: formData[CONST.TYPE],
          propertyDocumentation: propertyDocumentation
        }

        // review fix order_by
        fields.push(documentInternalProperties(config, field))


        // internal properties
        /*let fieldName = deifinitions.properties[field].title
        let fieldID=`root_${documentLinkPropertyName}_${fieldName}_${cardKey}`
        
        let config = {
          dataType: deifinitions.properties[field][CONST.PLACEHOLDER], // dataType will be xsd:string or xsd:dateTime etc
          name: fieldName,
          key: `${linked_to}__${uuidv4()}`,
          formData: util.getFormDataPerProperty(documentData, fieldName),
          required: deifinitions.required.includes(fieldName), 
          mode: mode, 
          id: fieldID, 
          formData: documentData[field],
          placeholder: deifinitions.properties[field][CONST.PLACEHOLDER],
          className:  defaultClassName,
          onChange: handleChange,
          documentation: "" // review util.checkIfPropertyHasDocumentation(propertyDocumentation, fieldName)  
        }
        fields.push(display(config)) */
      /*}
    }

    return <div className="mt-4">
      {fields}
    </div>

  }
  else if(action === CONST.LINK_EXISTING_DOCUMENT) {
    return <SearchExistingLink mode={mode} 
      formData={formData}
      onChange={onChange}
      onTraverse={onTraverse}
      id={cardKey}
      linked_to={linked_to}/>
  }
  return <div/>
}*/
