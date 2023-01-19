import React from "react";
import Titlebar from "../Office/Titlebar";
import Footer from "../Footer/Footer";
import { useLocation, NavLink } from "react-router-dom";
import { useGetFaqsQuery } from "../../features/faqs/faqsApiSlice";
import FAQ from './FAQ';

let FAQs = (props) => {
    const { data, isLoading } = useGetFaqsQuery();

    return <>
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div id="titlebar" className="gradient">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">

                                        <h2>FAQs</h2>

                                        <nav id="breadcrumbs" className="dark">
                                            <ul>
                                                <li><NavLink to={'/'}>Home</NavLink></li>
                                                <li><a>About us</a></li>
                                                <li>FAQs</li>
                                            </ul>
                                        </nav>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {!isLoading && data?.faqs?.map(f => <FAQ key={f.id} {...f} />)}

                        <div className="clearfix"></div>
                        <div className="row">
                            <div className="col-md-12">
                                
                                <div className="pagination-container margin-top-10 margin-bottom-20">
                                    <nav className="pagination">
                                        <ul>
                                            <li><a href="#" className="current-page ripple-effect">1</a></li>
                                            <li><a href="#" className="ripple-effect">2</a></li>
                                            <li><a href="#" className="ripple-effect">3</a></li>
                                            <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className="padding-top-40"></div>

        </div>

        <Footer />
    </>;
}

export default FAQs;