import React from "react";
import { useForm } from "react-hook-form";

const PasswordChange = (props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return <form onSubmit={ handleSubmit(onSubmit) } id="passwordChangeForm" className="col-xl-12">
        
        <div id="test1" className="dashboard-box">

                <div className="headline">
                    <h3><i className="icon-material-outline-lock"></i> Password & Security</h3>
                </div>

                <div className="content with-padding">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="submit-field">
                                <h5>Current Password</h5>
                                <input name="currentPassword"
                                    {...register('currentPassword', { required: true })}
                                    type="password" className="with-border" onChange={() => { }} />
                            </div>
                        </div>

                        <div className="col-xl-4">
                            <div className="submit-field">
                                <h5>New Password</h5>
                                <input name="newPassword"
                                    {...register('newPassword', { required: true })}
                                    type="password" className="with-border" onChange={() => { }} />
                            </div>
                        </div>

                        <div className="col-xl-4">
                            <div className="submit-field">
                                <h5>Repeat New Password</h5>
                                <input name="repeatNewPassword"
                                    {...register('repeatNewPassword', { required: true })}
                                    type="password" className="with-border" onChange={() => { }} />
                            </div>
                        </div>

                        {/* <div className="col-xl-12">
                        <div className="checkbox">
                            <input type="checkbox" name="twoStep"
                            id="two-step" checked onChange={() => console.log('change')} />
                            <label htmlFor="two-step"><span className="checkbox-icon"></span> Enable Two-Step Verification via Email</label>
                        </div>
                    </div> */}
                    </div>
                    
                    <button type="summit" form="passwordChangeForm" className="button ripple-effect big margin-15 ">Change Password</button>
                </div>
        </div>
        
       
    </form>;
}

export default PasswordChange;
