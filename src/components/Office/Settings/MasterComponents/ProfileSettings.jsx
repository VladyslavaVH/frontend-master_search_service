import React, { useEffect, useState } from 'react';
import CategoriesList from './../CategoriesList';
import { useTranslation } from 'react-i18next';
import { useChangeProfileSettingsMutation } from '../../../../features/master/masterApiSlice';
import Modal from './../../../HeaderContainer/Popup/Modal';
import Success from '../Success';

const ProfileSettings = ({ categories, tagLine, description }) => {
    const { t } = useTranslation();
    const [changeProfileSettings] = useChangeProfileSettingsMutation();
    const [masterCategories, setMasterCategories] = useState(categories);
    const [newTagLine, setNewTagLine] = useState(tagLine);
    const [newDescription, setNewDescription] = useState(description);
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const result = await changeProfileSettings({ masterCategories, newTagLine, newDescription }).unwrap();

            if (!result) throw new Error('Could not change profile settings');

            setIsOpen(true);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    return <div className="col-xl-12">
        <div className="dashboard-box">

            <div className="headline">
                <h3><i className="icon-material-outline-face"></i> {t("MyProfile")}</h3>
            </div>

            <div className="content">
                <form onSubmit={onSubmit}>
                    <ul className="fields-ul">
                        <li>
                            <div className="row">
    
                                <div className="col-xl-4">
                                    <div className="submit-field">
                                        <h5>{t("Categories")} {false && <i className="help-icon" data-tippy-placement="right" title="Add up to 10 categories"></i>}</h5>
    
                                        <CategoriesList setMasterCategories={setMasterCategories} categories={categories} />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="submit-field">
                                        <h5>{t('Tagline')}</h5>
                                        <input type="text" className="" value={newTagLine} onChange={e => setNewTagLine(e.target.value)} />
                                    </div>
                                </div>
    
                                <div className="col-xl-12">
                                    <div className="submit-field">
                                        <h5>{t('IntroduceYourself')}</h5>
                                        <textarea cols="30" rows="5" name="description" className="with-border" onChange={e => setNewDescription(e.target.value)}
                                            value={newDescription}
                                        ></textarea>
                                    </div>
                                </div>
    
                            </div>
                        </li>
    
                        <li>
                            <div className="row">
                                <div className="col-xl-4">
                                    <button type='submit' className='button ripple-effect margin-bottom-20'>{t("SaveProfileChanges")}</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </form>
                <Modal tabs={[t('Success')]} open={isOpen}>
                    <Success mainText={t('YourDataHasBeenSuccessfullyUpdated')} onClose={() => setIsOpen(false)} />
                </Modal>
            </div>
        </div>
    </div>;
};

export default ProfileSettings;
