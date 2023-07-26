import React, {useState, useEffect, useRef} from "react";
import "./App.css";
import { API_BASE_URL } from "./constants";
import Post from "./Post";

type PostData = {
  id: number;
  text: string;
}

function App() {
  const inputRef = useRef();
  const [backendData, setBackendData] = useState<PostData[]>([])
  const fetchBackend = () => {
    fetch(API_BASE_URL)
    .then(res => res.json())
    .then(data => setBackendData(data))
    .catch(err => console.error(err))
  }

  useEffect(fetchBackend, [])

  const handleSave = () => {
    const text = inputRef.current.value

    fetch(API_BASE_URL, {
      method: "POST",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
    })
    .then(fetchBackend)
    .then(() => inputRef.current.value = '')
    .catch(err => console.error(err))
  }

  const handleUpdate = (id: number, text: string) => {
    fetch(API_BASE_URL + '/' + id, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
    .then(fetchBackend)
    .catch(err => console.error(err))
    ;
  }

  const handleDelete = (id: number) => {
    fetch(API_BASE_URL + "/" + id, {
      method: "DELETE",
      mode: "cors",
    })
    .then(fetchBackend)
    .catch(err => console.error(err))
  }

  const handleSort = () => {
    let sortedPosts = [...backendData ]
    // @ts-ignore
    sortedPosts.sort((a, b) => a.id-b.id)
    setBackendData(sortedPosts)
  }

  const handleReverseSort = () => {
    let sortedPosts = [...backendData ]
    // @ts-ignore
    sortedPosts.sort((a, b) => b.id-a.id)
    setBackendData(sortedPosts)
  }

  return <div className="main-content">
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleSort}>Sort</button>
      <button onClick={handleReverseSort}>Reverse sort</button>
    </div>
    {backendData.map(post => {

      return <Post key={post.id} id={post.id} text={post.text} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    })}
  </div>;
}

export default App;
