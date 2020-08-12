import {GiphyFetch} from '@giphy/js-fetch-api'
import { IGif } from '@giphy/js-types'
import { Gif } from '@giphy/react-components'
import React from "react";

const gf = new GiphyFetch('NB2JShG2JpRe8ADgaafuBQZ4lsfqJq8c')

export default class GiphySearcher extends React.Component<{search: string}, {gifs: IGif[]}> {
    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            gifs: []
        }
    }

    async componentDidMount() {
        const {data} = await gf.search(this.props.search, {limit: 3, rating: 'pg'})
        this.setState({gifs: data})
        this.forceUpdate();
    }

    shouldComponentUpdate(nextProps: Readonly<{ search: string }>, nextState: Readonly<{}>, nextContext: any): boolean {
        return nextProps.search !== this.props.search
    }

    async componentDidUpdate(prevProps: Readonly<{ search: string }>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.search !== this.props.search) {
            const {data} = await gf.search(this.props.search, {limit: 3, rating: 'pg'})
            this.setState({gifs: data});
            this.forceUpdate();
        }
    }

    render() {
        if (this.state.gifs.length === 0) {
            return (<p>Unfortunately, no results!</p>);
        }
        return this.state.gifs.map(item => <div className='imgWrapper'><Gif gif={item} width={300} /></div>)
    }
}