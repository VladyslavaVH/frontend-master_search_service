import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import $ from 'jquery';
import { avatarSwitcher } from "../../../amimations/amimations";
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAdmin, selectIsMaster } from "../../../features/auth/authSlice";
import PasswordChange from "./PasswordChange";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {  yupResolver } from '@hookform/resolvers/yup';
import { useChangeAvatarMutation } from "../../../features/auth/authApiSlice";

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
    const { register, handleSubmit, reset, watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const isMaster = useSelector(selectIsMaster);
    const isAdmin = useSelector(selectIsAdmin);
    const { id, firstName, lastName, avatar, phone, email, isEmailVerified } = useSelector(selectCurrentUser);
    const location = useLocation();
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

    return <div className="row">

        {!isAdmin &&
            <>
                <div className="col-xl-12">
                    <div className="dashboard-box margin-top-0">

                        <div className="headline">
                            <h3><i className="icon-material-outline-account-circle"></i> My Account</h3>
                        </div>

                        <div className="content with-padding padding-bottom-0">

                            <div className="row">

                                <div className="col-auto">
                                    <form onSubmit={handleSubmit(onAvatarSubmit)} method="put" id="avatarForm">
                                        <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                                            <img className="profile-pic" src={`${profilePhotosPath}${avatar}`} alt="" />
                                            <div className="upload-button" style={{width: '100%'}}>
                                                <input name="avatarPhoto"
                                                {...register('avatarPhoto')}
                                                className="file-upload" type="file" accept="image/*" onChange={() => { }} />
                                            </div>
    
                                        </div>
                                        <button form="avatarForm" style={{ margin: 'auto', width: '100%' }} type="submit" className="button ripple-effect margin-bottom-20">
                                            Save New Avatar
                                        </button>
                                    </form>
                                </div>

                                <div className="col">
                                    <div className="row">
                                        
                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>First Name</h5>
                                                <input type="text" className="with-border" value={firstName} onChange={() => { }} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>Last Name</h5>
                                                <input type="text" className="with-border" value={lastName} onChange={() => { }} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>Account Type</h5>
                                                <div className="account-type">
                                                    <div>
                                                        <input type="radio" name="account-type-radio" id="client-radio" className="account-type-radio" checked={!isMaster} onChange={() => { }} />
                                                        <label htmlFor="client-radio" className="ripple-effect-dark"><i className="icon-material-outline-account-circle"></i> Client</label>
                                                    </div>

                                                    <div>
                                                        <input type="radio" name="account-type-radio" id="master-radio" className="account-type-radio" checked={isMaster} onChange={() => { }} />
                                                        <label htmlFor="master-radio" className="ripple-effect-dark"><i className="icon-material-outline-business-center"></i> Master</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>Phone</h5>
                                                <input type="text" className="with-border" value={phone} onChange={() => { }} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>Email</h5>
                                                <input type="text" className="with-border" value={email} onChange={() => { }} />
                                            </div>

                                        </div>

                                        <span className="col-xl-6" style={{ paddingTop: '50px' }}>
                                            
                                            {!!+isEmailVerified
                                                ? <div>
                                                    <i className="icon-feather-user-check margin-right-5"></i>
                                                    Verified
                                                </div>
                                                : <div>
                                                    <i className="icon-feather-user-x margin-right-5"></i>
                                                    Not verified
                                                </div>}
                                        </span>

                                        {!!+isMaster 
                                        ? <>
                                                <div className="uploadButton margin-bottom-20 col-xl-6">
                                                    <input name="passport-register" id="upload" multiple
                                                        className="uploadButton-input" type="file" accept="image/*, application/pdf" />
                                                    <label className="uploadButton-button ripple-effect" htmlFor="upload">Passport</label>
                                                    <span className="uploadButton-file-name">
                                                        <i className="icon-feather-user-check margin-right-5"></i>
                                                        Choose a passport photo
                                                    </span>
                                                </div>

                                                <div className="uploadButton margin-bottom-20 col-xl-6">
                                                    <input name="itn-register" id="upload"
                                                        className="uploadButton-input" type="file" accept="image/*, application/pdf" />
                                                    <label className="uploadButton-button ripple-effect" htmlFor="upload">ITN</label>
                                                    <span className="uploadButton-file-name">
                                                        <i className="icon-material-outline-note-add margin-right-5"></i>
                                                        Choose an identical tax number
                                                    </span>
                                                </div>

                                        </>
                                        : null}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {isMaster && <div className="col-xl-12">
                    <div className="dashboard-box">

                        <div className="headline">
                            <h3><i className="icon-material-outline-face"></i> My Profile</h3>
                        </div>

                        <div className="content">
                            <ul className="fields-ul">
                                <li>
                                    <div className="row">

                                        <div className="col-xl-4">
                                            <div className="submit-field">
                                                <h5>Categories <i className="help-icon" data-tippy-placement="right" title="Add up to 10 skills"></i></h5>

                                                {/* <!-- Categories List --> */}
                                                <div className="keywords-container">
                                                    <div className="keyword-input-container">
                                                        <input type="text" className="keyword-input with-border" placeholder="e.g. Angular, Laravel" onChange={() => { }} />
                                                        <button className="keyword-input-button ripple-effect"><i className="icon-material-outline-add"></i></button>
                                                    </div>
                                                    <div className="keywords-list" style={{ width: '100%', height: 'max-content' }}>
                                                        <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Angular</span></span>
                                                        <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Vue JS</span></span>
                                                        <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">iOS</span></span>
                                                        <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Android</span></span>
                                                        <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Laravel</span></span>
                                                        <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Angular</span></span>
                                                        <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Vue JS</span></span>
                                                        <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">iOS</span></span>
                                                        <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Android</span></span>
                                                        <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Laravel</span></span>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>Tagline</h5>
                                                <input type="text" className="with-border" value="iOS Expert + Node Dev" onChange={() => { }} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>Nationality</h5>
                                                <select className="selectpicker with-border" defaultChecked={'United States'} data-size="7" title="Select Job Type" data-live-search="true">
                                                    <option value="AR">Argentina</option>
                                                    <option value="AM">Armenia</option>
                                                    <option value="AW">Aruba</option>
                                                    <option value="AU">Australia</option>
                                                    <option value="AT">Austria</option>
                                                    <option value="AZ">Azerbaijan</option>
                                                    <option value="BS">Bahamas</option>
                                                    <option value="BH">Bahrain</option>
                                                    <option value="BD">Bangladesh</option>
                                                    <option value="BB">Barbados</option>
                                                    <option value="BY">Belarus</option>
                                                    <option value="BE">Belgium</option>
                                                    <option value="BZ">Belize</option>
                                                    <option value="BJ">Benin</option>
                                                    <option value="BM">Bermuda</option>
                                                    <option value="BT">Bhutan</option>
                                                    <option value="BG">Bulgaria</option>
                                                    <option value="BF">Burkina Faso</option>
                                                    <option value="BI">Burundi</option>
                                                    <option value="KH">Cambodia</option>
                                                    <option value="CM">Cameroon</option>
                                                    <option value="CA">Canada</option>
                                                    <option value="CV">Cape Verde</option>
                                                    <option value="KY">Cayman Islands</option>
                                                    <option value="CO">Colombia</option>
                                                    <option value="KM">Comoros</option>
                                                    <option value="CG">Congo</option>
                                                    <option value="CK">Cook Islands</option>
                                                    <option value="CR">Costa Rica</option>
                                                    <option value="CI">Côte d'Ivoire</option>
                                                    <option value="HR">Croatia</option>
                                                    <option value="CU">Cuba</option>
                                                    <option value="CW">Curaçao</option>
                                                    <option value="CY">Cyprus</option>
                                                    <option value="CZ">Czech Republic</option>
                                                    <option value="DK">Denmark</option>
                                                    <option value="DJ">Djibouti</option>
                                                    <option value="DM">Dominica</option>
                                                    <option value="DO">Dominican Republic</option>
                                                    <option value="EC">Ecuador</option>
                                                    <option value="EG">Egypt</option>
                                                    <option value="GP">Guadeloupe</option>
                                                    <option value="GU">Guam</option>
                                                    <option value="GT">Guatemala</option>
                                                    <option value="GG">Guernsey</option>
                                                    <option value="GN">Guinea</option>
                                                    <option value="GW">Guinea-Bissau</option>
                                                    <option value="GY">Guyana</option>
                                                    <option value="HT">Haiti</option>
                                                    <option value="HN">Honduras</option>
                                                    <option value="HK">Hong Kong</option>
                                                    <option value="HU">Hungary</option>
                                                    <option value="IS">Iceland</option>
                                                    <option value="IN">India</option>
                                                    <option value="ID">Indonesia</option>
                                                    <option value="NO">Norway</option>
                                                    <option value="OM">Oman</option>
                                                    <option value="PK">Pakistan</option>
                                                    <option value="PW">Palau</option>
                                                    <option value="PA">Panama</option>
                                                    <option value="PG">Papua New Guinea</option>
                                                    <option value="PY">Paraguay</option>
                                                    <option value="PE">Peru</option>
                                                    <option value="PH">Philippines</option>
                                                    <option value="PN">Pitcairn</option>
                                                    <option value="PL">Poland</option>
                                                    <option value="PT">Portugal</option>
                                                    <option value="PR">Puerto Rico</option>
                                                    <option value="QA">Qatar</option>
                                                    <option value="RE">Réunion</option>
                                                    <option value="RO">Romania</option>
                                                    <option value="RW">Rwanda</option>
                                                    <option value="SZ">Swaziland</option>
                                                    <option value="SE">Sweden</option>
                                                    <option value="CH">Switzerland</option>
                                                    <option value="TR">Turkey</option>
                                                    <option value="TM">Turkmenistan</option>
                                                    <option value="TV">Tuvalu</option>
                                                    <option value="UG">Uganda</option>
                                                    <option value="UA">Ukraine</option>
                                                    <option value="GB">United Kingdom</option>
                                                    <option value="US">United States</option>
                                                    <option value="UY">Uruguay</option>
                                                    <option value="UZ">Uzbekistan</option>
                                                    <option value="YE">Yemen</option>
                                                    <option value="ZM">Zambia</option>
                                                    <option value="ZW">Zimbabwe</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-xl-12">
                                            <div className="submit-field">
                                                <h5>Introduce Yourself</h5>
                                                <textarea cols="30" rows="5" name="description" className="with-border" onChange={() => { }}
                                                    value={'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.'}
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