const lang_obj = {};
const video = document.querySelector('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => video.srcObject = stream)
    .catch(err => console.log(err))
);

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.getElementById('root').append(canvas);
    const box_size = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, box_size);

    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        const resized_detections = faceapi.resizeResults(detections, box_size);

        faceapi.draw.drawDetections(canvas, resized_detections);
        faceapi.draw.drawFaceLandmarks(canvas, resized_detections);
        faceapi.draw.drawFaceExpressions(canvas, resized_detections);
    }, 100);
});