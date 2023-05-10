/**
 * terminusdb-documents-ui example is based on a Parts & Components Inventory Data Product which 
 * features Lego sets and their individual components and the relationships between them. 
 * This shows an example of organizations that have interconnected components and parts within their 
 * product offerings.
 * 
 * This code example shows how to use FrameViewers to create, edit or view a schema controlled 
 * TerminusDB document. We have trhe following controllers in this app -
 * <DocumentTypes/> lets you choose various document types to be displayed
 * <MoreInfo/> tells shows you the code on how to use <FrameViewer/> component
 * <ModeBar/> is a widget which helps you change modes on your TerminusDB document (create/ edit or View)
 * <Editor/> is a widget in which you can alter the Frames to see the <FrameViewer/> component being altered in real time
 * 	This widget also has a Submitted Data section which displays the data being submitted or viewed via the <FrameViewer/> form
 */
import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { View } from "./View"
import { ModeBar } from "./ModeBar"
import { DocumentTypes } from "./DocumentTypes"
import { Editor } from './Editors';
import { MoreInfo } from "./MoreInfoCanvas"
 
const App= (props) =>{ 

	return <Container fluid="xxl" className='mt-5'>
		<h3 className='text-success'>{`Parts & Components Inventory`}</h3>
		<h5 className='mb-4 text-muted'>{`This data product features Lego sets and their individual components and the relationships between them. 
			It is an excellent example of organizations that have interconnected components and parts within their product offerings.`}
		</h5>
		<DocumentTypes/>
		<MoreInfo/>
		<Row>
			<Col md={4}>
				<ModeBar/>
				<Editor/>
			</Col>
			<Col md={8}><View/></Col>
		</Row>
	</Container>
	
}

export default App