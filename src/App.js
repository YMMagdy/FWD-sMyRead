import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import BooksList from './BookList';
import {Route} from 'react-router-dom';
import { Link } from 'react-router-dom';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((bs) => {
      this.setState(() => ({
        books:bs,
      }));});
  }
  
  handleMove = b =>{
    const{book,i}=this.state.books.filter((book,i) => book.id===b.id)
    var bs=this.state.books;
    bs[i]=book;
    this.setState(() => ({ 
      books:bs}))
    // BooksAPI.update(b,b.shelf);
  }

  render() {
    // console.log(this.state.books);
    return (
      <div className="app">
        <Route exact path="/" render={()=>{
          return(
            <div>
            <BooksList books={this.state.books} shelf='currentlyReading' handlemove={this.handleMove}></BooksList>
              <BooksList books={this.state.books} shelf='wantToRead' handlemove={this.handleMove}></BooksList>
              <BooksList books={this.state.books} shelf='read' handlemove={this.handleMove}></BooksList>
              <div class="open-search">
                <Link to="/search" ><button></button></Link>
              </div>
            </div>
            
          )}}></Route>
              <Route exact path='/search' render={() => {
                return (
                  <div className="search-books">
                    <div className="search-books-bar">
                      <Link to="/" ><button className="close-search">Close</button></Link>
                      <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" />

                      </div>
                    </div>
                    <div className="search-books-results">
                      <ol className="books-grid"></ol>
                    </div>
                  </div>
                )
              }}></Route>
      </div >
    )
  }
}

export default BooksApp
