let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let textSpeak = new SpeechSynthesisUtterance(text);
  textSpeak.rate = 1;
  textSpeak.pitch = 1;
  textSpeak.volume = 1;
  textSpeak.lang = "hi-GB";
  window.speechSynthesis.speak(textSpeak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening");
  }
}

// Uncomment to wish the user on page load
window.addEventListener("load", () => {
  wishMe();
});

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  // Fixed condition here
  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello sir, what can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I am a Virtual Assistant created by Aditya");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube, please wait.");
    window.open("https://www.youtube.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google, please wait.");
    window.open("https://www.google.com/", "_blank");
  } else if (message.includes("open gmail")) {
    speak("Opening Gmail, please wait.");
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  } else if (message.includes("open amazon")) {
    speak("Opening Amazon, please wait.");
    window.open("https://www.amazon.in/", "_blank");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    speak(time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak(date);
  } else {
    let finalText =
      "This is what I found related to your queries regarding " +
      message.replace("synthia", "");
    speak(finalText);
    window.open(
      `https://www.google.com/search?q=${message.replace("synthia", "")}`,
      "_blank"
    );
  }
}
