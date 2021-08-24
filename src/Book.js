import React from 'react';
import PropTypes from 'prop-types';

const Book = props=>{
    const imgAPI= props.book.imageLinks.thumbnail;//Book's image
    const title = props.book.title;//Book's title
    const authors=props.book.authors;//Book's author/s
    var book=props.book;//The book

    const selectedicon = "✓"; //The tick icon for selection purposes
    
    var shelfstext = [];//What should be written in each option

    //A for loop to assign the tick to the selected shelf
    for(let i =0 ; i<4; i++){
        if (props.book.shelf ==='currentlyReading')
            shelfstext[0]=selectedicon + " Currently Reading";
        else shelfstext[0]= "Currently Reading";
        if (props.book.shelf === 'wantToRead')
            shelfstext[1] = selectedicon + " Want to Read";
        else shelfstext[1] = "Want to Read";
        if (props.book.shelf === 'read')
            shelfstext[2] = selectedicon + " Read";
        else shelfstext[2] = "Read";        
        if (props.book.shelf === 'none')
            shelfstext[3] = selectedicon + " None";
        else shelfstext[3] = "None";
    }

    //This is the handle for changing shelfs in here
    function handle(e){
        book.shelf = e.target.value;
        props.handlemove(book);
    }
    //What is returned when 'Book is called'
    return (<li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imgAPI})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(e) => handle(e)}>
                        <option value="move" disabled>Move to...</option>
                        <option hidden></option>
                        <option value="currentlyReading">{shelfstext[0]}</option>
                        <option value="wantToRead">{shelfstext[1]}</option>
                        <option value="read">{shelfstext[2]}</option>
                        <option value="none">{shelfstext[3]}</option>
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