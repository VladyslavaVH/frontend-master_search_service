import React, { useEffect, useState } from 'react';
import { useGetUnverifiedMastersQuery } from '../../../features/admin/adminApiSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const DocVerification = (props) => {
    const { data: unverifiedMasters, isLoading } = useGetUnverifiedMastersQuery();

    useEffect(() => {
        if (!isLoading) {
            console.log(unverifiedMasters);
        }
    }, [isLoading]);


    return <table className="basic-table">

        <tbody>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>More</th>
            </tr>

            {!isLoading &&
                unverifiedMasters?.map(m =>
                    <tr key={m.id}>
                        <td data-label="First Name">{m.firstName}</td>
                        <td data-label="Last Name">{m.lastName}</td>
                        <td data-label="Phone">{m.phone}</td>
                        <td data-label="Email">{m.email}</td>
                        <td data-label="More">
                            <NavLink state={{ id: m.id, name: 'New Master', page: 'Documents' }}
                            to={'/admin-panel/doc-verification/master-profile'}>
                                Documents
                            </NavLink>
                        </td>
                    </tr>)
            }
        </tbody>
    </table>;
};

export default DocVerification;
