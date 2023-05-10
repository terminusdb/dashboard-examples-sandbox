// submitted data displays the data extracted from <FrameViewer/> on create or edit mode
// submitted data is preloaded with formdata which is taken from Controller.js in View mode
import React from "react"
import { FrameObj } from "./frameInit"
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en'

export const SubmittedData = () => {
  const {
		data
	} = FrameObj()

	return <JSONInput
		id='submitted_data_field'
		locale={ locale }
		placeholder={data}
		viewOnly={true}
		height= {"550px"}
		width= {"380px"}
	/>
}