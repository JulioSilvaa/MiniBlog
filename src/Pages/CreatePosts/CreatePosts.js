import styles from "./styles.module.css";

//Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";
import { useInsertDocument } from "./../../Hooks/useInsertDocument";

function CreatePosts() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { insertDocument, response } = useInsertDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validate Image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
    }

    //criar array de tags
    navigate("/")

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor preencha todos os campos");
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    //redirect para Home Page

  };

  return (
    <div className={styles.createPost}>
      <h2>Criar Post</h2>
      <p>escreva sobre o que algum assunto, compartilhe conhecimento</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            nome="title"
            required
            placeholder="Título do post"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL:</span>
          <input
            type="text"
            nome="image"
            required
            placeholder="Adicione a URL da imagem"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            type="text"
            nome="body"
            required
            placeholder="Descrição/ Conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>TAGS:</span>
          <input
            type="text"
            nome="tags"
            required
            placeholder="insira as tags separadas por virgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguard...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}

export default CreatePosts;
