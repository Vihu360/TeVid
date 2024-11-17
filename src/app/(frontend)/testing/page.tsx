"use client"
import { useState } from 'react';

function ImageGenerator() {
	const [imageSrc, setImageSrc] = useState(null);
	const [loading, setLoading] = useState(false);

	const generateImage = async () => {
		setLoading(true);
		try {
			const response = await fetch('/api/generateImage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt: 'a scenic mountain view at sunrise' }), // Replace with your desired prompt
			});

			const data = await response.json();
			if (response.ok) {
				setImageSrc(data.output); // Set the data URL as the image source
			} else {
				console.error('Failed to generate image:', data.error);
			}
		} catch (error) {
			console.error('Error fetching image:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<button onClick={generateImage} disabled={loading}>
				{loading ? 'Generating...' : 'Generate Image'}
			</button>
			{imageSrc && <img src={imageSrc} alt="Generated" style={{ marginTop: '20px', maxWidth: '100%' }} />}
		</div>
	);
}

export default ImageGenerator;
