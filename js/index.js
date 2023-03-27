import Player from "./player.js";

new Player({
	target: ".my-player",
	slides: [
		{
			url: "https://i.pinimg.com/474x/49/6d/8f/496d8f4a6009aca8bc03131098f3d533.jpg",
			alt: "slide1",
			filter: ['contrast(150%)', 'blur(5px)'],
			overlays: [
				{
					type: "Text",
					text: "Hello!",
					classes: ["watercolor"],
					styles: {
						color: 'orange',
						"font-size": "60px",
						"text-shadow": "1px 1px #000",
						top: "60%",
						left: "30%",
						transform: "rotate(-90deg)",
						animation: "scale 2s infinite ease-in-out"
						
					}
				}
			
			]
		},
		{
			url: "https://i.pinimg.com/474x/b7/d5/4c/b7d54cbc102493c40a279a5902eeae5a.jpg",
			alt: "slide1",
			
			overlays: []
		},
		{
			url: "https://i.pinimg.com/474x/b0/ea/8b/b0ea8b9f7d4ed652a62b1a58165f1efd.jpg",
			alt: "slide1",
			
			overlays: [
				{
					type: "Text",
					text: "Hello world!",
					styles: {
						color: "blue",
						"font-size": "30px",
						"text-shadow": "1px 1px #000",
						bottom: "60%",
						right: "30%",
						transform: "rotate(-30deg)",
						animation: "scale 2s infinite ease-in-out"
					}
				}
			]
		},
		{ url: "https://i.pinimg.com/474x/ab/57/11/ab571192e42c7700a8e21dee5561091d.jpg", alt: "slide1" },
		{ url: "https://i.pinimg.com/474x/03/6c/e6/036ce6a861a600547dfce558dcdf5b07.jpg", alt: "slide1" }
	]
})
