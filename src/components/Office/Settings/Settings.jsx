import React, { useEffect, useState } from "react";
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { selectIsAdmin, selectIsMaster } from "../../../features/auth/authSlice";
import PasswordChange from "./PasswordChange";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useChangeAvatarMutation } from "../../../features/user/userApiSlice";
import { useTranslation } from 'react-i18next';
import { useGetFullMasterInfoQuery } from "../../../features/admin/adminApiSlice";
import EmailVerification from "./EmailVerification";
import Documents from "./MasterComponents/Documents";
import UploadDocuments from "./MasterComponents/UploadDocuments";
import ProfileSettings from "./MasterComponents/ProfileSettings";
import { setNewAvatar } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import LocationPermission from "./MasterComponents/LocationPermission";
import { useGetInfoQuery } from "../../../features/user/userApiSlice";

const schema = yup
    .object()
    .shape({
        // name: yup.string().required(),
        // age: yup.number().required(),
        avatarPhoto: yup.mixed()
            .test("fileSize", "File Size is too large", (value) => {
                return value.length && value[0].size <= 5242880;
            })
            .test("fileType", "Unsupported File Format", (value) => {
                return value.length && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
            })
    })
    .required();

let Settings = ({}) => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset, watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const isMaster = useSelector(selectIsMaster);
    const isAdmin = useSelector(selectIsAdmin);
    const { data: info } = useGetInfoQuery();
    const { id, firstName, lastName, avatar, phone, email, isEmailVerified,
        masterInfo
    } = info || {};
    const [avatarPhoto, setAvatarPhoto] = useState(avatar);
    const { data, isLoading } = useGetFullMasterInfoQuery(id);
    const { passportFirstSide, passportSecondSide, individual_tax_number } = data || {};
    const [documents, setDocuments] = useState([]);
    const { tagLine, description, categories } = masterInfo || {};
    //const location = useLocation();
    const [changeAvatar] = useChangeAvatarMutation();
    const dispatch = useDispatch();

    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;
    const mastersDocumentsPath = process.env.REACT_APP_MASTERS_DOCUMENTS_PATH;

    useEffect(() => {
        if (avatar) {
            setAvatarPhoto(avatar);
        }
    }, [avatar]);

    useEffect(() => {
        if (!isLoading && documents.length < 3) {      
            data.passportFirstSide && documents.push(`${mastersDocumentsPath}${passportFirstSide}`);
            data.passportSecondSide && documents.push(`${mastersDocumentsPath}${passportSecondSide}`);
            data.individual_tax_number && documents.push(`${mastersDocumentsPath}${individual_tax_number}`);
            setDocuments([...documents]);
        }
    }, [isLoading])

    useEffect(() => {

        // Mobile Adjustment for Single Button Icon in Dashboard Box
        $('.buttons-to-right').each(function () {
            var btr = $(this).width();
            if (btr < 36) {
                $(this).addClass('single-right-button');
            }
        });

        //avatarSwitcher();
    }, []);

    const onAvatarChange = async ({ target }) => {
        try {
            let formData = new FormData();
            formData.append('userId', id);

            formData.append(target.files[0].name, target.files[0]);

            const res = await changeAvatar(formData)
                .unwrap();

            dispatch(setNewAvatar(res.path));

            setAvatarPhoto(res.path);

            document.body.focus();

        } catch (error) {
            console.log(error);
        }
    };

    return <div className="row">

        {!isAdmin &&
            <>
                <div className="col-xl-12">
                    <div className="dashboard-box margin-top-0">

                        <div className="headline">
                            <h3><i className="icon-material-outline-account-circle"></i> {t('MyAccount')}</h3>
                        </div>

                        <div className="content with-padding padding-bottom-0">

                            <div className="row">

                                <div className="col-auto">

                                <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                                    <img className="profile-pic" src={`${profilePhotosPath}${avatarPhoto}?`+ new Date().getTime()} alt="" />
                                    <div className="upload-button">
                                        <input name="avatarPhoto"
                                            {...register('avatarPhoto')}
                                            className="file-upload" type="file" accept="image/*" onChange={onAvatarChange} />
                                    </div>

                                </div>
                                </div>

                                <div className="col">
                                    <div className="row">

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>{t("FirstName")}</h5>
                                                <input readOnly type="text" className="with-border" value={firstName} onChange={() => { }} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>{t("LastName")}</h5>
                                                <input readOnly type="text" className="with-border" value={lastName} onChange={() => { }} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>{t("AccountType")}</h5>
                                                <div className="account-type">
                                                {!isMaster
                                                    ? <div>
                                                        <input readOnly type="radio" name="account-type-radio" id="client-radio" className="account-type-radio" checked={!isMaster} onChange={() => { }} />
                                                        <label htmlFor="client-radio" className="ripple-effect-dark"><i className="icon-material-outline-account-circle"></i> {t("Client")}</label>
                                                    </div>

                                                    : <div>
                                                        <input readOnly type="radio" name="account-type-radio" id="master-radio" className="account-type-radio" checked={isMaster} onChange={() => { }} />
                                                        <label htmlFor="master-radio" className="ripple-effect-dark"><i className="icon-material-outline-business-center"></i> {t("Master")}</label>
                                                    </div>
                                                }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>{t("Phone")}</h5>
                                                <input readOnly type="text" className="with-border" value={phone} onChange={() => { }} />
                                            </div>
                                        </div>

                                        {!!+isEmailVerified 
                                            ? <div className="col-xl-6">
                                                <div className="submit-field">
                                                    <h5>Email</h5>
                                                    <input readOnly type="text" className="with-border" value={email} onChange={() => { }} />
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {!(!!+isEmailVerified)
                    ? <EmailVerification email={email} />
                    : null
                }

                {!!+isMaster
                    ? <>
                    
                        {/* {true
                            ? <LocationPermission />
                            : null
                        } */}

                        <div className="col-xl-12">
                            <div className="dashboard-box" style={{ boxShadow: documents.length === 0 ? '0 2px 8px rgba(255,0,0,0.2)' : '' }}>
                                <div className="headline" style={{ borderBottomColor: documents.length === 0 ? 'rgba(255,0,0,0.2)' : '' }}>
                                    <h3><i style={{ color: documents.length === 0 ? 'red' : '' }} className="icon-material-outline-assignment"></i> {t("MyDocuments")}</h3>
                                </div>

                                <div className="content with-padding">
                                    <div className="row">
                                        {!isLoading && documents.length > 0
                                            ? <Documents documents={documents} />
                                            : <UploadDocuments setDocuments={setDocuments} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ProfileSettings categories={categories} tagLine={tagLine} description={description} />

                    </>
                    : null}
            </>}

        {false && <PasswordChange />}
    </div>;
}

export default Settings;