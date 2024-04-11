import React, {useRef, useState} from "react";
import "./ImageGenerator.css";
import default_image from "../Assets/default_img.jpeg";

const ImageGenerator = () => {
	const [image_url, setImage_url] = useState("/");
	let inputRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const imageGenerator = async () => {
		if (inputRef.current.value === "") {
			return 0;
		}
		setLoading(true);
		const apikey = process.env.REACT_APP_OPENAI_API_KEY;
		const response = await fetch("https://api.openai.com/v1/images/generations", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apikey}`,
				"User-Agent": "Chrome",
			},
			body: JSON.stringify({
				prompt: `${inputRef.current.value}`,
				n: 1,
				size: "512x512",
			}),
		});
		let data = await response.json();
		let data_array = data.data;
		setImage_url(data_array[0].url);
		setLoading(false);
	};

	return (
		<div className="ai-image-generator">
			<div className="header">
				AI image <span>generator</span>
			</div>
			<div className="img-loading">
				<div className="image">
					<img src={image_url === "/" ? default_image : image_url} alt="" />
				</div>
				<div className="loading">
					<div className={loading ? "loading-bar-full" : "loading-bar"}></div>
					<div className={loading ? "loading-text" : "display-none"}>로딩중...</div>
				</div>
			</div>
			<div className="search-box">
				<input type="text" ref={inputRef} className="search-input" placeholder="생성하고 싶은 그림에대한 프롬프트를 생성하세요!" />
				<div
					className="generate-btn"
					onClick={() => {
						imageGenerator();
					}}
				>
					생성하기
				</div>
			</div>
		</div>
	);
};

export default ImageGenerator;
