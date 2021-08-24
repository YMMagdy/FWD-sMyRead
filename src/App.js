import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import BooksList from './BookList';
import {Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Search from './Search'


class BooksApp extends React.Component {
  state = {
    books:[],//All the books available in the app
  }

  componentDidMount() {
    BooksAPI.getAll().then((bs) => {
      this.setState({
        books:bs,
      });
    }//This is called in order to get all of the books using an API
      );
  }
  
  //This method is used to handle the switching of the books from one shelf to the other
  handleMove = b =>{
    var bs=this.state.books;
    const i = bs.findIndex(book=>book.id===b.id)
    if(i!==-1)
    {
      bs[i]=b;
    this.setState({ 
      books:bs})
    }
    else {
      this.state.books.push(b);
    }
    BooksAPI.update(b,b.shelf);//Updating the book and its shelf
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>{
          return(
            <div>
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
            <BooksList books={this.state.books} shelf='currentlyReading' handlemove={this.handleMove}></BooksList>
              <BooksList books={this.state.books} shelf='wantToRead' handlemove={this.handleMove}></BooksList>
              <BooksList books={this.state.books} shelf='read' handlemove={this.handleMove}></BooksList>
              <div className="open-search">
                <Link to="/search" ><button></button></Link>
              </div>
            </div>
            
          )}}></Route>
              <Route exact path='/search' render={() => {
                return (
                 <Search books={this.state.books} handlemove={this.handleMove}></Search>
                )
              }}></Route>
      </div >
    )
  }
}

export default BooksApp
