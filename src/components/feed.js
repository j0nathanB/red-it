import React from 'react';
import moment from 'moment';

const Feed = (props) => {
  //{props.feedBlob.map( (post,i) => <li key={i}>{post}</li>)}
  console.log('blob', props.feedBlob)
  const formatBlob = (blob) => {
    let results = [];

    for (let index in props.feedBlob) {
      for (let subreddit in props.feedBlob[index]) {
        for (let post in props.feedBlob[index][subreddit]) {
          props.feedBlob[index][subreddit][post].post_date = props.feedBlob[index][subreddit][post].created_utc * 1000;
          results.push(props.feedBlob[index][subreddit][post])
        }
        //console.log(props.feedBlob[index][subreddit][post])
      }
    }
    //sort here
    
    console.log('results', results.sort( (a,b) => a.created_utc < b.created_utc) )
    return results;
  }

  let formattedBlob = formatBlob(props.feedBlob);
  //console.log(formattedBlob);

  return (
    <div style={{
      display: "flex",
      
    }}>
    <ul style={{
      display: "flex",
      flexDirection: "column",
    }}>
      { formattedBlob.map( (post,i) => (
        <li key="i" style={{
          display: "flex",
          justifyContent: "flex-start"
        }}>
          <pre><a href={post.url}>{post.title}</a> ({post.domain}) { moment(post.post_date).fromNow() }| /{post.subreddit_name} | {post.score} points | {post.num_comments} comments | by {post.author} </pre>
        </li>
      )) }
    </ul>
    </div>
  )
}

export default Feed;