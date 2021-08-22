import React from 'react';
import PropTypes from 'prop-types';

const Book = props=>{
    const imgAPI= props.book.imageLinks.thumbnail;
    const title = props.book.title;
    const authors=props.book.authors;
    // const shelf=props.book.shielf;
    // console.log(props.book.shelf);
    var book=props.book;
    
    function handle(e){
        book.shelf = e.target.value;
        e.target.selected=true;
        // console.log(e.target.value);
        props.handlemove(book);
    }
    return (<li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imgAPI})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(e) => handle(e)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading" >Currently Reading</option>
                        <option value="wantToRead" onClick={(e) => handle(e)}>Want to Read</option>
                        <option value="read" onClick={(e) => handle(e)}>Read</option>
                        <option value="none" onClick={(e) => handle(e)}>None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
        </div>
    </li>);
}

Book.propTypes={
id:PropTypes.string.isRequired,
book:PropTypes.object.isRequired,
handlemove:PropTypes.func.isRequired,
};

export default Book;