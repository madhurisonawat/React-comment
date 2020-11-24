import React from 'react';
import './App.css';
import Comments from './Components/Comments'
import {data} from './Components/data'

function App() {
  const [commentData, setCommentData] = React.useState(data)
  
  const addNewComment = (parentId, payload, target) => {
    if (target.id === parentId) {
      target.replies.push(payload)
      return true
    }
    for (let i = 0; i < target.replies.length; i++){
      let flag = addNewComment(parentId, payload, target.replies[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  const addComments = (parentId, comment) => {
    let payload = {
      author: "Madhuri",
      id: Date.now(),
      body: comment,
      points: 5,
      replies: [],
      timestamp: new Date(),
    };

    let newCommentData = { ...commentData }
    addNewComment(parentId, payload, newCommentData)
    setCommentData(newCommentData)
  }

  return (
    <div className="App">
      <Comments data={commentData} addComments ={addComments}/>
    </div>
  );
}

export default App;
