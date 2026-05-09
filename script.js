// ================= CHAT ELEMENTS =================
const chatIcon = document.getElementById("chat-icon");
const chatContainer = document.getElementById("chat-container");
const closeBtn = document.getElementById("close-btn");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("input");
const chatbox = document.getElementById("chatbox");
const micBtn = document.getElementById("micBtn");

// ================= CHAT TOGGLE =================
chatIcon.onclick = () => {
  chatContainer.classList.toggle("hidden");
};

closeBtn.onclick = () => {
  chatContainer.classList.add("hidden");
};

// ================= SEND MESSAGE =================
sendBtn.onclick = sendMessage;

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// ================= VOICE RECOGNITION =================
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";

  micBtn.onclick = () => {
    recognition.start();
    micBtn.classList.add("listening");
  };

  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    input.value = voiceText;
    sendMessage();
  };

  recognition.onend = () => {
    micBtn.classList.remove("listening");
  };

  recognition.onerror = () => {
    micBtn.classList.remove("listening");
    alert("Mic error ❌");
  };

} else {
  micBtn.disabled = true;
  micBtn.innerText = "❌";
}

// ================= OFFLINE BOT =================
function getOfflineResponse(message) {
  message = message.toLowerCase();

  // ===== GREETING =====
  if (message.includes("hello") || message.includes("hi")) {
    return "Hello! Welcome to United University 😊";
  }

  // ===== COURSES =====
  else if (message.includes("course")) {
    return "We offer BCA, MCA, B.Tech, BBA, MBA, B.Com, M.Com and B.Sc.";
  }

  // ===== FEES =====
  else if (message.includes("fee") || message.includes("fees")) {
    return `💰 Fee Structure:
BCA - ₹75,000/year
MCA - ₹1,00,000/year
B.Tech - ₹1,50,000/year
BBA - ₹90,000/year
MBA - ₹1,80,000/year
B.Com - ₹60,000/year
M.Com - ₹70,000/year
B.Sc - ₹65,000/year`;
  }

  // ===== INDIVIDUAL COURSES =====
  else if (message.includes("bca")) {
    return "BCA Fee: ₹75,000 per year. Duration: 3 years.";
  }

  else if (message.includes("mca")) {
    return "MCA Fee: ₹1,00,000 per year. Duration: 2 years.";
  }

  else if (
    message.includes("btech") ||
    message.includes("b.tech")
  ) {
    return "B.Tech Fee: ₹1,50,000 per year. Duration: 4 years.";
  }

  else if (message.includes("bba")) {
    return "BBA Fee: ₹90,000 per year. Duration: 3 years.";
  }

  else if (message.includes("mba")) {
    return "MBA Fee: ₹1,80,000 per year. Duration: 2 years.";
  }

  else if (message.includes("bcom")) {
    return "B.Com Fee: ₹60,000 per year.";
  }

  else if (message.includes("mcom")) {
    return "M.Com Fee: ₹70,000 per year.";
  }

  else if (message.includes("bsc")) {
    return "B.Sc Fee: ₹65,000 per year.";
  }

  // ===== HOSTEL =====
  else if (message.includes("hostel")) {
    return `🏠 Hostel Fees:
👦 Boys: ₹50,000 - ₹75,000/year
👧 Girls: ₹45,000 - ₹70,000/year

Facilities:
✔ Wi-Fi
✔ Mess Food
✔ 24x7 Security
✔ Laundry`;
  }

  else if (message.includes("boys hostel")) {
    return "👦 Boys Hostel Fee: ₹50,000 - ₹75,000/year.";
  }

  else if (message.includes("girls hostel")) {
    return "👧 Girls Hostel Fee: ₹45,000 - ₹70,000/year.";
  }

  // ===== PLACEMENT =====
  else if (message.includes("placement")) {
    return `🎯 Placement Details:
✔ Average Package: ₹4 - ₹6 LPA
✔ Highest Package: ₹12+ LPA
✔ Companies: TCS, Infosys, Wipro, HCL`;
  }

  else if (message.includes("package")) {
    return "💼 Average package is ₹4-6 LPA and highest goes above ₹12 LPA.";
  }

  // ===== ADMISSION =====
  else if (message.includes("admission")) {
    return `📢 Admissions Open!

Required Documents:
- 10th Marksheet
- 12th Marksheet
- Graduation (if required)
- Aadhar Card
- Passport Photos`;
  }

  // ===== DOCUMENTS =====
  else if (message.includes("document")) {
    return `📄 Required Documents:
- 10th Marksheet
- 12th Marksheet
- Aadhar Card
- Photos`;
  }

  // ===== LOCATION =====
  else if (
    message.includes("location") ||
    message.includes("address")
  ) {
    return "📍 Rawatpur, Jhalwa, Prayagraj, Uttar Pradesh - 211012";
  }

  // ===== CONTACT =====
  else if (
    message.includes("contact") ||
    message.includes("phone")
  ) {
    return "📞 18001218797\n📧 contact@uniteduniversity.edu.in";
  }

  else if (message.includes("email")) {
    return "📧 contact@uniteduniversity.edu.in";
  }

  // ===== FACILITIES =====
  else if (
    message.includes("facility") ||
    message.includes("facilities")
  ) {
    return `🏫 Facilities:
✔ Smart Classrooms
✔ Computer Labs
✔ Library
✔ Sports Complex
✔ Hostel
✔ Cafeteria`;
  }

  // ===== WIFI =====
  else if (message.includes("wifi")) {
    return "📶 Yes, free Wi-Fi is available on campus and in hostels.";
  }

  // ===== TRANSPORT =====
  else if (
    message.includes("bus") ||
    message.includes("transport")
  ) {
    return "🚌 Transport facility available across Prayagraj with additional charges.";
  }

  // ===== SCHOLARSHIP =====
  else if (message.includes("scholarship")) {
    return "🎓 Scholarships available based on merit and government schemes.";
  }

  // ===== TIMING =====
  else if (
    message.includes("timing") ||
    message.includes("time")
  ) {
    return "⏰ College Timing: 9:00 AM to 4:00 PM (Mon-Sat)";
  }

  // ===== DEFAULT =====
  return "🤖 Sorry, I didn't understand. Ask about courses, fees, hostel, placement, admission, or facilities.";
}

