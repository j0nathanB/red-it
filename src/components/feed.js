import React from 'react';
import moment from 'moment';

const Feed = (props) => {
  //console.log('blob', props.feedBlob)
  const formatBlob = (blob) => {
    let results = [];
    blob.map(sub => sub.posts.map( post => results.push(post) ) );

    return results.sort( (a,b) => a.created_utc < b.created_utc );
  }

  let formattedBlob = formatBlob(props.feedBlob);

  return (
    <div style={{
      display: "flex",
      
    }}>
    <ul style={{
      display: "flex",
      flexDirection: "column",
    }}>
      { formattedBlob.map( (post,i) => (
        <li key={i + post.post_date} style={{
          display: "flex",
          justifyContent: "flex-start"
        }}>
          <pre><a href={post.url}>{post.title}</a> ({post.domain}) { moment(post.post_date).fromNow() } by {post.author} | /{post.subreddit_name} | {post.score} points | <a href={"https://reddit.com" + post.permalink}>{post.num_comments} comments</a> |  </pre>
        </li>
      )) }
    </ul>
    </div>
  )
}

export default Feed;