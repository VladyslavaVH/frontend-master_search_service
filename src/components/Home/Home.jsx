import React, { useEffect, useState } from "react";
import HomeContent from "./HomeContent";
import Footer from './../Footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import SignInWindow from './../HeaderContainer/SignInWindow/SignInWindow';

let Home = ({ isMapApiLoaded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [fromLocationData, setFromLocationData] = useState({});
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        setIsOpen(location.state?.startLoginPopup);
        setFromLocationData({...location.state?.from?.state});
    }, [location.state]);

    return <>
        <SignInWindow fromLocationData={fromLocationData} from={from} open={isOpen} onClose={() => setIsOpen(false)} />
        <HomeContent isMapApiLoaded={isMapApiLoaded} />
        <Footer />
    </>;
};

export default Home;
