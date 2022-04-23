import styles from "./Home.module.css";

//Hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "./../../Hooks/useFetchDocuments";
import PostDetail from "../../Components/PostDetail";

//Compponents

function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`)
    }
  };

  return (
    <div className={styles.home}>
      <h1>Veja nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail post={post} key={post.id} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados Posts</p>
            <Link to="/posts/create" className="btn">
              Criar Primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
