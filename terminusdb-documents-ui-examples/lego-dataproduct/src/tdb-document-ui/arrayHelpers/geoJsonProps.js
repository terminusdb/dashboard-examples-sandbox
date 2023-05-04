import React, { useState, useEffect } from "react"
import { CREATE, B_BOX, GEOMETRY_COLLECTION, FEATURE, POLYGON } from "../constants"
 
// POINT
export function constructGeoJSONProps(props, type) {
  // change in lat & lng
  function handleChange(data, name, props) {
    let tmpFormData = props.formData ? props.formData : []
    if(name === "latitude__0") tmpFormData[0] = data 
    if(name === "longitude__1") tmpFormData[1] = data 
   // props.onChange(tmpFormData, name)
   if(type === GEOMETRY_COLLECTION || type === FEATURE) props.onChange(tmpFormData, name) // pass field name lat_0 & lng_0 
   else props.onChange(tmpFormData, props.name)
  }

  let geoJSONProps = {
    canAdd: false,
    className: "field field-array field-array-of-string",
    formData: props.formData ? props.formData : [undefined, undefined],
    idSchema: {"$id": 'root_coordinates' },
    required: props.required,
    title: props.name,
    name: props.name,
    hideFieldLabel: false,
    child: true
  }
  geoJSONProps["items"] = []
  for(let count = 0; count < 2; count++) {
    let item = {
      children: {
        props: {
          formData: props.formData ? count===0 ? props.formData[0] : props.formData[1] : undefined,
          idSchema: {"$id": `root_coordinates_${count}`},
          index: count,
          onChange: (data, name) =>  handleChange(data, name, props) ,
          required: true
        }
      },
      className: "array-item",
      hasMoveDown: false,
      hasRemove: false,
      hasMoveUp: false,
      index: count,
    }
    geoJSONProps["items"].push(item)
  }
  return geoJSONProps
}

// BBOX 
export function constructBBoxProps (props) {
  // change in lat & lng
  function handleChange(data, name, props) {
    let tmpFormData = props.formData ? props.formData : []
    if(name === "west__0") tmpFormData[0] = data 
    if(name === "south__1") tmpFormData[1] = data 
    if(name === "east__2") tmpFormData[2] = data 
    if(name === "north__3") tmpFormData[3] = data 
    props.onChange(tmpFormData, B_BOX, name )  // pass field name as well 
  }

  let geoJSONProps = {
    canAdd: false,
    className: "field field-array field-array-of-string",
    formData: props.formData ? props.formData : [undefined, undefined, undefined, undefined],
    idSchema: {"$id": 'root_bbox' },
    required: props.required,
    title: props.name,
    name: props.name,
    hideFieldLabel: false,
    child: true
  }

  geoJSONProps["items"] = []
  for(let count = 0; count < 4; count++) {
    let item = {
      children: { 
        props: {
          formData:  props.formData ? props.formData[count] : undefined,
          idSchema: {"$id": `root_bbox_${count}`},
          index: count,
          onChange: (data, name) =>  handleChange(data, name, props) ,
          required: true
        }
      },
      className: "array-item",
      hasMoveDown: false,
      hasRemove: false,
      hasMoveUp: false,
      index: count
    }
    geoJSONProps["items"].push(item)
  }
  return geoJSONProps
}


