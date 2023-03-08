function setup() {
    const video  = createCapture(VIDEO);
    video.size(320,240);
    const button = document.getElementById("submit");
    button.addEventListener('click', async event => {
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        document.getElementById("capturedImage").src= image64;
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({image: image64})
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
    })
}