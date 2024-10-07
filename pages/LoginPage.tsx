import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/loginPage.module.scss";

const LoginPage = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setError("");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.role === "admin") {
          router.push("/admin");
        } else {
          router.push(`/products?user=${data.userId}`);
        }
      } else {
        setError(data.message || "Nieprawidłowy kod!");
      }
    } catch (err) {
      setError("Wystąpił błąd podczas logowania. Spróbuj ponownie później.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__form}>
        <h1 className={styles.login__title}>WINETU Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Wpisz kod"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={styles.login__input}
            required
          />
          <button 
            type="submit" 
            className={styles.login__button}
            disabled={isLoading}
          >
            {isLoading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>
        {error && <p className={styles.login__error}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;