// LINE_STRING & POLYGON uses the same props
export function constructLineStringProps (props, type){
  const [update, setUpdate] = useState(Date.now())
  const [items, setItems] = useState(gatherItems(props, update))
  let coordinates = props.formData ? props.formData : []

  function gatherItems(props, update) {
    if(props.mode === CREATE) return []
    // no data available in EDIT Mode
    if(!props.formData.length) return []
    
    let itemArray = []
  
    for(let index = 0; index < props.formData.length; index++) {
      let itemProps = {
        update: update,
        children: {
          props: {
            formData:  props.formData[index] ?  props.formData[index] : [undefined, undefined],
            idSchema: {"$id": `root_coordinates_${index}`},
            index: index,
            onChange: (data, name, index) => handleChange(data, name, index),
            required: true,
            child: true
          }
        },
        className: "array-item",
        hasMoveDown: false,
        hasMoveUp: false,
        hasRemove: false,
        index: index,
        key: `root_coordinates_${index}`
      }
      itemArray.push(itemProps)
    }
    return itemArray
  }

  // change in lat & lng
  function handleChange(data, name, index) {
    // gather coordinate entry lat and lng
    let tmpFormData = coordinates[index] ?  coordinates[index] : [undefined, undefined]
    if(name === `latitude__${index}`) tmpFormData[0] = data[0]
    if(name === `longitude__${index}`) tmpFormData[1] = data[1]
    coordinates[index] = tmpFormData
    let tmpDocumentFormData = props.formData
    if(tmpDocumentFormData) tmpDocumentFormData[index] = coordinates[index]
    else tmpDocumentFormData = coordinates
    // add on to subdocument formdata based on index
    //props.onChange(tmpDocumentFormData) // subdoc change
    //props.onChange(tmpDocumentFormData, name) // subdoc change
    if(type === GEOMETRY_COLLECTION || type === FEATURE) props.onChange(tmpDocumentFormData, name) // subdoc change
    else props.onChange(tmpDocumentFormData, props.name) // subdoc change
    // set update to so as to force change in props.formData in document level
    if(props.mode !== CREATE) setUpdate(Date.now())
  }


  function onAddClick () {
    // add items based on items.length
    let index = items.length
    let itemProps = {
      children: {
        props: {
          formData: coordinates[index] ? coordinates[index] : [undefined, undefined],
          idSchema: {"$id": `root_coordinates_${index}`},
          index: index,
          onChange: (data, name, index) => handleChange(data, name, index),
          required: true,
          child: true // set to true for displayCoordinates onChange factor
        }
      },
      className: "array-item",
      hasMoveDown: false,
      hasMoveUp: false,
      hasRemove: false,
      index: index,
      key: `root_coordinates_${index}`
  
    }
    setItems(arr => [...arr, itemProps]);
  }

  let geoJSONProps = {
    canAdd: true,
    className: "field field-array field-array-of-string",
    formData: props.formData ? props.formData : [],
    idSchema: {"$id": 'root_coordinates' },
    required: props.required,
    title: props.name,
    name: props.name,
    hideFieldLabel: false,
    onAddClick: (e) => onAddClick()
  }

  geoJSONProps["items"] = items

  return geoJSONProps
}

// ADD POLYGON LEVEL 
/*let props_before = {
  canAdd: true,
  className: "field field-array field-array-of-string",
  formData: [],
  idSchema: {"$id": 'root_coordinates_0' },
  items: [],
  onAddClick: (e) => {},
  required: props.required,
  title: props.name,
  name: props.name,
  hideFieldLabel: false
}

//on click of add coordinates 
let props_after_add_coordinates = {
  canAdd: true,
  className: "field field-array field-array-of-string",
  formData: [ [undefined, undefined] ],
  idSchema: {"$id": 'root_coordinates_0' },
  items: [
    {
      children: {
        props: {
          formData: [undefined, undefined],
          idSchema: {"$id": `root_coordinates_0_0`},
          index: index,
          onChange: (data, name, index) => handleChange(data, name, index),
          required: true,
          child: true
        }
      },
      className: "array-item",
      hasMoveDown: false,
      hasMoveUp: false,
      hasRemove: true,
      index: 0,
      key: `root_coordinates_${0}_0`
    }
  ],
  onAddClick: (e) => {},
  required: props.required,
  title: props.name,
  name: props.name,
  hideFieldLabel: false
}*/


export function constructMultiPolygonProps(props) {

  const [polygonIndex, setPolygonIndex] = useState(0)
  //const [items, setItems] = useState(gatherItems(props, update))

  function addNewPolygon(e) {
    setPolygonIndex(polygonIndex+1)
  }
  
  let geoJSONProps = {
    canAdd: true,
    className: "field field-array field-array-of-string",
    formData: [],
    idSchema: {"$id": `root_coordinates_${polygonIndex}` },
    onAddClick: (e) => addNewPolygon(e),
    //required: props.required,
    title: props.title,
    name: props.name,
    hideFieldLabel: false
  }

  //geoJSONProps["items"] = items

  return geoJSONProps
}





