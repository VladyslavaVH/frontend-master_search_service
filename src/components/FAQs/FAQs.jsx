import React, { useState, useEffect } from "react";
import Titlebar from "../Office/Titlebar";
import Footer from "../Footer/Footer";
import { NavLink } from "react-router-dom";
import { useGetFaqsQuery } from "../../features/faqs/faqsApiSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

let FAQs = (props) => {
    const { data, isLoading } = useGetFaqsQuery();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [accordionData, setAccordionData] = useState([]);

    useEffect(() => {
        if (!isLoading && accordionData.length !== data.faqs.length) {
            for (let i = 0; i < data.faqs.length; i++) {
                accordionData.push(false);
            }
        }
    }, [isLoading]);

    const onAccordionClick = e => {
        const accordionIndex = e.target.parentNode.getAttribute('data-index');
        const tmp = accordionData[accordionIndex];
        accordionData[accordionIndex] = !tmp;
        setAccordionData([...accordionData]);
    }

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
                                            <ul style={{ cursor: 'pointer' }}>
                                                <li><NavLink to={'/'}>{t('Home')}</NavLink></li>
                                                <li><NavLink to={'/'}>{t("About")}</NavLink></li>
                                                <li>FAQs</li>
                                            </ul>
                                        </nav>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion js-accordion">

                            {!isLoading && data?.faqs?.map((faq, i) =>
                                <div key={faq.id} onClick={onAccordionClick} data-index={i} className={`accordion__item js-accordion-item ${accordionData[i] ? 'active' : ''}`}>
                                    <div className="accordion-header js-accordion-header">{faq.question}</div>

                                    <div className="accordion-body js-accordion-body" style={{ display: accordionData[i] ? 'block' : 'none' }}>

                                        <div className="accordion-body__contents">
                                            <div data-info="answer">{faq.answer}</div>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="clearfix"></div>

                    </div>
                </div>
            </div>

            <div className="padding-top-40"></div>

        </div>

        <Footer />
    </>;
}

export default FAQs;