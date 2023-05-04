import React from "react"
import ReactDOM from "react-dom"
import App from "./Layout"
import { FrameProvider } from './frameInit'

function InitComponent () {

	return <FrameProvider>
		<App />
	</FrameProvider>
}

ReactDOM.render(
	<InitComponent/>,
	document.getElementById("root")
)
