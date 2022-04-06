import "./LoadingScreen.css";
const LoadingScreen = () => {
	return (
		<div className="loading-screen">
			<div className="loading-screen-center">
				<img
					src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/0ce347b6491e6f0d3ecf755fb47c149b013445c3/spinner.png"
					alt=""
					className="loading_screen_spinner loading_screen_spinner_dark"
				></img>
			</div>
		</div>
	);
};

export default LoadingScreen;
