import React from "react";
import { selectIsAuth, selectIsMaster } from './../../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateCurrentMasterLocationMutation } from "../../../features/master/masterApiSlice";

const Category = (props) => {
    const { id, name, description, count, defaultName } = props;
    const isAuth = useSelector(selectIsAuth);
    const isMaster = useSelector(selectIsMaster);
    const navigate = useNavigate();
    
    const DEFAULT_LOCATION = {
        lat: parseFloat(process.env.REACT_APP_DEFAULT_LAT),
        lng: parseFloat(process.env.REACT_APP_DEFAULT_LNG),
    };

    const onClick = () => {
        if (isAuth && isMaster) {
            navigate(`/jobs/${defaultName.replaceAll('/', '-')}`, { state: {
                categoryId: id, 
                category: defaultName,
                masterPos: DEFAULT_LOCATION,
                defaultCenter: true,
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