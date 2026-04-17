import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Лента постов: получение постов, создание поста, добавление комментария."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")
    params = event.get("queryStringParameters") or {}

    # POST /posts — создать пост
    if method == "POST" and path.endswith("/posts"):
        body = json.loads(event.get("body") or "{}")
        author = (body.get("author_name") or "").strip()
        content = (body.get("content") or "").strip()
        if not author or not content:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "author_name и content обязательны"})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO posts (author_name, content) VALUES (%s, %s) RETURNING id, author_name, content, created_at",
            (author[:100], content),
        )
        row = cur.fetchone()
        conn.commit()
        conn.close()
        return {
            "statusCode": 201,
            "headers": cors,
            "body": json.dumps({"id": row[0], "author_name": row[1], "content": row[2], "created_at": str(row[3]), "comments": []}),
        }

    # POST /comments — добавить комментарий
    if method == "POST" and path.endswith("/comments"):
        body = json.loads(event.get("body") or "{}")
        post_id = body.get("post_id")
        author = (body.get("author_name") or "").strip()
        content = (body.get("content") or "").strip()
        if not post_id or not author or not content:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "post_id, author_name и content обязательны"})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO comments (post_id, author_name, content) VALUES (%s, %s, %s) RETURNING id, post_id, author_name, content, created_at",
            (post_id, author[:100], content),
        )
        row = cur.fetchone()
        conn.commit()
        conn.close()
        return {
            "statusCode": 201,
            "headers": cors,
            "body": json.dumps({"id": row[0], "post_id": row[1], "author_name": row[2], "content": row[3], "created_at": str(row[4])}),
        }

    # GET /posts — получить все посты с комментариями
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, author_name, content, created_at FROM posts ORDER BY created_at DESC LIMIT 50")
    posts_rows = cur.fetchall()
    post_ids = [r[0] for r in posts_rows]
    comments_map: dict = {pid: [] for pid in post_ids}
    if post_ids:
        cur.execute(
            "SELECT id, post_id, author_name, content, created_at FROM comments WHERE post_id = ANY(%s) ORDER BY created_at ASC",
            (post_ids,),
        )
        for c in cur.fetchall():
            comments_map[c[1]].append({"id": c[0], "post_id": c[1], "author_name": c[2], "content": c[3], "created_at": str(c[4])})
    conn.close()
    posts = [
        {"id": r[0], "author_name": r[1], "content": r[2], "created_at": str(r[3]), "comments": comments_map[r[0]]}
        for r in posts_rows
    ]
    return {"statusCode": 200, "headers": cors, "body": json.dumps({"posts": posts})}
