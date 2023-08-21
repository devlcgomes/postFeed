import { Header } from "./Components/Header";
import { Post } from "./Components/Post";
import { Sidebar } from "./Components/Sidebar";

import "./global.css";
import styles from "./App.module.css";

// Criando o array de posts
const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https:github.com/devlcgomes.png",
      name: "Luciano Gomes",
      role: "Developer",
    },
    content: [
      { type: "paragraph", content: "Fala galera!" },
      {
        type: "paragraph",
        content:
          "Acabei de subir um projeto novo no portifólio. Confira la porque está muito bonito!",
      },
      { type: "link", content: "gomes.design/devlcgomes" },
    ],
    publishedAt: new Date("2023-08-18 10:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl:
        "https://media.licdn.com/dms/image/D4D03AQH09VaSVpiAlw/profile-displayphoto-shrink_200_200/0/1667497346792?e=1697673600&v=beta&t=mSftRGAWHyLiiwZBAki22lXgMxi4dQCPK4L12DOpgYI",
      name: "Kellen de Paula",
      role: "Analista da Qualidade",
    },
    content: [
      { type: "paragraph", content: "Fala galera!" },
      {
        type: "paragraph",
        content:
          "Acabei de Participar da 2134 reunião do tasy para a implementação aqui na unimed!",
      },
      { type: "link", content: "kellen/doctorcare" },
    ],
    publishedAt: new Date("2023-08-18 18:00:00"),
  },
];

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}
