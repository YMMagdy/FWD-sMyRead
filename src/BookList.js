import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookList extends React.Component{
    state = {
        books:[],//The list of books
        shelf:'',//The name of the shelf
    };

    componentDidMount(){
        this.setState(() => ({ shelf: this.props.shelf }));//Updating the state (shelf)
    }

render(){
    const bs=this.props.books;
    var shelf;//For writting the name of the shelf properly
    if (this.state.shelf ==='currentlyReading')
         shelf='Currently Reading';
    else if (this.state.shelf ==='wantToRead')
        shelf ='Want To Read';
    else if (this.state.shelf==='read')
        shelf='Read';
    else shelf = 'none'
    return (//What will be returned
    <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
            {bs.filter(b => b.shelf === this.state.shelf).map(bo=>{
                return <Book key={bo.id} id={bo.id} book={bo} handlemove={this.props.handlemove}/>
            })}   
            </ol>
        </div>
    </div>);
}
}

BookList.propTypes={
    books:PropTypes.array.isRequired,
    shelf:PropTypes.string.isRequired,
    handlemove: PropTypes.func.isRequired,
}

export default BookList; 