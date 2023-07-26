import React, {useState} from 'react'

const Post = ({
  id,
  text,
  handleUpdate,
  handleDelete
}) => {
  const [currentText, setCurrentText] = useState(text)
  return (
    <div>
      <input type="text" value={currentText} onChange={(ev) => setCurrentText(ev.target.value)} />
      <button onClick={() => handleUpdate(id, currentText)}>Update</button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  )
}

export default Post
