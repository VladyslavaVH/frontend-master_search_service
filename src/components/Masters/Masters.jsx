import React from "react";
import Footer from './../Footer/Footer';
import MasterCard from "./MasterCard";
import { useGetAllMastersListQuery } from "../../features/masters/mastersApiSlice";

const Masters = (props) => {
    // const masters = [
    //     { id: 1, isVerified: true, avatar: 'user-avatar-big-01.jpg', firstName: 'Tom', lastName: 'Smith', tagLine: 'UI/UX Designer', rating: 5.0, flag: 'gb', country: 'United Kingdom', lat: null, lng: null},
    //     { id: 2, isVerified: true, avatar: 'user-avatar-big-02.jpg', firstName: 'David', lastName: 'Peterson', tagLine: 'IOS Expert + Node Dev', rating: 4.5, flag: 'de', country: 'Germany', lat: null, lng: null,},
    //     { id: 3, isVerified: false, avatar: null, firstName: 'Marcia', lastName: 'Kowalski', tagLine: 'Front-End Developer', rating: 4.9, flag: 'pl', country: 'Poland',lat: null, lng: null,},
    //     { id: 4, isVerified: true, avatar: 'user-avatar-big-03.jpg', firstName: 'Sindy', lastName: 'Forest', tagLine: 'Magento Certified Developer', rating: 5.0, flag: 'au', country: 'Australia',lat: null, lng: null,}
    // ];

    const { data: masters, isLoading } = useGetAllMastersListQuery();

    return <><div className="margin-top-90"></div>

        <div className="container">
            <div className="row">
                <div className="col-xl-3 col-lg-4">
                    <div className="sidebar-container">

                        <div className="sidebar-widget">
                            <h3>Country</h3>
                            <div className="input-with-icon">
                                <div id="autocomplete-container">
                                    <input id="autocomplete-input" type="text" placeholder="Contry" onChange={(e) => {}} />
                                </div>
                                <i className="icon-material-outline-location-on"></i>
                            </div>
                        </div>

                        <div className="sidebar-widget">
                            <h3>City</h3>
                            <div className="input-with-icon">
                                <div id="autocomplete-container">
                                    <input id="autocomplete-input" type="text" placeholder="City" onChange={(e) => {}} />
                                </div>
                                <i className="icon-material-outline-location-on"></i>
                            </div>
                        </div>

                        <div className="sidebar-widget">
                            <h3>Category</h3>
                            <select className="selectpicker default" multiple data-selected-text-format="count" data-size="7" title="All Categories" >
                                <option>Admin Support</option>
                                <option>Customer Service</option>
                                <option>Data Analytics</option>
                                <option>Design & Creative</option>
                                <option>Legal</option>
                                <option>Software Developing</option>
                                <option>IT & Networking</option>
                                <option>Writing</option>
                                <option>Translation</option>
                                <option>Sales & Marketing</option>
                            </select>
                        </div>

                        <div className="clearfix"></div>

                    </div>
                </div>
                <div className="col-xl-9 col-lg-8 content-left-offset">

                    <h3 className="page-title">Search Results</h3>


                    {/* <!-- Freelancers List Container --> */}
                    <div className="freelancers-container freelancers-grid-layout margin-top-35">

                        {!isLoading && masters?.map((m) => <MasterCard key={m.id} {...m} />)}

                    </div>
                    {/* <!-- Freelancers Container / End --> */}


                    {/* <!-- Pagination --> */}
                    <div className="clearfix"></div>
                    <div className="row">
                        <div className="col-md-12">
                            {/* <!-- Pagination --> */}
                            <div className="pagination-container margin-top-40 margin-bottom-60">
                                <nav className="pagination">
                                    <ul>
                                        <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"></i></a></li>
                                        <li><a href="#" className="ripple-effect">1</a></li>
                                        <li><a href="#" className="current-page ripple-effect">2</a></li>
                                        <li><a href="#" className="ripple-effect">3</a></li>
                                        <li><a href="#" className="ripple-effect">4</a></li>
                                        <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Pagination / End --> */}

                </div>
            </div>
        </div>
        <Footer />
    </>;
}

export default Masters;
