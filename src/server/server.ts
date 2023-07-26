import express from "express";
import cors from 'cors'

const port = 3001

const app = express();
app.use(express.json());
app.use(cors())

type Post = {
    id: number,
    text: string
}

let posts = []

app.get('/api/posts', (req, res) => {
    res.status(200).json(posts)
})

let currentId = 0

app.post('/api/posts', (req, res) => {
    const {text} = req.body;
    const newPost: Post = {id: currentId, text: text};
    posts.push(newPost);
    currentId++;
    res.status(201).json({msg: 'Post added'});
})

app.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const {text} = req.body;
    const updatedPost: Post = {id: Number(id), text: text};
    posts = posts.map(post => post.id === updatedPost.id ? post = updatedPost : post);
    res.status(200).json({msg: 'Post updated'})
})

app.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    posts = posts.filter(post => post.id !== Number(id));
    res.status(200).json({msg: 'Post deleted'})
})

app.listen(port, () => {
  console.log("Server started on port", port);
});
