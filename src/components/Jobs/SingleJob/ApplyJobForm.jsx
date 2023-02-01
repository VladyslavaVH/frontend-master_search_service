import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useApplyJobMutation } from '../../../features/master/masterApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './../../../features/auth/authSlice';

const ApplyJobForm = ({ jobId, onClose }) => {
    const user = useSelector(selectCurrentUser);
    const { register, handleSubmit } = useForm();
    const [applyJob] = useApplyJobMutation();

    useEffect(() => {
        console.log(user?.id);
    }, []);

    const onSubmit = async (data) => {
        try {
            const applyJobData = {
                ...data,
                masterId: user.id
            };
            console.log(applyJobData);

            const res = await applyJob({ jobId, applyJobData }).unwrap();
            if (!res) throw new Error('Res is undefined');
            console.log(res);
            
            window.location.reload(true);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return <div className="popup-tabs-container">
    <div className="popup-tab-content">
        <form onSubmit={handleSubmit(onSubmit)} id="apply-form"> 
            <div className="submit-field">
                <h5>Proposed Payment</h5>
                <div className="input-with-icon">
                    <input name='proposedPayment' className="with-border" 
                    {...register('proposedPayment', { required: true })}
                    type="number" placeholder="100" required />
                    <i className="currency">USD</i>
                </div>
            </div>
        

            <div className="submit-field">
                <h5>Suggested Lead Time</h5>
                <textarea name="suggestedLeadTime" required
                {...register('suggestedLeadTime', { required: true })}
                cols="10" rows="2" placeholder="I will manage for ..." className="with-border"></textarea>
            </div>
        </form>

        <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="apply-form">Apply for a Job <i className="icon-material-outline-arrow-right-alt"></i></button>

    </div>

</div>;
}

export default ApplyJobForm;