import styles from "./About.module.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Este Projeto consiste em um pequeno blog feito com React no front-end e
        FireBase no Back-end
      </p>
      <Link to="/posts/create" className="btn">
        Criar Post
      </Link>
    </div>
  );
}

export default About;
