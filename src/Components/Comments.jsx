import React, { useState } from 'react'
import styles from './styles.module.css'

export default function Comments({ data, addComments }) {
    const [showReplies, setReplies] = useState(false)
    const [showThread, setThread] = useState(false)
    const [comment, setComment] = useState("")
    
    const getTimeStamp = (timestamp) => {
        let dat = new Date(timestamp)
        let diff = Date.now() - dat
        let sec = Math.floor(diff / 1000)
        if (sec < 60) {
            return `${sec} ${sec > 1 ? "seconds" :"second"} ago`
        }
        else if (sec / 60 < 60) {
            let min = Math.floor(sec / 60)
            return `${min} ${min > 1 ? "minutes" : "minute"} ago`;
        
        } else if (sec / (60 * 60) < 24) {
            let hr = Math.floor(sec / (60 * 60));
            return `${hr} ${hr > 1 ? "hours" : "hour"} ago`;
        } else {
            let days = Math.floor(sec / (60 * 60 * 24));
            return `${days} ${days > 1 ? "days" : "day"} ago`;
        }
    }
    return (
        <>
            <div>   
                <div className={styles.plusBox}>
                    {!showThread && data.replies && data.replies.length > 0 && (
                        <div className={styles.plus} onClick={()=>setThread(true)}> + </div>

                            
                    )}
                    
                    {showThread && (
                        <div className={styles.sidebar} onClick={()=>setThread(!showThread)}>
                        </div>
                    )}
                    <p style={{ fontWeight: 700, fontSize: "14px", marginLeft: 50, color: "green" }}>
                        {`${data.author} ${data.points} ${data.points>1?"points":"point"} ${getTimeStamp(data.timestamp)}`}

                    </p>
                    <p style={{ fontWeight: 700, marginLeft: 50 }}>{data.body}</p>
                    <div className={styles.replyBox}>
                        <div onClick ={()=>setReplies(!showReplies)}>Reply</div>
                        <div>Give Award</div>
                        <div>Report</div>
                        <div>Share</div>
                        <div>Save</div>
                    </div>
                    {showReplies && (
                        <>
                            <input style={{ marginLeft: 50 }}value={comment} placeholder="add comment" onChange={(e) =>setComment(e.target.value)}/>
                        <button onClick={()=>addComments(data.id,comment)}>Add</button>    
                        </>

                    )}
                    {showThread && data.replies && (
                        <div style={{ marginLeft: 50 }}>
                            {data.replies.map((item) => (
                                <Comments key={item.id} data={item} addComments={addComments}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            </>
    )
}