const express = require('express');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Mock data (replace with database later)
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first blog post about web development.' },
    { id: 2, title: 'Second Post', content: 'Learn Express.js and build amazing applications.' }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    res.render('post', { post: post });
});

app.get('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    res.render('edit', { post: post });
});

app.post('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/posts/' + post.id);
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});