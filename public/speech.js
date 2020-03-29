// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
// var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
// let recognition = new SpeechRecognition();
// let speechRecognitionList = new SpeechGrammarList();
var say = window.speechSynthesis;
let sayThis;
var voices = [];
const grammar = '#JSGF V1.0';
// ;grammar orders; public <orders> = ' + orders.join(' | ') +  ';';
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;
// // recognition.continuous = false;
// recognition.lang = 'en-US';
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;
let computerSays = document.getElementsByClassName('voice')

words = ()=>{
  console.log(computerSays[computerSays.length - 1].innerHTML);
      //speak to customer
      //get device voices
      voices = say.getVoices();
      //establish speech instance and where to get what to say
      sayThis = new SpeechSynthesisUtterance(computerSays[computerSays.length - 1].innerHTML);
      //control speech volume
      sayThis.volume = 0.8;
      //get voice from array of voices (on mac this is google US voice)
      sayThis.voice = voices[48];
      //say what is in cashier.innerHTML
      say.speak(sayThis);
      // sayThis.onend = ()=>{
      //   recognition.start()
      //   //start listening
      //   this.listen(order)
      // }
    }
