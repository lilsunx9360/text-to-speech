const inputText = document.querySelector('#text-area');
const selectElement = document.getElementById('select-element');
const speakBtn = document.getElementById('speak-btn');
const range = document.querySelector('#range');
const rangeValue = document.querySelector('#range-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body')
const synth = window.speechSynthesis;
let voices = [];
const populateVoices = () => {
  voices = synth.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.textContent = voice.name + ' (' + voice.lang + ')';
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    selectElement.appendChild(option);
  });
};

// Populate voices initially
populateVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = populateVoices;
} else {
  console.log('synth.onvoiceschanged not supported, voices might not update dynamically.');
}

// Function to speak the entered text
const speakText = () => {
  if (synth.speaking) {
    synth.cancel(); // Cancel the current speech if speaking
  }
  if (inputText.value !== '') {
  body.style.background ='#141414 url(./data/_.gif)';
  body.style.backgroundRepeat = 'repeat-X';
  body.style.backgroundSize = '100% 100%'; 
    const textToSpeak = new SpeechSynthesisUtterance(inputText.value);

    const selectedVoice = selectElement.selectedOptions[0].getAttribute('data-name');
    
    textToSpeak.onend = e =>{
      e.preventDefault();
      body.style.background ='#141414'
    }
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        textToSpeak.voice = voice;
      }

    });

    textToSpeak.rate = range.value;
    textToSpeak.pitch = pitch.value;

    synth.speak(textToSpeak);
  }
};

// Event listener for the Speak button
speakBtn.addEventListener('click', (e) => {
  e.preventDefault();
  speakText();
  inputText.blur();
});

// Event listeners for range and pitch inputs
range.addEventListener('input', (e) => {
  rangeValue.textContent = e.target.value;
});

pitch.addEventListener('input', (e) => {
  pitchValue.textContent = e.target.value;
});
