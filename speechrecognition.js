// Get DOM elements
const startBtn = document.getElementById('startBtn');
const output = document.getElementById('output');

// Create a SpeechRecognition object
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

// Set recognition properties
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let recognitionActive = false;

// Event listener for the start button click
startBtn.addEventListener('click', () => {
    if (!recognitionActive) {
        recognition.start();
        recognitionActive = true;
        startBtn.textContent = 'Stop Speech Recognition';
    } else {
        recognition.stop();
    }
});

// Event listeners for various recognition events
recognition.onstart = () => {
    console.log('Speech recognition started');
};

recognition.onend = () => {
    console.log('Speech recognition ended');
    if (recognitionActive) {
        recognition.start();
    }
};

recognition.onboundary = (event) => {
    console.log('Speech recognition boundary reached:', event);
};

recognition.onsoundstart = () => {
    console.log('Speech recognition sound started');
};

recognition.onsoundend = () => {
    console.log('Speech recognition sound ended');
};

recognition.onerror = (event) => {
    console.error('Error occurred in recognition:', event);
    recognitionActive = false;
    startBtn.textContent = '🎙️';
};

recognition.onresult = (event) => {
    console.log('Recognition result:', event);
    const transcript = event.results[0][0].transcript;
    output.textContent = `You said: ${transcript}`;
    recognitionActive = false;
    startBtn.textContent = '🎙️';
};
