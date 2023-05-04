

// simple frame with Person Document and Name field
export const SET_RDF_LANG_DATA_TYPE_FRAME = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#",
		"@type": "Context",
		"xsd": "http://www.w3.org/2001/XMLSchema#"
	},
	"Person": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "lang": {
			"@class": "rdf:langString",
			"@type": "Set"
		}
  }
} 

// expected data on Create 
export const SET_RDF_LANG_DATA_TYPE_CREATE_DATA = {
	"@type": "Person",
	"lang": [
    {
      "@lang": "ka",
      "@value": "ქართველს"
    },
		{
      "@lang": "en",
      "@value": "to english"
    }
  ]
}

// expected data on Create 
export const SET_RDF_LANG_DATA_TYPE_CREATE_DATA_ORIGINAL = {
	"@id": "Person/232108",
	"@type": "Person",
	"lang": [
    {
      "@lang": "ka",
      "@value": "ქართველს"
    },
		{
      "@lang": "en",
      "@value": "to english"
    }
  ]
}

// expected data on Edit 
export const SET_RDF_LANG_DATA_TYPE_EDIT_DATA = {
	"@id": "Person/232108",
	"@type": "Person",
	"lang": [
    {
      "@lang": "ka",
      "@value": "ქართველი"
    },
		{
      "@lang": "en",
      "@value": "to english"
    },
		{
      "@lang": "fr",
      "@value": "français"
    }
  ]
}

// create config 
export const CREATE_CONFIG = {
	frame: SET_RDF_LANG_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: {},
	input: SET_RDF_LANG_DATA_TYPE_CREATE_DATA,
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: SET_RDF_LANG_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: SET_RDF_LANG_DATA_TYPE_CREATE_DATA_ORIGINAL, // pass created data here & we will modify with Edit data
	input: SET_RDF_LANG_DATA_TYPE_EDIT_DATA,
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: SET_RDF_LANG_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: SET_RDF_LANG_DATA_TYPE_EDIT_DATA,
	mode: "View"
}

