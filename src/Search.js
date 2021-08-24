import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class Search extends React.Component{
state={
    keyword:'',//The keyword being inserted to the search input
    books:[],//All of the books in the app
    booksretrieved:[],
}

componentWillMount(){
    console.log(this.state.books);
    BooksAPI.getAll().then((bs) => {
        this.setState({
            books: bs,
        });
    })//Getting all of the books using an API

}

    //Updating the keyword whenever an event occurs
    updateKeyword = (k) => {
        if(k===''){this.clear()}
        else{
        this.setState(({
            keyword: k.trim(),
        }))
        console.log(this.state.keyword)
        if(this.state.keyword!=='' && !this.state.keyword.includes(' '))//To prevent the calling when the input is empty and prevent returning an empty array to the state
        BooksAPI.search(k).then((bs) => {
            if(bs.error===undefined||bs.error===null)
            this.setState({
                booksretrieved: bs,
            })
            console.log(this.state.booksretrieved)
        }//This is called in order to get all of the books using an API
        );
        }
    }

    //Clearing the keyword
    clear = () => {
        this.updateKeyword('')
    }


    //What will be returned to the instance of the App
    render(){
        const b=Object.values(this.state.booksretrieved);
        const bookstobesearched = k => k === ''
            ? b
            : b.filter((book) => (
                book.title.toLowerCase().includes(k.toLowerCase()) 
                || book.authors[0].toLowerCase().includes(k.toLowerCase()) 
                || book.authors[book.authors.length-1].toLowerCase().includes(k.toLowerCase())
            ))//The search by the title or the name of the authors
        const k = this.state.keyword;//The keyword
        const bookstoberetrieved = bookstobesearched(k);//What books should be displayed with respect to the current keyword in the search box
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={e=>{this.updateKeyword(e.target.value)}}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                    {
                                    bookstoberetrieved.map(bo => {
                                        return <Book key={bo.id} id={bo.id} book={bo} handlemove={this.props.handlemove} />
                                    })
                                    //Returning the books that fits the search's criteria
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