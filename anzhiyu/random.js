var posts=["posts/e59e.html","posts/5f67.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};