// framework imports
import React, { Component } from 'react';

// component imports
import DestinationDropdownList from './DestinationDropdownList';

// data imports
import stations from '../../data/stations';


// component that lets the user chose departure and arrival destinations as well as time of travel
class Destination extends Component {
    constructor(props){
        super(props)
        this.state = {
            drop: false, 
            stations: stations,
            setStartPoint: false,
            setEndPoint: false
        }
    }

    // method for checking if departure and arrival is selected
    // check is used to conditionally render proceed button
    checkIfDepartureAndArrivalSelected = () => {
        if(this.props.startPoint && this.props.endPoint){
            this.props.continueToDepartures();
        }
    }

    // click handlers for selecting departure/arrival
    clickDepartureStation = () => {
        this.setState({drop: true, setStartPoint: true})
    }
    clickArrivalStation = () => {
        this.setState({drop: true, setEndPoint: true})
    }

    // method for hiding dropdown menu once departure/destination has been chosen
    hideDropDownMenu = () => {
        this.setState({drop: false, setStartPoint: false, setEndPoint: false})
    }

    // method for shown if dropdown menu once departure/destination has been clicked
    renderDropDownMenu = () => {
        return (
            <DestinationDropdownList
                isStartPoint={this.state.setStartPoint}
                isEndPoint={this.state.setEndPoint}
                startPoint={this.props.startPoint}
                endPoint={this.props.endPoint}
                setStartPoint={this.props.setStartPoint}
                setEndPoint={this.props.setEndPoint}
                stations={this.state.stations}
                hideDropDownMenu={this.hideDropDownMenu}
            />
        )
    }

    render() {
        let proceedButton;

        // check if both start and endpoint has been chosen before allowinf the user to proceed
		if (this.props.startPoint && this.props.endPoint){
            proceedButton = (
                <button onClick={this.checkIfDepartureAndArrivalSelected}
                    className="p-3 w-full bg-vy-green-300 text-center text-sm font-medium text-white rounded-md hover:bg-vy-green-400">
                    Fortsett til avganger og billetter
                </button>
            )
        } else {
            proceedButton = (
                <button
                    className="p-3 w-full bg-gray-500 text-center text-sm font-medium text-white rounded-md cursor-not-allowed">
                    Fortsett til avganger og billetter
                </button>
            )
        }
		        
        return (
            <div className={this.props.chooseDestination ? "block" : "hidden"}>
                <div>
                    <div className="pl-5 pr-5 pb-5">
                        <p className="text-sm font-medium pb-1 text-gray-800">Avreise og destinasjon</p>
                        <input
                            className="px-3 py-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700 cursor-pointer" 
                            placeholder="Avreise"  
                            defaultValue={this.props.startPoint}
                            onClick={this.clickDepartureStation} 
                            onFocus={this.clickDepartureStation}
                        />
                        {this.state.drop ? this.renderDropDownMenu() : null}
                        <input
                            className="px-3 py-2 w-full border rounded border-gray-400 text-sm text-gray-700 cursor-pointer" 
                            placeholder="Destinasjon"
                            defaultValue={this.props.endPoint}
                            onClick={this.clickArrivalStation} 
                            onFocus={this.clickArrivalStation}
                        />
                    </div>
                </div>
                <div className="px-5">
                    <p className="text-sm font-medium pb-1 text-gray-800">Når vil du reise?</p>
                </div>{" "}
                <div className="px-5">
                    <div className="rounded-md mb-3 p-1 flex flex-row w-auto bg-gray-300">
                        <button className="w-full bg-white p-2 rounded text-sm font-medium text-gray-700">Nå</button>
                        <button className="w-full bg-transparent  p-2 rounded text-sm font-medium text-gray-700">Ankomst</button>
                        <button className="w-full bg-transparent p-2 rounded text-sm font-medium text-gray-700">Avgang</button>
                    </div>
                    <div className="relative flex flex-row space-between mb-5">
                        <input type="date" defaultValue="2020-06-10" className="py-2 pl-8 mr-2 w-2/3 border rounded border-gray-400 text-sm text-gray-700" placeholder="Dato" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
                            <svg className="w-4 h-4 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        </div>
                        <input type="time" defaultValue="10:03" className="py-2 pl-8 w-1/3 border rounded border-gray-400 text-sm text-gray-700" placeholder="Tid" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-20 text-gray-700">
                            <svg className="w-4 h-4 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                    </div>
                </div>
                <div className="px-5 pt-5 pb-6 bg-gray-100 modal-footer">
                    {proceedButton}
                </div>
          </div>
        );    
    }
}

export default Destination;