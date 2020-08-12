import React from 'react';
import './App.css';
import GiphySearcher from './GiphySearcher';

class App extends React.Component<{}, { searchTerm: string }> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            searchTerm: 'crow'
        }

        this.searchTermUpdate = this.searchTermUpdate.bind(this);
    }

    searchTermUpdate(event: { target: HTMLInputElement; }) {
        const target: HTMLInputElement = event.target;
        console.log(Object.getOwnPropertyNames(target))
        this.setState({
            searchTerm: target.value
        })
    }

    render() {
        return (
            <div className="App">
                <h1>Giphy Searcher!</h1>
                <label>Giphy Search: <input
                    type='text' name='searchTerm'
                    value={this.state.searchTerm}
                    onChange={this.searchTermUpdate}
                /> </label>
                <GiphySearcher search={this.state.searchTerm} />
            </div>
        );
    }
}

export default App;
