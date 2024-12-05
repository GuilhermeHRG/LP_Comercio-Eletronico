import React, { useState } from "react";
// @ts-ignore
import { auth } from "../../config/firebaseConfig"; // Ajuste o caminho conforme necessário
import { signInWithEmailAndPassword } from "firebase/auth"; // Importando a função de login
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importe o arquivo CSS para estilização

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Usa a função signInWithEmailAndPassword diretamente
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin"); // Redireciona para o painel após login
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Email ou senha incorretos.");
    }
  };

  return (
    <div className="main">
      <div className="login-container">
        <h1>Faça login para acessar o painel administrativo</h1>
        <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
