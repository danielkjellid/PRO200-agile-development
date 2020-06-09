// framework imports
import React from 'react'


// component that displays a page header with user info, as well as button to initiate purchase process
function UserHeader(props) {

    let userName = props.userName;
    let userNameDisplay = userName ? userName[0].firstName : "kunde";

    const date = new Date()
    const hours = date.getHours()
    let timeOfDay

    // display "Good morning/evening/night" based on the hour of the day
    if (hours < 12) {
        timeOfDay = "morgen"
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = "ettermiddag"
    } else {
        timeOfDay = "kveld"
    }

    return (
        <div>
            <div className="bg-white shadow">
                <div className="px-5 py-5">
                    <div className="border-b border-gray-300">
                        <div className="flex items-center pb-4">
                            <div>
                                <img src={process.env.PUBLIC_URL + '/images/' + userNameDisplay.toLowerCase() + '.jpg'} alt={userNameDisplay} className="rounded-full w-16 h-16"/>
                            </div>
                            <div className="ml-5">
                                <h1 className="font-bold text-2xl text-gray-800">
                                    God {timeOfDay}, {userNameDisplay}
                                </h1>
                                <div className="flex items-center">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        className="text-green-400 h-5 w-5"
                                    >
                                        <path
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="ml-1 mb-px font-medium text-gray-700 text-sm">
                                        Verifisert konto
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4">
                        <button
                            onClick={props.buttonHandler}
                            className="bg-vy-green-300 text-white text-sm font-medium rounded-lg px-4 py-3 w-full hover:bg-vy-green-400"
                        >
                            Ny billett
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHeader