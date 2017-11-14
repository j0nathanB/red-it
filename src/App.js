import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Feed from './components/feed.js';
import AddSubreddit from './components/addSubreddit.js';
import RemoveSubreddit from './components/removeSubreddit.js';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      feedBlob: [],
      subreddits: []
    }

    this.updateFeed = this.updateFeed.bind(this);
    this.addSubreddit = this.addSubreddit.bind(this);
    this.removeSubreddit = this.removeSubreddit.bind(this);
  }
  
  updateFeed(subreddit) {
    if (!subreddit){
      subreddit = 'news'; 
    } 

    axios.get(`http://www.reddit.com/r/${subreddit}/hot/.json?limit=10`).then( res => {
      let temp = res.data.data.children.map(post => {
          return { 
            title: post.data.title, 
            domain: post.data.domain,
            author: post.data.author,
            url: post.data.url,
            created_utc: post.data.created_utc,
            num_comments: post.data.num_comments,
            permalink: post.data.permalink,
            score: post.data.score,
            subreddit_name: post.data.subreddit_name_prefixed
          }
        });

      return temp;  
    }).then( res => {
      let feedObject = this.state.feedBlob;
      feedObject.push({"posts": res, "name": subreddit});

      let subObject = this.state.subreddits;
      subObject.push(subreddit);

      this.setState({
        feedBlob: feedObject,
        subreddits: subObject
      })
    })
    .catch(err => console.log('ERROR!', err))
  }

  addSubreddit(userInput) {
    if (!this.state.subreddits.includes(userInput)) {
      this.updateFeed(userInput);
    }
  }

  removeSubreddit(selected) {
    let temp = this.state.feedBlob;

    console.log('asdas', temp.map(thing => thing))
    
    temp.filter(subreddit => subreddit[selected] !== `r/${selected}`);
    this.setState({
      feedBlob: temp
    })
    // If remove last entry, then add News
  }

  componentDidMount() {
    this.updateFeed();
  }

  render() {
    return (
      <div className="App">
        <div style={{
          display: "flexbox",
          flexDirection: "column"
        }}>
          <pre><h1 style={{color:"red", fontSize:50}}>it</h1></pre>
          <AddSubreddit parentFunc={this.addSubreddit}/>
          <div style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
            <RemoveSubreddit parentFunc={this.removeSubreddit} added={this.state.subreddits}/>
            <Feed feedBlob={this.state.feedBlob} />
          </div>
      </div>
      </div>
    );
  }
}

export default App;
