import React, { useEffect } from 'react';
import { starRating } from '../../../../amimations/amimations';
import TimeAgo from './../../../TimeAgo';

const Comment = (props) => {
    const { id, title, tagLine, rating, comment, createTime } = props;

    useEffect(() => {
        
    }, []);

    return <li>
        <div className="boxed-list-item">
            <div className="item-content">
                <h4>{title} <span>Rated as {tagLine}</span></h4>
                <div className="item-details margin-top-10">
                    <div className="star-rating" data-rating={rating}></div>
                    <div className="detail-item"><i className="icon-material-outline-date-range"></i><TimeAgo timestamp={createTime} /></div>
                </div>
                <div className="item-description">
                    <p>{comment}</p>
                </div>
            </div>
        </div>
    </li>;
}

export default Comment;
