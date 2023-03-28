import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { inlineBG, starRating } from "../../../amimations/amimations";
import { useGetFullMasterInfoQuery, useVerifyMasterMutation } from "../../../features/admin/adminApiSlice";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useTranslation } from 'react-i18next';

const MasterDocuments = (props) => {
    const { t } = useTranslation();
    const [documents, setDocuments] = useState([]); 
    const location = useLocation();
    const navigate = useNavigate();
    const [verifyMaster] = useVerifyMasterMutation();
    const { data, isLoading } = useGetFullMasterInfoQuery(location.state.id);
    const { id, firstName, lastName, tagLine, isAdminChecked, passportFirstSide, passportSecondSide, individual_tax_number, phone, email, avatar, flag, country } = data || {};

    useEffect(() => {
        inlineBG();
    }, []);

    useEffect(() => {
        if (!isLoading && documents.length < 3) {            
            data.passportFirstSide && documents.push(`${mastersDocumentsPath}${passportFirstSide}`);
            data.passportSecondSide && documents.push(`${mastersDocumentsPath}${passportSecondSide}`);
            data.individual_tax_number && documents.push(`${mastersDocumentsPath}${individual_tax_number}`);
            console.log(documents);
            setDocuments([...documents]);
        }
    }, [isLoading])
    
    const imgPath = process.env.REACT_APP_IMG_PATH;
    const mastersDocumentsPath = process.env.REACT_APP_MASTERS_DOCUMENTS_PATH;
    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;
    const flagPath = process.env.REACT_APP_FLAG_PATH;

    const adminVerifyClick = async () => {
        const res = await verifyMaster(id).unwrap();
        if (!res) return;
        navigate(-1);
    }

    return <><div className="single-page-header freelancer-header" data-background-image={`${imgPath}single-freelancer.jpg`}>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="single-page-header-inner">
                        <div className="left-side">
                            <div className="header-image freelancer-avatar"><img src={`${profilePhotosPath}${avatar}`} alt="" /></div>
                            <div className="header-details">
                                <h3>{`${firstName} ${lastName}`} <span>{tagLine}</span></h3>
                                <ul>
                                    <li><div>{phone}</div></li>
                                    <li><div>{email}</div></li>
                                    {flag && <li><img className="flag" src={`${flagPath}${flag}.svg`} alt="" /> Germany</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

        <div className="container">
            <div className="row">

                {/* <!-- Content --> */}
                <div className="col-xl-8 col-lg-8 content-right-offset">

                    
                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">{t("Documents")}</h3>
                    
                    { !isLoading && documents.length > 0
                        ? <div style={{ display: 'flex', flexWrap: 'wrap', }}>
                            <PhotoProvider
                                speed={() => 800}
                                easing={(type) => (type === 3 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
                            >
                                {documents?.map((item, index) => (
                                    <PhotoView key={index} src={item}>
                                        <img style={{ marginRight: '.5rem', marginBottom: '.5rem', objectFit: 'cover', width: '11rem', height: '9rem', maxWidth: '100%', display: 'block', verticalAlign: 'middle', cursor: 'pointer' }} src={item} alt="" />
                                    </PhotoView>
                                ))}
                            </PhotoProvider>
                        </div>
                        : <p>{t('TheMasterDidntProvideAnyDocuments')}</p>
                    }

                        {!isLoading && documents.length > 0 && !(!!+isAdminChecked) && 
                        <a onClick={adminVerifyClick} className="button margin-top-25 ripple-effect button-sliding-icon" style={{ width: '155.396px', color: '#fff' }}>{t("Verify")} <i className="icon-line-awesome-check"></i></a>}
                    </div>

                </div>

            </div>
        </div>
    </>;
};

export default MasterDocuments;
