import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApplyJobMutation } from '../../../features/master/masterApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './../../../features/auth/authSlice';
import { useTranslation } from 'react-i18next';
import { INPUTS_SHADOW_STYLES } from '../../../amimations/selectDetails';
import CurrencySelect from './../../Office/ClientOffice/JobPosting/CurrencySelect';
import NotificationDialog from '../../HeaderContainer/Popup/NotificationDialog';

const ApplyJobForm = ({ jobId, onClose }) => {
    const { t } = useTranslation();
    const user = useSelector(selectCurrentUser);
    const { register, handleSubmit } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    const [proposedPayment, setProposedPayment] = useState(100);
    const [currencyFK, setCurrencyFK] = useState(1);
    const [applyJob] = useApplyJobMutation();

    useEffect(() => {
        console.log(user?.id);
    }, []);

    useEffect(() => {
        if (proposedPayment < 0 || proposedPayment.toString().indexOf('-') !== -1) {
            setProposedPayment(0);
            setNotificationText('NotValidPaymentData');
            setIsOpen(true);
        }
    }, [proposedPayment]);
    useEffect(() => console.log(currencyFK), [currencyFK]);

    const onSubmit = async (data) => {
        try {
            if (isNaN(proposedPayment) || proposedPayment <= 0 || !proposedPayment) {
                setProposedPayment(1);
                setNotificationText('NotValidPaymentData');
                setIsOpen(true);
                return;
            }

            const applyJobData = {
                proposedPayment,
                currencyFK,
                suggestedLeadTime: data.suggestedLeadTime,
                masterId: user.id
            };
            console.log(applyJobData);

            const res = await applyJob({ jobId, applyJobData }).unwrap();
            if (!res) throw new Error('Res is undefined');
            console.log(res);
            
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return <div className="popup-tabs-container">
    <div className="popup-tab-content">
        <form onSubmit={handleSubmit(onSubmit)} id="apply-form"> 
            {/* <div className="submit-field">
                <h5>{t('ProposedPayment')}</h5>
                <div className="input-with-icon">
                    <input name='proposedPayment' className="with-border" 
                    {...register('proposedPayment', { required: true })}
                    type="number" placeholder="100" required />
                    <i className="currency">USD</i>
                </div>
            </div> */}

            <div className='content with-padding padding-bottom-10'>
                <div className='row'>
                    <div className="col-xl-6">
                        <div className="submit-field">
                            <h5>{t('ProposedPayment')}</h5>
                            <input style={INPUTS_SHADOW_STYLES}
                            name="proposedPayment" 
                            value={proposedPayment}
                            onChange={e => setProposedPayment(e.target.value)}
                            type="number" placeholder="100"
                            autoComplete="off" required />
                        </div>
                    </div>
        
                    <div className="col-xl-6">
                        <div className="submit-field">
                            <h5>{t('Currency')}</h5>
                            <CurrencySelect setCurrencyFK={setCurrencyFK} />
                        </div>
                    </div>
                </div>
            </div>
        

            <div className="submit-field">
                <h5>{t('SuggestedLeadTime')}</h5>
                <textarea name="suggestedLeadTime" required
                {...register('suggestedLeadTime', { required: true })}
                cols="10" rows="2" placeholder={`${t('ICanDoItIn')} ...`} className="with-border"></textarea>
            </div>
        </form>

        <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="apply-form">{t('RespondToTheApplication')} <i className="icon-material-outline-arrow-right-alt"></i></button>
        
        <NotificationDialog type="warning" open={isOpen} onClose={() => setIsOpen(false)}>
            {t(notificationText)}
        </NotificationDialog>
    </div>

</div>;
}

export default ApplyJobForm;