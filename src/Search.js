import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class Search extends React.Component{
state={
    keyword:'',
    books:[],
}

componentWillMount(){
    console.log(this.state.books);
    BooksAPI.getAll().then((bs) => {
        this.setState({
            books: bs,
        });
    })

}

    updateKeyword = (k) => {
        this.setState(({
            keyword: k.trim()
        }))
        BooksAPI.search(this.state.keyword);
    }

    clear = () => {
        this.updateKeyword('')
    }



    render(){
        const b=this.state.books;
        console.log(b);
        const bookstobesearched = k => k === ''
            ? b
            : b.filter((book) => (
                book.title.toLowerCase().includes(k.toLowerCase()) 
                || book.authors[0].toLowerCase().includes(k.toLowerCase()) 
                || book.authors[book.authors.length-1].toLowerCase().includes(k.toLowerCase())
            ))
        const k = this.state.keyword;
        const bookstoberetrieved = bookstobesearched(k);
        //console.log("Books in search" + bookstobesearched);
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" onChange={e=>{this.updateKeyword(e.target.value)}}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {/* {console.log(bookstobesearched)} */}
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                
                                    
                                    {console.log(bookstoberetrieved)}
                                    {
                                    bookstoberetrieved.map(bo => {
                                        return <Book key={bo.id} id={bo.id} book={bo} handlemove={this.props.handlemove} />
                                    })
                                    }
                            </ol>
                        </div>
                    </ol>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    books: PropTypes.array.isRequired,
    handlemove: PropTypes.func.isRequired,
}

export default Search;