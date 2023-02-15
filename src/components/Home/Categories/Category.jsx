import React from "react";
import { NavLink } from 'react-router-dom';
import { selectIsAuth, selectIsMaster } from './../../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Category = (props) => {
    const { id, name, description, count } = props;
    const isAuth = useSelector(selectIsAuth);
    const isMaster = useSelector(selectIsMaster);
    const navigate = useNavigate();

    const onClick = () => {
        if (isAuth && isMaster) {
            navigate(`/jobs/${name}`, { state: {
                categoryId: id, category: name
            }});
        }
    };

    return <a onClick={onClick} style={{ cursor: (isAuth && isMaster) ? 'pointer' : 'default' }} className="category-box">
        <div className="category-box-content">
            <h3 className="margin-top-18">{name}</h3>
            <p>{description}</p>
            <div className="category-box-counter">{count}</div>
        </div>
    </a>;
};

export default Category;