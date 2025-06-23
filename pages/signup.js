import { useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      // Optionally create an instructor profile or metadata here
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Create Instructor Account</h1>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button style={{ marginTop: 20 }} type="submit">
          Sign Up
        </button>
        <div style={{ marginTop: 10 }}>
          <a href="/">Back to login</a>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}
