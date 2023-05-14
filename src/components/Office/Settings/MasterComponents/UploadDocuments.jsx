import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Documents from './Documents';
import NotificationDialog from '../../../HeaderContainer/Popup/NotificationDialog';
import { ReactComponent as MySpinner } from '../../../../animations/mySpinner.svg';
import { useUploadDocumentsMutation } from '../../../../features/master/masterApiSlice';

const UploadDocuments = ({ setDocuments }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [notificationText, setNotificationText] = useState(false);
    const [passportPhotos, setPassportPhotos] = useState([]);
    const [itnPhoto, setItnPhoto] = useState(null);
    const [imgUrls, setImgUrls] = useState([]);

    const [uploadDocuments] = useUploadDocumentsMutation();

    const mastersDocumentsPath = process.env.REACT_APP_MASTERS_DOCUMENTS_PATH;

    const onSubmit = async e => {
        e.preventDefault();

        try {
            setLoading(true);
            let formData = new FormData();

            formData.append(`passport1`, passportPhotos[0]);
            formData.append(`passport2`, passportPhotos[1]);
            formData.append(`itn`, itnPhoto);

            // let formEntries = Array.from(formData.entries());
            // console.log("formEntries " , formEntries); 
            
            const res = await uploadDocuments(formData).unwrap();

            if(!res.success) {
                setNotificationText('UploadDocError');
                setIsOpen(true);
            } else {
                setDocuments(imgUrls);
            }

            setLoading(false);

        } catch (error) {
            console.error(error);
        }
    }

    const saveItnPhoto = async ({ target }) => {
        setItnPhoto(target.files[0]);

        let reader = new FileReader();
        reader.onload = function(e) {
            imgUrls.push(e.target.result);
            setImgUrls([...imgUrls]);
        }

        reader.readAsDataURL(target.files[0]);
    };

    const savePassportPhotos = async ({ target }) => {
        if (target.files.length !== 2) {
            setNotificationText('Only2PassportPhotos');
            setIsOpen(true);
            return;
        }
        
        let files = Array.from(target.files).map(file => {

            passportPhotos.push(file);
            
            let reader = new FileReader();
            
            return new Promise(resolve => {
                
                reader.onload = () => resolve(reader.result);
                
                reader.readAsDataURL(file);
                
            });
            
        });
        
        // At this point you'll have an array of results
        let res = await Promise.all(files);

        setImgUrls(res);
        setPassportPhotos([...passportPhotos]);
    };

    return <div className='col'>
        <form className='row margin-bottom-15' onSubmit={onSubmit} id="uploadDocForm">
            <div className="col-xl-12">
                <div className="numbered color filled">
                    <ol className="col-xl-12">
                        <li className="container">
                            {passportPhotos.length === 0
                                ? <div className="row">
                                    <div className="col-xl-6 col-md-6">
                                        <div className="uploadButton" title={t("UploadPassportPhotos")}>
                                            <div style={{ width: 'inherit' }} className="">
                                                <input
                                                    onChange={savePassportPhotos}
                                                    name="passportPhotos" id="upload" multiple
                                                    className="uploadButton-input" type="file" accept="image/*, application/pdf" />
                                                <label className="uploadButton-button ripple-effect" htmlFor="upload">{t("Passport")}</label>
                                                {/* <h5><span className='uploadButton-file-name'><i className="icon-feather-user-check margin-right-5"></i>{t("UploadPassportPhotos")}</span></h5> */}
                                            </div>
                                        </div>
                                    </div>

                                    <span className='uploadButton-file-name col-xl-6 col-md-6'><i className="icon-feather-user-check margin-right-5"></i>{t("UploadPassportPhotos")}</span>
                                </div>
                                : <i style={{ fontSize: 36, color: '#2a41e8' }} className="icon-material-outline-check"></i>
                            }
                        </li>

                        {passportPhotos.length > 0 &&
                        <li className="container">
                            {!itnPhoto
                                ? <div className="row">
                                    <div className="col-xl-6 col-md-6">
                                        <div className="uploadButton" title={t('UploadAPhotoOfYourTaxIdentificationNumber')}>
                                            <div style={{ width: 'inherit' }} className=''>
                                                <input
                                                    onChange={saveItnPhoto}
                                                    name="itnPhoto" id={`upload`}
                                                    className="uploadButton-input" type="file" accept="image/*, application/pdf" />
                                                <label className="uploadButton-button ripple-effect" htmlFor="upload">ITN</label>
                                            </div>
                                        </div>
                                    </div>

                                    <span className='uploadButton-file-name col-xl-6 col-md-6'><i className="icon-material-outline-note-add margin-right-5"></i>{t("UploadAPhotoOfYourTaxIdentificationNumber")}</span>
                                </div>
                                : <i style={{ fontSize: 36, color: '#2a41e8' }} className="icon-material-outline-check"></i>
                            }
                        </li>}
                    </ol>
                </div>

                {imgUrls.length > 0 &&
                <div className='row'>
                    <div style={{width: 'inherit'}}>
                        <Documents documents={imgUrls} />
                    </div>
                </div>}
            </div>

            {itnPhoto && passportPhotos.length > 0 &&
            <div className='col-xl-12'>
                <div className='row'>
                    {loading
                    ? <div className=''>
                        <div style={{width: 'inherit'}}>
                            <span className='button big ripple-effect'>
                                <MySpinner style={{
                                    display: 'inline-block',
                                    marginBottom: '-10px',
                                }} />
                                {t("Upload")}
                            </span>
                        </div>
                    </div>
                    :<button className='button big ripple-effect' 
                    type='submit'
                    form='uploadDocForm'
                    >{t("Upload")}</button>}
                </div>
            </div>}
        </form >
            
        <NotificationDialog open={isOpen} onClose={() => setIsOpen(false)}>
            {t(notificationText)}
        </NotificationDialog>
    </div>;
};

export default UploadDocuments;
