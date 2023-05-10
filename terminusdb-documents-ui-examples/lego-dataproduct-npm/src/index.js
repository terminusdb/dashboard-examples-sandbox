import React from "react"
import ReactDOM from "react-dom"
import App from "./Layout"
import { FrameProvider } from './frameInit'
import '@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__darkly.css'


function InitComponent () {

	return <FrameProvider>
		<App />
	</FrameProvider>
}

ReactDOM.render(
	<InitComponent/>,
	document.getElementById("root")
)
