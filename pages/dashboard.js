import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [classCodes, setClassCodes] = useState([]);
  const [newCode, setNewCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setUser(u);
        fetchClassCodes(u.email);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchClassCodes = async (email) => {
    const q = query(
      collection(db, "class_codes"),
      where("created_by", "==", email),
      orderBy("created_at", "desc")
    );
    const snapshot = await getDocs(q);
    setClassCodes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleAddCode = async () => {
    if (!newCode) return;
    try {
      await addDoc(collection(db, "class_codes"), {
        code: newCode,
        created_by: user.email,
        created_at: serverTimestamp(),
      });
      setNewCode("");
      fetchClassCodes(user.email);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2 style={{ marginTop: 40 }}>Create New Class Code</h2>
      <input
        placeholder="e.g., BIO123"
        value={newCode}
        onChange={(e) => setNewCode(e.target.value)}
      />
      <button style={{ marginLeft: 10 }} onClick={handleAddCode}>
        Add Code
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2 style={{ marginTop: 40 }}>Your Class Codes</h2>
      <ul>
        {classCodes.map((c) => (
          <li key={c.id}>
            <strong>{c.code}</strong> — {new Date(c.created_at?.seconds * 1000 || 0).toLocaleString()}
          </li>
        ))}
      </ul>
    </main>
  );
}
