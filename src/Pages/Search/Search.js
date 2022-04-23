import styles from "./Search.module.css";

//hooks
import { useFetchDocuments } from "../../Hooks/useFetchDocuments";
import { useQuery } from "../../Hooks/useQuery";
import { Link } from "react-router-dom";

//Components
import PostDetail from "../../Components/PostDetail";

function Search() {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
       <h1>Resultados encontrados para: {search}</h1>
      <div className="post-list">
        {posts &&
          posts.length === 0 &&
          (
              <>
                <p>Não encontramos posts com esses dados...</p>
                <Link to="/" className="btn btn-dark">
                  voltar
                </Link>
              </>
            )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default Search;
