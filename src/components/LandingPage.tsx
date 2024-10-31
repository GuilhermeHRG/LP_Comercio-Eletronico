import React, { useState } from 'react';
import './Style.css';
import perfilJpg from '../assets/perfil.jpeg';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
// @ts-ignore
import { db } from '../config/firebaseConfig.js';
import { collection, addDoc, onSnapshot } from "firebase/firestore"; 



const LandingPage = () => {
  // Estado para armazenar os dados do formulário

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  // Dados dos serviços e tecnologias
  const servicesData = [
    {
      title: 'Criação de Landing Pages',
      description: 'Uso a tecnologia para promover sua empresa...',
      imgSrc: 'https://img.freepik.com/psd-gratuitas/pagina-inicial-em-estilo-minimalista-para-galeria-de-arte-com-homem_23-2148821375.jpg',
    },
    {
      title: 'Seu E-commerce de uma maneira simples',
      description: 'Com as tecnologias web, é possível ter seu e-commerce...',
      imgSrc: 'https://img.freepik.com/fotos-gratis/pessoa-adicionando-roupas-ao-carrinho-para-campanha-de-compras-online_53876-98449.jpg',
    },
    {
      title: 'Seu site em diversos dispositivos',
      description: 'No aconchego da sua casa ou na palma da sua mão...',
      imgSrc: 'https://img.freepik.com/vetores-gratis/design-de-site-responsivo-de-design-plano_23-2149489189.jpg',
    },
    {
      title: 'Convites Digitais',
      description: 'Use a tecnologia a seu favor! Convide aquele parente ou amigo...',
      imgSrc: 'https://img.freepik.com/vetores-gratis/modelo-de-postagens-do-instagram-de-celebracao-de-casamento-floral_23-2150089412.jpg',
    },
    {
      title: 'Sites Institucionais',
      description: 'Torne sua instituição mais visível no mercado por meio da internet!',
      imgSrc: 'https://img.freepik.com/psd-gratuitas/computador-imac-com-exibicao-de-mockup-de-design-de-pagina-inicial_53876-97902.jpg',
    },
  ];

  const languages = [
    { name: 'JS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'WordPress', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg' },
    { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  ];

  const skills = [
    'UX Design', 'UI Design', 'Product Design', 'Front-End Development', 'Interaction Design', 'No Code',
  ];
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

; // ajuste o caminho conforme necessário

// Função para escutar alterações na coleção "contacts"
const listenToContacts = () => {
  const contactsRef = collection(db, "contacts");

  // Adicionando um listener
  const unsubscribe = onSnapshot(contactsRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("Novo contato: ", change.doc.data());
      }
      if (change.type === "modified") {
        console.log("Contato atualizado: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Contato removido: ", change.doc.data());
      }
    });
  });

  // Retornar a função de desinscrição para remover o listener quando não for mais necessário
  return unsubscribe;
};

// Chame esta função em algum lugar do seu código para começar a ouvir
listenToContacts();


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      // Enviar dados para o Firestore
      await addDoc(collection(db, "contacts"), formData);
  
      // Preparar a mensagem a ser enviada via WhatsApp
      const messageBody = `Nome: ${formData.name}%0AContato: ${formData.contact}%0AMensagem: ${formData.message}`;
      
      // Criar o link para enviar a mensagem via WhatsApp
      const whatsappURL = `https://wa.me/5543996138645?text=${messageBody}`;
  
      // Redirecionar para o WhatsApp
      window.open(whatsappURL, '_blank');
  
      alert("Dados enviados com sucesso! Em breve entraremos em contato.");
  
      // Limpar os campos do formulário
      setFormData({ name: '', contact: '', message: '' });
    } catch (error) {
      console.error("Erro ao enviar dados: ", error);
      alert("Erro ao enviar dados. Tente novamente.");
    }
  };
  
  
  
  
  

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <img className='headerPerfilImg' src={perfilJpg} alt="Perfil" />
        <div className="language-icons">
          <div className="scrolling-icons">
            {languages.map((lang, index) => (
              <img key={index} src={lang.logo} alt={lang.name} title={lang.name} />
            ))}
          </div>
        </div>
      </header>

      {/* Services */}
      <section className="services">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.imgSrc} alt={service.title} />
            <div className="service-info">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <button>Tenho Interesse</button>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="skills">
        <h2>Habilidades e Competências</h2>
        <div className="skill-container">
          {skills.map((skill, index) => (
            <button key={index} className="skill-button">
              {skill}
            </button>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact">
      <h2>Entre em contato comigo</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Seu Nome:
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Seu WhatsApp:
          <input 
            type="text" 
            name="contact" 
            value={formData.contact} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Descreva melhor sua ideia:
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
          ></textarea>
        </label>
        <button type="submit">Enviar</button>
      </form>
    </section>

      {/* Footer */}
      <footer className="footer">
        <div className="social-links">
          <a href="https://www.linkedin.com/in/guilhermehrg/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
            <br />
            <p>Guilherme Guelere</p>
          </a>
          <a href="https://www.instagram.com/guilherme.guelere/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
            <br />
            <p>@guilherme.guelere</p>
          </a>
        </div>
        <p>Copyright © 2024 Guilherme Guelere</p>
      </footer>
    </div>
  );
};

export default LandingPage;
