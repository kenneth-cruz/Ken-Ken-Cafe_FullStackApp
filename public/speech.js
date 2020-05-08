var say = window.speechSynthesis;
let sayThis;
var voices = [];
const grammar = '#JSGF V1.0';
let computerSays = document.getElementsByClassName('voice')

words = ()=>{
  console.log(computerSays[computerSays.length - 1].innerHTML);
      voices = say.getVoices();
      sayThis = new SpeechSynthesisUtterance(computerSays[computerSays.length - 1].innerHTML);
      sayThis.volume = 0.8;
      sayThis.voice = voices[48];
      say.speak(sayThis);
    }
