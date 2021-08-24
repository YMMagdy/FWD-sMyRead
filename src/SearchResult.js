import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class SearchResult extends React.Component {

    state = {
        books:[],
    }
    
    static getDerivedStateFromProps(nextprops,prevstate){
        // console.log(nextprops.books);        
        return{books: nextprops.books}
        // prevstate.books=nextprops.books;
    }

    // componentDidMount(){
    // this.setState({books:this.props.books})
    // console.log(this.props.books)    
    // }

    render(){
        const b = this.state.books;
        console.log('inside search result render'+b);
        return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                b.map(bo => { 
                return <Book key={ bo.id } id = { bo.id } book = { bo } handlemove = { this.props.handlemove(bo) }/>})}
            </ol>
        </div>
);
    }

}

SearchResult.propTypes={
    books:PropTypes.array.isRequired,
    handlemove:PropTypes.func.isRequired,
}
export default SearchResult;