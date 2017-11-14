import React from 'react';

class RemoveSubreddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subsAdded: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.parentFunc(event.target.textContent)
  }

  render(props) {
    return (
      <div>
        <div><pre>Included subreddits (click to remove):</pre></div>
        <div><ul>
          <pre>{this.props.added.map(
            (subs,i) => {
              return <li key={i} onClick={this.handleClick}>{subs}</li>
            }
            )}</pre>
        </ul></div>
      </div>
    )
  }
} 

export default RemoveSubreddit; 