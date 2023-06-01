import React, { useEffect } from "react";
import { FrameObj } from "./frameInit"
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { json } from '@codemirror/lang-json';
import { EditorView } from "@codemirror/view";

export const FrameEditor = () => {
	const {	
		frames,
		setFrames  
	} = FrameObj()

	if(!frames) return <div/>

  const textRef = React.useRef();
	const [code, setCode] = React.useState(
    JSON.stringify(frames, null, 2)
  );
  
	useEffect(() => {
    if (textRef.current) {
      const obj = new SelectionText(textRef.current);
      //console.log("obj:", obj);
    }
  }, []);

	const onChangeHandler = React.useCallback((value, viewUpdate) => {
		try{
			const parsedData = JSON.parse(value)
			setFrames(parsedData)
		}catch(err){
			console.log(err.message)
		}
	}, []);


	return <CodeMirror 
		minHeight="200px" 
		value={JSON.stringify(!frames ? {} : frames, null, 2)}
		theme={vscodeDark}
		extensions={[json(),EditorView.lineWrapping]}
		className={"document__interface__main"}
		onChange={onChangeHandler}
	/>

  
}
