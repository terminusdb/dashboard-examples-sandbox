import React from "react"
import ReactDOM from "react-dom"
import App from "./Layout"
import { FrameProvider } from './frameInit'
import { BrowserRouter as Router } from "react-router-dom";
import "bootswatch/dist/darkly/bootstrap.min.css";
//import "@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__darkly.css"

function InitComponent () {

	let config = {
		server:  process.env.SERVER,
		user: process.env.USER,
		team: process.env.TEAM,
		token: process.env.TOKEN,
		dataProduct: process.env.DATA_PRODUCT
	}

	//console.log(" --- config --- ", config) 

	return <FrameProvider config={config}>
		<App /> 
	</FrameProvider>
}

ReactDOM.render(
	<Router>
		<InitComponent/>
	</Router>
,
	document.getElementById("root")
)
