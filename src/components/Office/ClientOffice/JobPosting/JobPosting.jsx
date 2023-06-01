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
import { INPUTS_SHADOW_STYLES } from "../../../../animations/selectDetails";
import { isValidFile, imageFormats } from "../../../../utils/fileValidationFunctions";

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

let JobPosting = ({ isMapApiLoaded }) => {
    const { t } = useTranslation();
    const [notificationText, setNotificationText] = useState('');
    const [minP, setMinP] = useState(100);
    const [maxP, setMaxP] = useState(1000);
    const [jobDateTime, setJobDateTime] = useState(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const photosArray = watch('photos');
    useEffect(() => {
        if (photosArray?.length > 0) {
            for (const f of photosArray) {
                const { isValid, error } = isValidFile(f);
    
                if (!isValid) {
                    setNotificationText(error);
                    !isOpen && setIsOpen(true);
                    reset();
                }
            }
        }
    }, [photosArray]);

    useEffect(() => {
        let minTmp = minP == '-0' ? 0 : parseFloat(minP);
        let maxTmp = maxP == '-0' ? 0 :  parseFloat(maxP);
        if (minTmp < 0) {
            minTmp = 0;
        }

        if (maxTmp < 0) {
            maxTmp = 0;
        }

        if (minTmp && maxTmp) {
            if (minTmp >= maxTmp) {
                minTmp = maxTmp - 1;
            } 
            
            if (minTmp < 0) {
                minTmp = 0;        
            } 
            
            if (maxTmp <= 0) {
                maxTmp = minTmp + 1;
            }
        }

        if (minTmp === maxTmp) {
            maxTmp++;
        }

        setMinP(minTmp);
        setMaxP(maxTmp);
    }, [minP, maxP])
    
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [postJob] = usePostJobMutation();

    const [categoryFK, setCategoryFK] = useState(1);
    const [jobLocation, setJobLocation] = useState({});
    const [currencyFK, setCurrencyFK] = useState(1);

    const onSubmit = async data => {
        try {
            if (minP == 0 || !minP || !maxP || maxP == 0 || (minP >= maxP) || isNaN(minP) || isNaN(maxP)) {
                setNotificationText('NotValidPaymentData');
                setIsOpen(true);
                return;
            }

            if (!jobDateTime) {
                setNotificationText('EmptyJobDateTime');
                setIsOpen(true);
                return;
            }

            let formData = new FormData();
            if (data.photos) {
                Object.keys(data.photos).forEach(key => 
                    formData.append(data?.photos?.item(key).name, data?.photos?.item(key))
                );
            }

            let jobPostData = {
                clientFK: user.id,
                ...data,
                categoryFK,
                minPayment: minP,
                maxPayment: maxP,
                currencyFK,
                jobDateTime,
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
                                    {isMapApiLoaded && <LocationsAutocomplete  setCenter={setJobLocation} />}
                                </div>
                            </div>
                            
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>{t('DateAndTime')}</h5>
                                    <input style={INPUTS_SHADOW_STYLES}
                                    name="jobDateTime"
                                    value={jobDateTime}
                                    onChange={e => setJobDateTime(e.target.value)}
                                    //{...register('jobDateTime', { required: true })}
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
                                    type="number"
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
                                    type="number"
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
                                     
                                     <p className="margin-top-30" title="explanation" style={{ cursor: 'pointer' }} >
                                        <i className="icon-feather-info"></i>
                                        &nbsp;{t('ImageLoadingCondition')}&nbsp; 
                                        <i>{imageFormats?.map((f, i) => <>{f}{i != imageFormats.length - 1 ? ',' : '.'}&nbsp;</>)}</i>
                                    </p>

                                    {
                                        !watch('photos') || watch('photos').length === 0
                                            ? <div className="uploadButton">
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
                                            : <div className="numbered color margin-top-28" style={{ display: 'flex', flexDirection: 'column' }}>
                                                <ol>
                                                    {
                                                        Array.from(watch('photos'))?.map(p => <li>{p.name}</li>)
                                                    }
                                                </ol>
                                                <button className='button big gray gray-ripple-effect' 
                                                type='button'
                                                onClick={() => reset()}
                                                style={{ width: 'max-content' }}
                                                >{t("ResetAllImages")}</button>
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