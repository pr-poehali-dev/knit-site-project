import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const API = "https://functions.poehali.dev/0ac36139-ae7b-45f0-b83a-b925995c24d3";

interface Comment {
  id: number;
  post_id: number;
  author_name: string;
  content: string;
  created_at: string;
}

interface Post {
  id: number;
  author_name: string;
  content: string;
  created_at: string;
  comments: Comment[];
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "только что";
  if (m < 60) return `${m} мин. назад`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} ч. назад`;
  return `${Math.floor(h / 24)} дн. назад`;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [newAuthor, setNewAuthor] = useState("");
  const [newContent, setNewContent] = useState("");
  const [posting, setPosting] = useState(false);

  const [openComments, setOpenComments] = useState<Set<number>>(new Set());
  const [commentAuthors, setCommentAuthors] = useState<Record<number, string>>({});
  const [commentTexts, setCommentTexts] = useState<Record<number, string>>({});
  const [commentingId, setCommentingId] = useState<number | null>(null);

  const loadPosts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setPosts(data.posts ?? []);
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, []);

  const handlePost = async () => {
    if (!newAuthor.trim() || !newContent.trim()) return;
    setPosting(true);
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author_name: newAuthor.trim(), content: newContent.trim() }),
    });
    if (res.ok) {
      const post: Post = await res.json();
      setPosts((prev) => [post, ...prev]);
      setNewContent("");
    }
    setPosting(false);
  };

  const handleComment = async (postId: number) => {
    const author = (commentAuthors[postId] || "").trim();
    const content = (commentTexts[postId] || "").trim();
    if (!author || !content) return;
    setCommentingId(postId);
    const res = await fetch(`${API}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: postId, author_name: author, content }),
    });
    if (res.ok) {
      const comment: Comment = await res.json();
      setPosts((prev) =>
        prev.map((p) => p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)
      );
      setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
    }
    setCommentingId(null);
  };

  const toggleComments = (id: number) => {
    setOpenComments((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen texture-bg max-w-2xl">
      <div className="text-center mb-10">
        <p className="text-sm uppercase tracking-widest text-[var(--warm-brown)] font-golos mb-2">Сообщество</p>
        <h1 className="font-cormorant text-4xl md:text-5xl text-[var(--deep-brown)] font-semibold mb-4">Лента</h1>
        <div className="divider-gold w-32 mx-auto" />
      </div>

      {/* Форма нового поста */}
      <div className="bg-white rounded-2xl border border-[var(--beige)] p-5 mb-8 shadow-sm">
        <h2 className="font-cormorant text-xl text-[var(--deep-brown)] font-semibold mb-4">Поделиться с сообществом</h2>
        <input
          type="text"
          placeholder="Ваше имя"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          className="w-full border border-[var(--beige)] rounded-xl px-4 py-2 mb-3 text-sm font-golos text-[var(--text-main)] bg-[var(--cream)] focus:outline-none focus:border-[var(--warm-brown)]"
        />
        <textarea
          placeholder="Напишите пост — поделитесь работой, идеей или вопросом..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={3}
          className="w-full border border-[var(--beige)] rounded-xl px-4 py-2 mb-3 text-sm font-golos text-[var(--text-main)] bg-[var(--cream)] focus:outline-none focus:border-[var(--warm-brown)] resize-none"
        />
        <button
          onClick={handlePost}
          disabled={posting || !newAuthor.trim() || !newContent.trim()}
          className="px-6 py-2 bg-[var(--deep-brown)] text-[var(--cream)] rounded-full text-sm font-golos hover:bg-[var(--warm-brown)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {posting ? "Публикую..." : "Опубликовать"}
        </button>
      </div>

      {/* Посты */}
      {loading ? (
        <div className="text-center text-[var(--text-muted)] font-golos py-16">Загружаю ленту...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-[var(--text-muted)] font-golos py-16">
          <p className="text-4xl mb-4">🧶</p>
          <p>Пока нет постов. Будьте первым!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl border border-[var(--beige)] overflow-hidden shadow-sm animate-fade-in">
              {/* Шапка поста */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--beige)] flex items-center justify-center font-cormorant text-[var(--warm-brown)] font-semibold text-lg">
                    {post.author_name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-golos font-semibold text-sm text-[var(--deep-brown)]">{post.author_name}</p>
                    <p className="text-xs text-[var(--text-muted)] font-golos">{timeAgo(post.created_at)}</p>
                  </div>
                </div>
                <p className="font-golos text-[var(--text-main)] leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Кнопка комментариев */}
              <div className="px-5 pb-4 border-t border-[var(--beige)] pt-3">
                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] font-golos hover:text-[var(--warm-brown)] transition-colors"
                >
                  <Icon name="MessageCircle" size={15} />
                  {post.comments.length > 0
                    ? `${post.comments.length} ${post.comments.length === 1 ? "комментарий" : post.comments.length < 5 ? "комментария" : "комментариев"}`
                    : "Комментировать"}
                </button>
              </div>

              {/* Блок комментариев */}
              {openComments.has(post.id) && (
                <div className="bg-[var(--cream)] border-t border-[var(--beige)] px-5 py-4">
                  {post.comments.map((c) => (
                    <div key={c.id} className="flex gap-3 mb-3">
                      <div className="w-7 h-7 rounded-full bg-[var(--beige)] flex items-center justify-center font-cormorant text-[var(--warm-brown)] text-sm shrink-0">
                        {c.author_name[0]?.toUpperCase()}
                      </div>
                      <div className="bg-white rounded-xl px-3 py-2 border border-[var(--beige)] flex-1">
                        <p className="text-xs font-semibold text-[var(--deep-brown)] font-golos mb-0.5">{c.author_name}</p>
                        <p className="text-sm text-[var(--text-main)] font-golos">{c.content}</p>
                      </div>
                    </div>
                  ))}

                  {/* Форма комментария */}
                  <div className="flex flex-col gap-2 mt-3">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={commentAuthors[post.id] ?? ""}
                      onChange={(e) => setCommentAuthors((prev) => ({ ...prev, [post.id]: e.target.value }))}
                      className="border border-[var(--beige)] rounded-xl px-3 py-2 text-sm font-golos text-[var(--text-main)] bg-white focus:outline-none focus:border-[var(--warm-brown)]"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Написать комментарий..."
                        value={commentTexts[post.id] ?? ""}
                        onChange={(e) => setCommentTexts((prev) => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && handleComment(post.id)}
                        className="flex-1 border border-[var(--beige)] rounded-xl px-3 py-2 text-sm font-golos text-[var(--text-main)] bg-white focus:outline-none focus:border-[var(--warm-brown)]"
                      />
                      <button
                        onClick={() => handleComment(post.id)}
                        disabled={commentingId === post.id}
                        className="px-4 py-2 bg-[var(--deep-brown)] text-[var(--cream)] rounded-xl text-sm font-golos hover:bg-[var(--warm-brown)] transition-colors disabled:opacity-40"
                      >
                        <Icon name="Send" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}