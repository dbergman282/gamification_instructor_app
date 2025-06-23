import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Instructor Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button style={{ marginTop: 20 }} type="submit">
          Login
        </button>
        <div style={{ marginTop: 10 }}>
          <a href="/signup">Create an account</a> | <a href="/reset-password">Reset password</a>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}
