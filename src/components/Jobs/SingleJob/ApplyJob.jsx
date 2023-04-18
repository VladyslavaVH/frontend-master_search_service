import React from 'react';
import Modal from '../../HeaderContainer/Popup/Modal';
import ApplyJobForm from './ApplyJobForm';

const ApplyJob = ({ jobId, open, onClose }) => {
    return <Modal open={open} onClose={onClose} tabs={['RespondToTheApplication']}>
        <ApplyJobForm jobId={jobId} onClose={onClose} />
    </Modal>;
}

export default ApplyJob;