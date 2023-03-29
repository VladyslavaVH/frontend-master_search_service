import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {  yupResolver } from '@hookform/resolvers/yup';
import { usePostJobMutation } from "../../../../features/jobs/jobsApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../features/auth/authSlice";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategorySelect from "./CategorySelect";
import LocationsAutocomplete from "../../../Jobs/FiltersSidebar/LocationsAutocomplete";
import CurrencySelect from "./CurrencySelect";
import NotificationDialog from './../../../HeaderContainer/Popup/NotificationDialog';

const INPUTS_SHADOW_STYLES = {
    border: 'none',
    boxShadow: '0 1px 4px 0px rgb(0 0 0 / 12%)'
};

const schema = yup
  .object()
  .shape({
      // name: yup.string().required(),
      // age: yup.number().required(),
      photos: yup.mixed()
        //   .test("fileSize", "File Size is too large", (value) => {
        //       return value.length && value[0].size <= 5242880;
        //   })
        //   .test("fileType", "Unsupported File Format", (value) => {
        //       return value.length && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        //   })
  });

let JobPosting = (props) => {
    const { t } = useTranslation();
    const [notificationText, setNotificationText] = useState('');
    const [minP, setMinP] = useState(100);
    const [maxP, setMaxP] = useState(1000);
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    useState(() => {
        if (watch('photos')?.length > 0 && errors?.photos) {
            setNotificationText(errors.photos.message);
            setIsOpen(true);
            reset();
        }
    }, [watch('photos'), errors, errors.photos]);

    useEffect(() => {
        if ( minP > maxP) {
            setMinP(maxP - 1);
            setNotificationText('NotValidPaymentData');
            setIsOpen(true);
        }
    }, [minP, maxP])
    
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [postJob] = usePostJobMutation();

    const [categoryFK, setCategoryFK] = useState(1);
    const [jobLocation, setJobLocation] = useState({});
    const [currencyFK, setCurrencyFK] = useState(1);

    const onSubmit = async data => {
        try {
            if (minP == 0 || !minP || !maxP || maxP == 0 || (minP > maxP)) {
                setMinP(maxP - 1);
                setNotificationText('NotValidPaymentData');
                setIsOpen(true);
                return;
            }

            let formData = new FormData();
            if (data.photos) {
                Object.keys(data.photos).forEach(key => 
                    formData.append(data?.photos?.item(key).name, data?.photos?.item(key))
                );
            }
            

            //let minPayment = parseInt(data?.minPayment);
            //let maxPayment = parseInt(data?.maxPayment);

            let jobPostData = {
                clientFK: user.id,
                ...data,
                categoryFK,
                minPayment: minP,
                maxPayment: maxP,
                currencyFK,
                ...jobLocation
            };
            data.photos && delete jobPostData.photos;

            Object.keys(jobPostData).forEach(key => 
                formData.append(key, jobPostData[key])
            );
            
            // let formEntries = Array.from(formData.entries());
            // console.log("formEntries " , formEntries); 

            const jobData = await postJob(formData).unwrap();
            if (!jobData) return;

            navigate('/client-office/manage-jobs', 
            { 
                replace: true,
                state: {name: 'ManageJobs', page: 'ManageJobs'} 
            },
            );
            //console.log('navigate');
            
        } catch (error) {
            console.error(error);
        }
    };

    return <div className="row">

        {/*encType="multipart/form-data"*/}
        <form onSubmit={handleSubmit(onSubmit)} method="post" id="postJobForm">
            <div className="col-xl-12">
                <div className="dashboard-box margin-top-0">
    
                    {/* <!-- Headline --> */}
                    <div className="headline">
                        <h3><i className="icon-feather-folder-plus"></i> {t('JobSubmissionForm')}</h3>
                    </div>
    
                    <div className="content with-padding padding-bottom-10">
                        <div className="row">
    
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>{t('WhatSpecialistDoYouNeed')}</h5>
                                    <CategorySelect setCategoryFK={setCategoryFK} />
                                </div>
                            </div>
    
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>{t('Location')}</h5>
                                    <LocationsAutocomplete setCenter={setJobLocation} />
                                </div>
                            </div>
                            
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>{t('DateAndTime')}</h5>
                                    <input style={INPUTS_SHADOW_STYLES}
                                    name="jobDateTime"
                                    {...register('jobDateTime', { required: true })}
                                    type={'datetime-local'} />
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>{t('MinPayment')}</h5>
                                    <input style={INPUTS_SHADOW_STYLES}
                                    name="minPayment" 
                                    value={minP}
                                    onChange={e => setMinP(e.target.value)} 
                                    //{...register('minPayment', { required: true })}
                                     type="text" placeholder="100"
                                     autoComplete="off" />
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>{t('MaxPayment')}</h5>
                                    <input style={INPUTS_SHADOW_STYLES}
                                    name="maxPayment" 
                                    value={maxP}
                                    onChange={e => setMaxP(e.target.value)} 
                                    //{...register('maxPayment', { required: true })}
                                    type="text" placeholder="1000"
                                    autoComplete="off" />
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>{t('Currency')}</h5>
                                    <CurrencySelect setCurrencyFK={setCurrencyFK} />
                                </div>
                            </div>

                            <div className="col-xl-12">
                                <div className="submit-field">
                                    <h5>{t('JobDescription')}</h5>
                                    <textarea style={INPUTS_SHADOW_STYLES}
                                    name="description"
                                    {...register('description')}
                                     cols="30" rows="5" className="with-border"></textarea>
                                     
                                    {
                                        !watch('photos') || watch('photos').length === 0
                                            ? <div className="uploadButton margin-top-30">
                                                <input name="photos"
                                                    {...register('photos')}
                                                    className="uploadButton-input" type="file" accept="image/*" id="upload" multiple />
                                                <label className="uploadButton-button ripple-effect" htmlFor="upload">{t('UploadPhotos')}</label>
                                                <span className="uploadButton-file-name">
                                                    {
                                                        errors.photos
                                                            ? errors.photos.message
                                                            : t('ImagesThatMightBeHelpfulInDescribingYourJob')
                                                    }
                                                </span>
                                            </div>
                                            : <div className="numbered color margin-top-28">
                                                 <ol>
                                                    {
                                                        Array.from(watch('photos'))?.map(p => <li>{p.name}</li>)
                                                    }
                                                    {/* <strong>{watch('photos')[0].name}</strong> */}
                                                </ol>
                                            </div>
                                    }
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="col-xl-12">
                <button type="submit" 
                form="postJobForm"
                onClick={() => console.log('click')}
                 className="button ripple-effect big margin-top-30"><i className="icon-feather-plus"></i> {t('PostAJob')}</button>
            </div>
        </form>


        <NotificationDialog type="warning" open={isOpen} onClose={() => setIsOpen(false)}>
            {t(notificationText)}
        </NotificationDialog>
    </div>
;
}

export default JobPosting;