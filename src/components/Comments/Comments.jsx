import React, { useState, useEffect } from "react";
import "./comments.css";
import faker from "@faker-js/faker";
import AddComment from "./AddComment";
function Comments(props) {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [showEditId, setShowEditId] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (localStorage.getItem("comments")) {
      let arr = JSON.parse(localStorage.getItem("comments"));
      let commnets = arr.filter((comment) => {
        return comment.postID == props.postId;
      });
      console.log(commnets);
      setComment(commnets);
    }
  }, []);

  const deleteHandler = (e, id) => {
    let comments = comment.filter((el) => el.id !== id);
    localStorage.setItem("comments", JSON.stringify(comments));
    setComment(comments);
  };

  const editHandler = (e, comments) => {
    setNewComment(comments.comment);
    setShowEditId(comments.id);
    setShowEdit(true);
  };

  const saveHandler = (e, id) => {
    let comments = comment.map((el) => {
      if (el.id === id) {
        return { ...el, comment: newComment };
      } else {
        return el;
      }
    });
    localStorage.setItem("comments", JSON.stringify(comments));
    setComment(comments);
    setShowEdit(false);
  };

  return (
    <div className="container">
      {comment.length === 0
        ? ""
        : comment.map((comments) => (
            <div class="ui comments" key={post.id}>
              <div class="comment">
                <a class="avatar">
                  <img src={comments.img} />
                </a>
                <div class="content">
                  <a class="author">{comments.name}</a>
                  <div class="metadata">
                    <div class="date">{comments.date}</div>
                  </div>
                  <div class="text">
                    <p className="fontsize-comments"> {comments.comment} </p>
                    <p>
                      <div className="todo-comments">
                        <button 
                          onClick={(e) => deleteHandler(e, comments.id)}
                          className="ui inverted red button"
                        >
                          Delete
                        </button>
                        {showEdit && showEditId === comments.id ? (
                          <>
                          <div className="ui input" > 
                            <input type="text"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                            </div>
                            <button class="ui primary button"
                              onClick={(e) => saveHandler(e, comments.id)}
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={(e) => editHandler(e, comments)}
                            className="ui inverted violet button"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

      <AddComment
        postId={props.postId}
        // setPost={setPost}
        setComment={setComment}
        comment={comment}
      />
    </div>
  );
}

export default Comments;
