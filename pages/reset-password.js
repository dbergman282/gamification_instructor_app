import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email for a reset link.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Reset Password</h1>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button style={{ marginTop: 20 }} type="submit">
          Send Reset Link
        </button>
        <div style={{ marginTop: 10 }}>
          <a href="/">Back to login</a>
        </div>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}
