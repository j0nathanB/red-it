import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Feed from './components/feed.js';
import AddSubreddit from './components/addSubreddit.js'

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      feedBlob: []
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
      let temp = this.state.feedBlob;
      temp.push({[subreddit]: res})

      this.setState({
        feedBlob: temp
      })
    })
  }

  addSubreddit(userInput) {
    this.updateFeed(userInput);
  }

  removeSubreddit() {
    // If remove last entry, then add News
  }

  componentDidMount() {
    this.updateFeed();
  }

  render() {
    return (
      <div className="App">
          <pre><h1 style={{color:"red", fontSize:50}}>it</h1></pre>
          <AddSubreddit parentFunc={this.addSubreddit}/>
          <Feed feedBlob={this.state.feedBlob} />
      </div>
    );
  }
}
// Default Get News (25 items)
// GET [/r/subreddit]/hot

// AutoComplete from search bar
// GET /api/subreddit_autocomplete

// Send POST request to fetch content from subreddit
// Sort subreddit content into feed

// Feed component
  // Headline
  // Headline

// Feed component is local object 
// 

export default App;