// ================= APPEND MESSAGE =================
function appendMessage(type, text, isHTML = false) {
  const div = document.createElement("div");

  div.classList.add("message", type);

  if (isHTML) {
    div.innerHTML = text;
  } else {
    div.innerText = text;
  }

  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// ================= SEND MESSAGE FUNCTION =================
function sendMessage() {
  let msg = input.value.trim();

  // Prevent blank messages
  if (msg === "") {
    alert("Please enter a message ❌");
    return;
  }

  appendMessage("user", msg);

  input.value = "";

  let reply = getOfflineResponse(msg);

  if (reply) {
    appendMessage("bot", reply + " (Offline)");
    return;
  }

  if (!navigator.onLine) {
    appendMessage("bot", "⚠ No internet & no offline answer.");
    return;
  }

  let link =
    "https://www.google.com/search?q=" +
    encodeURIComponent(msg);

  appendMessage(
    "bot",
    `🤖 I found results:<br>
     👉 <a href="${link}" target="_blank">Click here</a>`,
    true
  );
}

// ================= LOGIN / SIGNUP MODAL =================
function openLogin() {
  document.getElementById("loginModal").style.display =
    "block";
}

function closeLogin() {
  document.getElementById("loginModal").style.display =
    "none";
}

function openSignup() {
  closeLogin();

  document.getElementById("signupModal").style.display =
    "block";
}

function closeSignup() {
  document.getElementById("signupModal").style.display =
    "none";
}

// ================= LOGIN FUNCTION =================
async function login() {
  const email = document
    .getElementById("loginEmail")
    .value.trim();

  const password = document
    .getElementById("loginPassword")
    .value.trim();

  // Validation
  if (email === "" || password === "") {
    alert("Please fill all login fields ❌");
    return;
  }

  // Email Validation
  if (!email.includes("@")) {
    alert("Enter valid email ❌");
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:800/chatbot/index.php",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          action: "login",
          email: email,
          password: password
        })
      }
    );

    const data = await res.json();

    if (data.status === "success") {
      alert("Login successful ✅");
      closeLogin();
    } else {
      alert("Login failed ❌");
    }

  } catch (error) {
    alert("Server error ❌");
    console.log(error);
  }
}

// ================= SIGNUP FUNCTION =================
async function signup() {

  const username = document
    .getElementById("signupUsername")
    .value.trim();

  const email = document
    .getElementById("signupEmail")
    .value.trim();

  const password = document
    .getElementById("signupPassword")
    .value.trim();

  // Validation
  if (
    username === "" ||
    email === "" ||
    password === ""
  ) {
    alert("Please fill all signup fields ❌");
    return;
  }

  // Email Validation
  if (!email.includes("@")) {
    alert("Enter valid email ❌");
    return;
  }

  // Password Validation
  if (password.length < 4) {
    alert("Password must be at least 4 characters ❌");
    return;
  }

  try {

    const res = await fetch(
      "http://localhost:800/chatbot/index.php",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          action: "signup",
          username: username,
          email: email,
          password: password
        })
      }
    );

    const data = await res.text();

    alert(data);

    closeSignup();

  } catch (error) {
    alert("Server error ❌");
    console.log(error);
  }
}

// ================= EMAIL JS =================
(function () {
  emailjs.init("ozFAWxkFIOUUNG4TJ");
})();

// ================= CONTACT FORM =================
document
  .getElementById("contact-form-data")
  .addEventListener("submit", function (e) {

    e.preventDefault();

    // Form Validation
    const inputs = this.querySelectorAll("input, textarea");

    for (let field of inputs) {

      if (field.value.trim() === "") {
        alert("Please fill all contact form fields ❌");
        return;
      }
    }

    emailjs
      .sendForm(
        "service_0uvwml3",
        "template_kmwwdht",
        this
      )

      .then(() => {
        alert("Message sent successfully ✅");
        this.reset();
      })

      .catch(() => {
        alert("Failed to send ❌");
      });
});