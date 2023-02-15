import React, { useEffect, useState } from 'react';
import { useGetUnverifiedMastersQuery } from '../../../features/admin/adminApiSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DocVerification = (props) => {
    const { t } = useTranslation();
    const { data: unverifiedMasters, isLoading } = useGetUnverifiedMastersQuery();

    useEffect(() => {
        if (!isLoading) {
            console.log(unverifiedMasters);
        }
    }, [isLoading]);


    return <table className="basic-table">

        <tbody>
            <tr>
                <th>{t("FirstName")}</th>
                <th>{t("LastName")}</th>
                <th>{t("Phone")}</th>
                <th>{t("Email")}</th>
                <th>{t("More")}</th>
            </tr>

            {!isLoading &&
                unverifiedMasters?.map(m =>
                    <tr key={m.id}>
                        <td data-label={t("First Name")}>{m.firstName}</td>
                        <td data-label={t("Last Name")}>{m.lastName}</td>
                        <td data-label={t("Phone")}>{m.phone}</td>
                        <td data-label={t("Email")}>{m.email}</td>
                        <td data-label={t("More")}>
                            <NavLink state={{ id: m.id, name: t('NewMaster'), page: t('Documents') }}
                            to={'/admin-panel/doc-verification/master-profile'}>
                                {t('Documents')}
                            </NavLink>
                        </td>
                    </tr>)
            }
        </tbody>
    </table>;
};

export default DocVerification;
