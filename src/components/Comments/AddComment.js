import faker from "@faker-js/faker";
import { useState } from "react";
import moment from "moment";

export default function AddComment({ setPost, postId, setComment }) {
  const [input, setInput] = useState("");
  // const [update, setUpdate] = useState('');
  const changeHandler = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
  };

  const submitForm = (e) => {
    e.preventDefault();

    var userComment = {
      name: faker.name.firstName(),
      img: faker.image.avatar(),
      id: Math.random() * 1000,
      date: moment().calendar(),
      comment: input,
      postID: postId,
    };
    console.log(userComment);

    if (localStorage.getItem("comments")) {
      let arr = JSON.parse(localStorage.getItem("comments"));
      let commnets = arr.filter((comment) => {
        return comment.postID === postId;
      });
      arr.push(userComment);
      commnets.push(userComment);
      localStorage.setItem("comments", JSON.stringify(arr));
      setComment(commnets);
    } else {
      //   let precomment = JSON.parse(localStorage.getItem("comments"));
      //   let newComment = [...precomment, userComment];
      localStorage.setItem("comments", JSON.stringify([userComment]));
      setComment([userComment]);
    }

    // setPost([...post, input]);
    setInput("");
  };

  return (
    <form>
      {console.log(postId)}
      <div class="ui input add-comment">
        <input
          type="text"
          placeholder="Add Comment"
          onChange={changeHandler}
          value={input}
        />
        <button class="ui secondary button add-comment-btn" onClick={submitForm}>
          Add comment
        </button>
      </div>
    </form>
  );
}
