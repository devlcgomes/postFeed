import { format, formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { useState } from "react";

// O post precisa de algumas informações
// author : {avatar_url:"" , name:"", role:""}
// publishedAt: Date
// content: String

export function Post({ author, publishedAt, content }) {
  // States for comments
  const [comments, setComments] = useState(["Post muito bacana, hein:?!"]);

  const [newCommentText, setNewCommentText] = useState("");

  // Preparando a data e formatando a data que vem da props para o formato
  // desejado.
  const publishedDateFormated = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBr,
    }
  );

  // Preparando a hora de publicação do post relativa a data atual
  // Hora atual - hora do post. Irá comparar a data com o Agora.
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  });

  // Function add new comment
  function handleCreateNewComment(event) {
    event.preventDefault();
    const newCommentText = event.target.comment.value;
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  // Function for monitoring textarea
  function handleNewCommentChange() {
    setNewCommentText(event.target.value);
  }

  // Function delete comment receiving pros of your child component
  function deleteComment(commentToDelete) {
    // This function receive a comment and do it
    // Para isso vou precisar criar uma lista nova de comentários, porém
    // Eliminando o comentário a qual eu quero deletar,dessa lista.

    const commentsWithoutDeletedOne = comments.filter((comment) => {
      // quero filtrar pra manter na lista apenas os comentários que forem diferentes
      return comment !== commentToDelete;
    });
    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder={true} src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormated}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((item) => {
          if (item.type === "paragraph") {
            return <p key={item.content}>{item.content}</p>;
          } else if (item.type === "link") {
            return (
              <p key={item.content}>
                <a href="">{item.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((item) => {
          return (
            <Comment
              key={item}
              content={item}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
