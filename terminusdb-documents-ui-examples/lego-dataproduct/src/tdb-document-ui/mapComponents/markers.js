
import { MAP_OPTION, MARKER_OPTION } from "./map.constants"
import * as CONST from "../constants"

export function getCenterFromData (data) {
	if(!data.length) return MAP_OPTION.center
	
	//if(!data[0].hasOwnProperty(CONST.COORDINATES_FIELD)) return MAP_OPTION.center
	let firstEntry = data[0]
	if(firstEntry[CONST.TYPE] === CONST.POINT) return firstEntry[CONST.COORDINATES_FIELD]
	else if(firstEntry[CONST.TYPE] === CONST.LINE_STRING_TYPE) return firstEntry[CONST.COORDINATES_FIELD][0]
	else if(firstEntry[CONST.TYPE] === CONST.POLYGON) return firstEntry[CONST.COORDINATES_FIELD][0]
	else if(firstEntry[CONST.TYPE] === CONST.MULTIPOLYGON) return firstEntry[CONST.COORDINATES_FIELD][0][0][0]
	//else if(data.filter(arr => arr.type === CONST.FEATURE)) return data[0][CONST.GEOMETRY_FIELD][CONST.COORDINATES_FIELD][0][0][0]
	else return MAP_OPTION.center
}
 
// custom changes to map options
export function customMapOptions (zoom, center, documents, type) {
	let mapOptions = MAP_OPTION

	if(zoom) {
		mapOptions.zoom=zoom
	}
	if(center){
		mapOptions.center=center
	}
	if(center===undefined && Array.isArray(documents)) {
		var extractedCenter
		if(type === CONST.POLYGON) extractedCenter=[37, -109.05]//documents[0][0]
		else if(type === CONST.LINE_STRING_TYPE) extractedCenter=documents[0][0]
		else extractedCenter=documents[0]
		mapOptions.center=extractedCenter
	}
	//mapOptions.center = MAP_OPTION.center
	return mapOptions
}

// custom changes to marker options
export function customMarkerOptions (icon) {
	let markerOptions=MARKER_OPTION
	// review this logic
	/*if(icon) {
		let custom = L.divIcon({
			className: 'custom-div-icon',
			html: "<div style='background-color:#c30b82;' class='marker-pin'></div><i class='material-icons'></i>",
			iconSize: [30, 42],
			iconAnchor: [15, 42]
		})
		return { icon: custom }
	}*/
	return markerOptions
}



const MarkerInfo = ({ clicked }) => {
	let info = []
	for(var thing in clicked) {
		if(thing === "@type") continue
    if(thing===REFRESH) continue
		info.push(
			<div className="w-100 mr-4">
				<span className="text-dark fw-bold col-md-4">{`${thing}: `}</span>
				<span className="text-dark text-break col-md-8">{ clicked[thing] }</span>
			</div>
		)
	}
	return info
}

// REWIEW this ...
export function  renderPositions(positions, onMarkerClick, polyLine, mapRef) {
	const [clicked, setClicked] = useState(false)
	return <React.Fragment>
		{positions.map((position, index) => (
			<Marker
				key={index}
				position= {[position.lat, position.lng]}
				icon= {icon}
				eventHandlers={{
					click: () => {
						setClicked(position)
						let cData = position
						cData[REFRESH] = Date.now()
						onMarkerClick(position)
					}
				}}>
					<Popup>
						<MarkerInfo clicked={clicked}/>
					</Popup>
			</Marker>
		))}

		{Array.isArray(polyLine) && polyLine.map(pl => {
			//console.log("pl.data", pl.data)
			return <>
				{/*<Polyline color={pl.color} positions={pl.data}/>*/}
			</>
		})}
	</React.Fragment>
}


