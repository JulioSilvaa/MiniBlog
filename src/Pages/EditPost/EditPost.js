import styles from "./EditPosts.module.css";

//Hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";
import { useUpdateDocument } from "../../Hooks/useUpdateDocument";
import { useFetchDocument } from "./../../Hooks/useFetchDocument";

function EditPost() {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { updateDocument, response } = useUpdateDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(",");
      setTags(textTags);
    }
  }, [post]);

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
    navigate("/dashboard");

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor preencha todos os campos");
    }

    if (formError) return;

    const data=
      {
        title,
        image,
        body,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
      }
    

    updateDocument(id,data);
  

   
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando Post: {post.title}</h2>
          <p>Altere os dados do post</p>
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
              <p className={styles.preview_title}>Prevview da imagem atual: </p>
              <img className={styles.image_preview} src={post.image} alt={post.title} />
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
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguard...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
}

export default EditPost;
