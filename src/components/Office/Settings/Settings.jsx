import React, { useEffect } from "react";
import $ from 'jquery';
import { avatarSwitcher } from "../../../amimations/amimations";
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAdmin, selectIsMaster } from "../../../features/auth/authSlice";
import PasswordChange from "./PasswordChange";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useChangeAvatarMutation } from "../../../features/user/userApiSlice";
import CategoriesList from "./CategoriesList";
import { useTranslation } from 'react-i18next';
import nationalities from "./nationalities";
import Select from 'react-select';

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

let Settings = (props) => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset, watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const isMaster = useSelector(selectIsMaster);
    const isAdmin = useSelector(selectIsAdmin);
    const { id, firstName, lastName, avatar, phone, email, isEmailVerified,
        masterInfo
    } = useSelector(selectCurrentUser);
    const { tagLine, description, location, nationality, categories } = masterInfo || {};
    //const location = useLocation();
    const [changeAvatar] = useChangeAvatarMutation();

    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;

    useEffect(() => {

        // Mobile Adjustment for Single Button Icon in Dashboard Box
        $('.buttons-to-right').each(function () {
            var btr = $(this).width();
            if (btr < 36) {
                $(this).addClass('single-right-button');
            }
        });

        avatarSwitcher();
    }, []);

    const onAvatarSubmit = async (data) => {
        try {
            let formData = new FormData();
            formData.append('userId', id);
            formData.append(data.avatarPhoto[0].name, data.avatarPhoto[0]);

            await changeAvatar(formData)
                .unwrap()
                .then(() => window.location.reload(true));
        } catch (error) {
            console.error(error);
        }
    };

    const changeNationality = selectedNationality => {
        console.log(selectedNationality);
    }

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
                                    <form onSubmit={handleSubmit(onAvatarSubmit)} method="put" id="avatarForm">
                                        <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                                            <img className="profile-pic" src={`${profilePhotosPath}${avatar}`} alt="" />
                                            <div className="upload-button" style={{ width: '100%' }}>
                                                <input name="avatarPhoto"
                                                    {...register('avatarPhoto')}
                                                    className="file-upload" type="file" accept="image/*" onChange={() => { }} />
                                            </div>

                                        </div>
                                        <button form="avatarForm" style={{ margin: 'auto', width: '100%' }} type="submit" className="button ripple-effect margin-bottom-20">
                                            {t("SaveNewAvatar")}
                                        </button>
                                    </form>
                                </div>

                                <div className="col">
                                    <div className="row">

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>{t("FirstName")}</h5>
                                                <input type="text" className="with-border" value={firstName} onChange={() => { }} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>{t("LastName")}</h5>
                                                <input type="text" className="with-border" value={lastName} onChange={() => { }} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>{t("AccountType")}</h5>
                                                <div className="account-type">
                                                    <div>
                                                        <input type="radio" name="account-type-radio" id="client-radio" className="account-type-radio" checked={!isMaster} onChange={() => { }} />
                                                        <label htmlFor="client-radio" className="ripple-effect-dark"><i className="icon-material-outline-account-circle"></i> {t("Client")}</label>
                                                    </div>

                                                    <div>
                                                        <input type="radio" name="account-type-radio" id="master-radio" className="account-type-radio" checked={isMaster} onChange={() => { }} />
                                                        <label htmlFor="master-radio" className="ripple-effect-dark"><i className="icon-material-outline-business-center"></i> {t("Master")}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>{t("Phone")}</h5>
                                                <input type="text" className="with-border" value={phone} onChange={() => { }} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>Email</h5>
                                                <input type="text" className="with-border" value={email} onChange={() => { }} />
                                            </div>

                                        </div>

                                        <span className="col-xl-6" style={{ paddingTop: '0' }}>

                                            {!!+isEmailVerified
                                                ? <div>
                                                    <i className="icon-feather-user-check margin-right-5"></i>
                                                    {t("Verified")}
                                                </div>
                                                // : <div>
                                                //     <i className="icon-feather-user-x margin-right-5"></i>
                                                //     Not verified
                                                // </div>}
                                                : <div className="submit-field">
                                                    <h5>{t("Verify")}</h5>
                                                    <button className="button ripple-effect" type="button">{t("Verify")}
                                                    </button>
                                                </div>}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {!!+isMaster
                    ? <div className="col-xl-12">
                        <div className="dashboard-box">
                            <div className="headline">
                                <h3><i className="icon-material-outline-assignment"></i> {t("MyDocuments")}</h3>
                            </div>

                            <div className="content with-padding padding-bottom-0">
                                <div className="row">
                                    <div className="uploadButton margin-bottom-20 col-xl-6">
                                        <input name="passport-register" id="upload" multiple
                                            className="uploadButton-input" type="file" accept="image/*, application/pdf" />
                                        <label className="uploadButton-button ripple-effect" htmlFor="upload">Passport</label>
                                        <span className="uploadButton-file-name">
                                            <i className="icon-feather-user-check margin-right-5"></i>
                                            {t("UploadPassportPhotos")}
                                        </span>
                                    </div>

                                    <div className="uploadButton margin-bottom-20 col-xl-6">
                                        <input name="itn-register" id="upload"
                                            className="uploadButton-input" type="file" accept="image/*, application/pdf" />
                                        <label className="uploadButton-button ripple-effect" htmlFor="upload">ITN</label>
                                        <span className="uploadButton-file-name">
                                            <i className="icon-material-outline-note-add margin-right-5"></i>
                                            {t('UploadAPhotoOfYourTaxIdentificationNumber')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
                }

                {isMaster && <div className="col-xl-12">
                    <div className="dashboard-box">

                        <div className="headline">
                            <h3><i className="icon-material-outline-face"></i> {t("MyProfile")}</h3>
                        </div>

                        <div className="content">
                            <ul className="fields-ul">
                                <li>
                                    <div className="row">

                                        <div className="col-xl-4">
                                            <div className="submit-field">
                                                <h5>{t("Categories")} <i className="help-icon" data-tippy-placement="right" title="Add up to 10 categories"></i></h5>

                                                <CategoriesList categories={categories} />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>{t('Tagline')}</h5>
                                                <input type="text" style={{ height: '60px'}} className="with-border" value={tagLine} onChange={() => { }} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>{t("Nationality")}</h5>
                                                {/* <select className="selectpicker with-border" defaultChecked={'UA'} data-size="7" title="Select Job Type" data-live-search="true">
                                                    
                                                </select> */}
                                                <Select
                                                    defaultValue={{ value: 'UA', label: 'Ukraine' }}
                                                    options={nationalities}
                                                    onChange={changeNationality}
                                                    styles={{}}
                                                 />
                                            </div>
                                        </div>

                                        <div className="col-xl-12">
                                            <div className="submit-field">
                                                <h5>{t('IntroduceYourself')}</h5>
                                                <textarea cols="30" rows="5" name="description" className="with-border" onChange={() => { }}
                                                    value={description}
                                                ></textarea>
                                            </div>
                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>}
            </>}

        {false && <PasswordChange />}

    </div>;
}

export default Settings;