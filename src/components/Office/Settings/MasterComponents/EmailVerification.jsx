import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EmailVerification = ({ email }) => {
    const { t } = useTranslation();
    return <div className="col-xl-12">
        <div className="dashboard-box">
            <div className="headline">
                <h3><i className="icon-feather-user-check"></i> {t("Verification")}</h3>
            </div>

            <div className="content with-padding padding-bottom-0">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="submit-field">
                            <h5>Email</h5>
                            <input type="text" className="with-border" value={email} onChange={() => { }} />
                        </div>

                    </div>

                    <span className="col-xl-6" style={{ paddingTop: '0' }}>
                        <div className="submit-field">
                            <h5>{t("Unverified email")}</h5>
                            <button className="button ripple-effect" type="button">{t("Verify")}
                            </button>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>;
}

export default EmailVerification;
