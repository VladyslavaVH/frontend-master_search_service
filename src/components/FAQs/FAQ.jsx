import React from 'react';

const FAQ = ({ question, answer }) => {
    return <a href="pages-blog-post.html" className="blog-post">
        <div className="blog-post-content">
            <h3>{question}</h3>
            <p>{answer}</p>
        </div>
    </a>;
}

export default FAQ;
