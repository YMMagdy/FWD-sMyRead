import React from 'react';
import PropTypes from 'prop-types';

const Book = props=>{
    const imgAPI= props.book.imageLinks.thumbnail;
    const title = props.book.title;
    const authors=props.book.authors;
    //const shelf=props.book.shielf;
    // console.log(props.book.shelf);
    var book=props.book;

    const selectedicon = "✓";
    
    var shelfstext = [];
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


    function handle(e){
        book.shelf = e.target.value;
        // e.target.selected=true;
        console.log(e.target.value);
        props.handlemove(book);
    }

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