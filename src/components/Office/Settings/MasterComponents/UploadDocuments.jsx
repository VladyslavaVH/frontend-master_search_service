import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {  yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object()
  .shape({
      // name: yup.string().required(),
      // age: yup.number().required(),
    //   passportPhotos: yup.mixed()
    //       .test("fileSize", "File Size is too large", (value) => {
    //           return value.length && value[0].size <= 5242880;
    //       })
    //       .test("fileType", "Unsupported File Format", (value) => {
    //           return value.length && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
    //       }),
    //   itnPhoto: yup.mixed()
    //       .test("fileSize", "File Size is too large", (value) => {
    //           return value.length && value[0].size <= 5242880;
    //       })
    //       .test("fileType", "Unsupported File Format", (value) => {
    //           return value.length && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
    //       }),
    
  })
  .required();

const UploadDocuments = ({ id }) => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset, watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const mastersDocumentsPath = process.env.REACT_APP_MASTERS_DOCUMENTS_PATH;

    const onSubmit = async data => {
        try {
            let formData = new FormData();
            Object.keys(data?.passportPhotos).forEach(key => 
                formData.append(data?.passportPhotos?.item(key).name, data?.passportPhotos?.item(key))
            );
            
            Object.keys(data?.itnPhoto).forEach(key => 
                formData.append(data?.itnPhoto?.item(key).name, data?.itnPhoto?.item(key))
            );

            let formEntries = Array.from(formData.entries());
            console.log("formEntries " , formEntries); 
        } catch (error) {
            console.error(error);
        }
    };

    return <div className='row'>
        <form onSubmit={handleSubmit(onSubmit)} method="post" id="uploadDocForm">
        {/* <div className="uploadButton margin-bottom-20 col-xl-6">
                <input {...register('passportPhotos')}
                    name="passportPhotos" id="upload" multiple
                    className="uploadButton-input" type="file" accept="image/*, application/pdf" />
                <label className="uploadButton-button ripple-effect" htmlFor="upload">{t("Documents")}</label>
                <span className="uploadButton-file-name">
                    <i className="icon-feather-user-check margin-right-5"></i>
                    {
                        errors.passportPhotos
                        ? errors.passportPhotos.messages
                        : !watch('passportPhotos') || watch('passportPhotos').length === 0 
                            ? t("Upload Documents Photos")
                            : <>{watch('passportPhotos')[0]?.name}, {watch('passportPhotos')[1]?.name}, {watch('passportPhotos')[2]?.name}</>
                    }
                </span>
            </div> */}
            <div className="uploadButton margin-bottom-20 col-xl-6">
                <input {...register('passportPhotos')}
                    name="passportPhotos" id="upload" multiple
                    className="uploadButton-input" type="file" accept="image/*, application/pdf" />
                <label className="uploadButton-button ripple-effect" htmlFor="upload">{t("Passport")}</label>
                <span className="uploadButton-file-name">
                    <i className="icon-feather-user-check margin-right-5"></i>
                    {
                        errors.passportPhotos
                        ? errors.passportPhotos.messages
                        : !watch('passportPhotos') || watch('passportPhotos').length === 0 
                            ? t("UploadPassportPhotos")
                            : <>{watch('passportPhotos')[0]?.name}, {watch('passportPhotos')[1]?.name}</>
                    }
                </span>
            </div>
    
            <div className="uploadButton margin-bottom-20 col-xl-6">
                <input {...register('itnPhoto')}
                    name="itnPhoto" id="upload"
                    className="uploadButton-input" type="file" accept="image/*, application/pdf" />
                <label className="uploadButton-button ripple-effect" htmlFor="upload">ITN</label>
                <span className="uploadButton-file-name">
                    <i className="icon-material-outline-note-add margin-right-5"></i>
                    {
                        errors.itnPhoto
                        ? errors.itnPhoto.messages
                        : !watch('itnPhoto') || watch('itnPhoto').length === 0
                            ? t('UploadAPhotoOfYourTaxIdentificationNumber')
                            : <>{watch('itnPhoto').name}</>
                    }
                </span>
            </div> 
    
            <div className="col-xl-4 margin-bottom-15">
                <div className='submit-field"'>
                    <button className='button big ripple-effect' 
                    type='submit'
                    form='uploadDocForm'
                    >{t("Upload")}</button>
                </div >
            </div>
        </form >
    </div>;
};

export default UploadDocuments;
