// framework imports
import React from 'react';


// modal that displays the first time the app is opened to inform about the new sharing feature
function IntroModal(props) {
     return (
		<React.Fragment>
			<div className="w-full h-full z-10 block absolute bottom-0 bg-black opacity-25"></div>
			<div className="z-30 mx-5 absolute bottom-0 w-auto">
				<div className="bg-white rounded-md mb-3 p-6 text-center shadow-xl">
					<div className="flex justify-center mb-6">
						<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="24" cy="24" r="24" fill="#FDFDEA"/>
							<path d="M23.9998 16C22.4085 16 20.8824 16.6321 19.7571 17.7574C18.6319 18.8826 17.9998 20.4087 17.9998 22V25.586L17.2928 26.293C17.153 26.4329 17.0578 26.611 17.0192 26.805C16.9806 26.9989 17.0004 27.2 17.0761 27.3827C17.1518 27.5654 17.2799 27.7215 17.4443 27.8314C17.6087 27.9413 17.802 28 17.9998 28H29.9998C30.1975 28 30.3908 27.9413 30.5552 27.8314C30.7197 27.7215 30.8478 27.5654 30.9235 27.3827C30.9991 27.2 31.0189 26.9989 30.9804 26.805C30.9418 26.611 30.8466 26.4329 30.7068 26.293L29.9998 25.586V22C29.9998 20.4087 29.3676 18.8826 28.2424 17.7574C27.1172 16.6321 25.5911 16 23.9998 16ZM23.9998 32C23.2041 32 22.4411 31.6839 21.8785 31.1213C21.3159 30.5587 20.9998 29.7956 20.9998 29H26.9998C26.9998 29.7956 26.6837 30.5587 26.1211 31.1213C25.5585 31.6839 24.7954 32 23.9998 32Z" fill="#E3A008"/>
						</svg>
					</div>
					<h2 className="text-lg font-medium mb-2">Ny delefunksjon!</h2>
					<p className="text-sm text-gray-700">
						Har du prøvd vår nye delingsfunksjon? Du bestiller billetter som vanlig, og etter kjøpt billett kan du sende billetten til venner og bekjente!
					</p>
				</div>
				<button
					className="shadow-xl p-3 w-full bg-white text-center text-sm font-medium text-black rounded-md hover:cursor mb-6"
					onClick={props.closeIntroModal}
				>
					Lukk
				</button>
			</div>
		</React.Fragment>
    );
}

export default IntroModal;