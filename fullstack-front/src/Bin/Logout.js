// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// export default function UserLogin() {
//   const [show, setShow] = useState(false);
//   const [authMode, setAuthMode] = useState("signin");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const navigate = useNavigate();

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const changeAuthMode = () => {
//     setAuthMode(authMode === "signin" ? "signup" : "signin");
//   };

//   const handleSignIn = async (event) => {
//     event.preventDefault(); // Prevent form from submitting and reloading the page
//     try {
//       // Your authentication logic here
//       // Assuming authentication is successful and user is logged in
//       // Set user role and navigate to appropriate page
//     } catch (error) {
//       console.error("Error during authentication:", error);
//       alert("Authentication failed");
//     }
//   };

//   const handleSignUp = async (event) => {
//     // Sign up logic
//   };

//   const handleLogout = () => {
//     // Clear user authentication state
//     setUsername("");
//     setPassword("");
//     setName("");
//     setSurname("");
//     setEmail("");
//     setRole("");
    
//     // Redirect to login page
//     navigate("/userlogin");
//   };

//   return (
//     <>
//       <button className="btn btn-dark" onClick={handleShow}>
//         Sign In/Up
//       </button>
//       <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
//         <Modal.Header closeButton>
//           <Modal.Title>{authMode === "signin" ? "Sign In" : "Sign Up"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {authMode === "signin" ? (
//             <form className="Auth-form-content" onSubmit={handleSignIn}>
//               {/* Sign in form */}
//             </form>
//           ) : (
//             <form className="Auth-form-content" onSubmit={handleSignUp}>
//               {/* Sign up form */}
//             </form>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           {username && ( // If user is logged in, show logout button
//             <Button variant="secondary" onClick={handleLogout}>
//               Logout
//             </Button>
//           )}
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
