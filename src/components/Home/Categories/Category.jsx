import React from "react";
import { NavLink } from 'react-router-dom';

const Category = (props) => {
    const { id, name, description, count } = props;
    return <NavLink state={{ category: name }} to={`/jobs/${name}`} className="category-box">
        {/* <div className="category-box-icon">
            <i className={icon}></i>
        </div> */}
        <div className="category-box-content">
            <h3 className="margin-top-18">{name}</h3>
            <p>{description}</p>
            <div className="category-box-counter">{count}</div>
        </div>
    </NavLink>;
};

export default Category;