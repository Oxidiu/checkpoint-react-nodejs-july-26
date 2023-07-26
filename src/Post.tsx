import React, {useState} from 'react'

type postProps = {
  id: number;
  text: string;
  handleUpdate: (id: number, text: string) => void;
  handleDelete: (id: number) => void;
}

const Post: React.FC<postProps> = ({
  id,
  text,
  handleUpdate,
  handleDelete
}) => {
  const [currentText, setCurrentText] = useState<string>(text)
  return (
    <div >
      <input className={id % 2 === 0 ? 'red' : 'blue'} type="text" value={currentText} onChange={(ev) => setCurrentText(ev.target.value)} />
      <button onClick={() => handleUpdate(id, currentText)}>Update</button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  )
}

export default Post
