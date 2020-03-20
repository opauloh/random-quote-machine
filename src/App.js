import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      quote: 'Loading your first quote of the day...',
      author: ''
    }

    this.loadQuote = this.loadQuote.bind(this);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getQuote(quotes) {
    const randomInteger = (this.getRandomInt(0, quotes.length));
    return quotes[randomInteger]
  }

  loadQuote() {

    this.setState({
      ...this.state,
      isLoading: true
    });
    setTimeout(() => {
      fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then(res => res.json())
        .then(data => data.quotes)
        .then(quotes => {
          this.setState({
            ...this.getQuote(quotes),
            isLoading: false
          })
        });
    }, 300);
  }

  componentDidMount() {
    this.loadQuote();

  }

  render() {
    return (<div className="container quote" id="quote-box">
      <div class="offset-md-2 col-md-8">
        <div className="card mb-3 quote__container">
          <div className="card-body" id="text">

            <h3 className={this.state.isLoading ? 'text-center quote__text ' : 'text-center quote__text fadeIn'}>{this.state.quote}</h3>
            <a id="tweet-quote" rel="noopener noreferrer" target="_blank" href={`https://twitter.com/intent/tweet?text="${this.state.quote}"%20${this.state.author}`} className="float-left pl-0 heartBeat btn btn-link"><i className="fab fa-twitter" /></a>
            <div className={this.state.isLoading ? 'float-right quote__author ' : 'float-right quote__author fadeInRight'} id="author">
              - {this.state.author}
            </div>
          </div>

        </div>
        <div class="text-center quote__footer">

          <button id="new-quote" onClick={this.loadQuote} className="pr-0 heartBeat  btn btn-link ">New Quote</button>
        </div></div>
    </div>);
  }
}

export default App;
