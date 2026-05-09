<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// DATABASE CONNECTION
$conn = new mysqli("localhost", "root", "", "university_chatbot");

// CONNECTION CHECK
if ($conn->connect_error) {
    die("DB Connection Error: " . $conn->connect_error);
}

// GET JSON DATA
$data = json_decode(file_get_contents("php://input"), true);

// CHECK ACTION
if (isset($data['action'])) {

    // ================= SIGNUP =================
    if ($data['action'] === "signup") {

        // GET DATA
        $username = trim($data['username']);
        $email = trim($data['email']);
        $password = trim($data['password']);

        // VALIDATION
        if ($username == "" || $email == "" || $password == "") {
            echo "All fields are required ❌";
            exit;
        }

        // EMAIL VALIDATION
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Invalid Email ❌";
            exit;
        }

        // PASSWORD LENGTH
        if (strlen($password) < 4) {
            echo "Password must be at least 4 characters ❌";
            exit;
        }

        // ESCAPE STRINGS
        $username = $conn->real_escape_string($username);
        $email = $conn->real_escape_string($email);
        $password = $conn->real_escape_string($password);

        // CHECK EMAIL EXISTS
        $check = $conn->query(
            "SELECT * FROM users WHERE email='$email'"
        );

        if ($check->num_rows > 0) {

            echo "Email already exists ❌";

        } else {

            $insert = $conn->query(
                "INSERT INTO users(username,email,password)
                 VALUES('$username','$email','$password')"
            );

            if ($insert) {
                echo "Signup Successful ✅";
            } else {
                echo "Database Insert Error ❌";
            }
        }

        exit;
    }

    // ================= LOGIN =================
    if ($data['action'] === "login") {

        // GET DATA
        $email = trim($data['email']);
        $password = trim($data['password']);

        // VALIDATION
        if ($email == "" || $password == "") {

            echo json_encode([
                "status" => "All fields required"
            ]);

            exit;
        }

        // ESCAPE
        $email = $conn->real_escape_string($email);
        $password = $conn->real_escape_string($password);

        // CHECK USER
        $result = $conn->query(
            "SELECT * FROM users
             WHERE email='$email'
             AND password='$password'"
        );

        if ($result->num_rows > 0) {

            echo json_encode([
                "status" => "success"
            ]);

        } else {

            echo json_encode([
                "status" => "Invalid email or password ❌"
            ]);
        }

        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>United University Chatbot</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

<!-- Navbar -->
<header class="navbar">
  <div class="logo">
    <img src="logo1.png" alt="Logo">
  </div>

  <nav class="nav-items">
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About Us</a></li>
      <li><a href="#courses">Courses</a></li>
      <li><a href="#contact-form">Contact</a></li>
      <li><a href="#" onclick="openLogin()">Login</a></li>
    </ul>
  </nav>
</header>
<!-- Campus Updates -->
<section class="updates-section">
  <div class="updates-title">📢 Campus Updates</div>

  <div class="updates-container">
    <div class="updates-track">
      <span>🎓 Admissions Open for 2026 Batch</span>
      <span>📅 Semester Exams start from April 14</span>
      <span>💼 Placement Drive by TCS on April 20</span>
      <span>🏆 Annual Fest "Udaan" Coming Soon</span>
      <span>📢 Last Date for Fee Submission: April 30</span>
    </div>
  </div>
</section>

<!-- Home -->
<section id="home" class="section">

  <video autoplay muted loop class="bg-video">
    <source src="campus2.mp4" type="video/mp4">
  </video>

  <div class="home-content">
    <img src="logo2.png" class="home-logo">
    <h1>Welcome to United University</h1>
  </div>

</section>

<!-- About -->
<section id="about" class="section about-section">
  
  <!-- Background Video -->
  <video autoplay muted loop playsinline class="bg-video">
    <source src="campus.mp4" type="video/mp4">
  </video>

  <!-- Content -->
  <div class="about-content">
    <h1>About Us</h1>
    <div class="about-box">
     <p>
  United University is a leading institution providing quality education 
  in engineering, management, and computer applications. 

  We are committed to fostering innovation, creativity, and excellence 
  among our students through modern teaching methods and industry-oriented programs. 

  Our campus offers state-of-the-art infrastructure, experienced faculty, 
  and a vibrant learning environment that encourages both academic and personal growth. 

  At United University, we aim to prepare students for successful careers 
  and empower them to become future leaders in their respective fields.
</p>
    </div>
  </div>

</section>

<!-- Courses -->
<section id="courses" class="section">
  <h1>Our Courses</h1>
  <div class="course-container">

    <div class="course-card"><h2>BCA</h2><p>Bachelor of Computer Applications</p></div>
    <div class="course-card"><h2>MCA</h2><p>Master of Computer Applications</p></div>
    <div class="course-card"><h2>B.Tech</h2><p>Bachelor of Technology</p></div>
    <div class="course-card"><h2>BBA</h2><p>Bachelor of Business Administration</p></div>
    <div class="course-card"><h2>MBA</h2><p>Master of Business Administration</p></div>
    <div class="course-card"><h2>B.Com</h2><p>Bachelor of Commerce</p></div>
    <div class="course-card"><h2>M.Com</h2><p>Master of Commerce</p></div>
    <div class="course-card"><h2>B.Sc</h2><p>Bachelor of Science</p></div>

  </div>
</section>
<!-- LOGIN -->
<div id="loginModal" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeLogin()">&times;</span>

    <h2>Login</h2>

    <input type="email" id="loginEmail" placeholder="Email"><br><br>
    <input type="password" id="loginPassword" placeholder="Password"><br><br>

    <button onclick="login()">Login</button>

    <p>Don't have account? <a href="#" onclick="openSignup()">Signup</a></p>
  </div>
</div>
<!-- SIGNUP -->
<div id="signupModal" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeSignup()">&times;</span>

    <h2>Signup</h2>

    <input type="text" id="signupUsername" placeholder="Username"><br><br>
    <input type="email" id="signupEmail" placeholder="Email"><br><br>
    <input type="password" id="signupPassword" placeholder="Password"><br><br>

    <button onclick="signup()">Signup</button>
  </div>
</div>

<!-- CONTACT FORM SECTION -->
<section id="contact-form" class="contact-section">
  <h1>Contact Us</h1>

  <form id="contact-form-data" class="contact-form">
    
    <input type="text" name="name" placeholder="Your Name" required>
    
    <input type="email" name="email" placeholder="Your Email" required>
    
    <textarea name="message" placeholder="Your Message" required></textarea>

    <button type="submit" class="contact-btn">Send Message</button>

  </form>
</section>

<!-- EmailJS CDN -->
<script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

<!-- FOOTER -->
<section id="contact" class="footer">

  <div class="footer-content">

    <div class="footer-about">
      <h3>United University</h3>
      <p>Empowering students with knowledge and skills.</p>
    </div>

    <div class="footer-links">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#courses">Courses</a></li>
      </ul>
    </div>

    <div class="footer-contact">
      <h3>Contact Info</h3>
      <ul>
        <li><i class="fas fa-envelope"></i> contact@uniteduniversity.edu.in</li>
        <li><i class="fas fa-phone"></i> 18001218797</li>
        <li><i class="fas fa-location-dot"></i> Prayagraj, UP</li>
      </ul>

      <div class="social-icons">
        <a href="https://www.instagram.com/united_university/" target="_blank" rel="noopener noreferrer">
  <i class="fab fa-instagram"></i>
</a>

<a href="https://www.facebook.com/UnitedUniversity.edu/" target="_blank" rel="noopener noreferrer">
  <i class="fab fa-facebook"></i>
</a>

<a href="https://x.com/UnitedUnivers" target="_blank" rel="noopener noreferrer">
  <i class="fab fa-x-twitter"></i>
</a>

<a href="https://www.youtube.com/@uniteduniversityprayagraj4325" target="_blank" rel="noopener noreferrer">
  <i class="fab fa-youtube"></i>
</a>
      </div>
    </div>

  </div>

  <div class="footer-bottom">
    <p> &copy;<span id="year"></span> United University. All rights reserved.</p>
  </div>

</section>

<!-- Chatbot -->
<div id="chat-icon">💬</div>

<div id="chat-container" class="hidden">
  <div id="chat-header">
    <span>Chatbot</span>
    <span id="close-btn">✖</span>
  </div>

  <div id="chatbox"></div>

  <div class="input-area">
    <input type="text" id="input" placeholder="Ask something...">
    <button id="micBtn">🎤</button> <!-- NEW -->
    <button id="sendBtn">Send</button>
  </div>
</div>

<script src="script.js"></script>
</body>
</html>