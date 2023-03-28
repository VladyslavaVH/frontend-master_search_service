import React, { useState, useEffect } from 'react';
import { useGetOptionCategoriesQuery } from '../../../features/details/detailsApiSlice';
import { useCreateNewCategoryMutation, useDeleteCategoryMutation } from '../../../features/admin/adminApiSlice';
import { useTranslation } from 'react-i18next';
import { selectCurrentLanguage } from '../../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { fireCategoriesTr } from './../../../utils/firebase.config';
import { db } from './../../../utils/firebase.config';
import { runTransaction, doc, setDoc, getDoc } from 'firebase/firestore';
import Modal from './../../HeaderContainer/Popup/Modal';
import Success from './../Settings/Success';

const AddCategory = (props) => {
    const { t } = useTranslation();
    const lang = useSelector(selectCurrentLanguage);
    const [trCategoriesArr, setTrCategoriesArr] = useState(null);
    const [deleteCategory] = useDeleteCategoryMutation();
    const [deletedCategory, setDeletedCategory] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { data: categories, isLoading } = useGetOptionCategoriesQuery();
    const [createNewCategory] = useCreateNewCategoryMutation();
    
    useEffect(() => {
        if (!isLoading) {
            fireCategoriesTr(setTrCategoriesArr);
        }
    }, [isLoading, categories]);

    const insertNewCategoryTranslations = async (name, description) => {
        try {
            const translationsRef = doc(db, "translations", "categories");

            await runTransaction(db, async (t) => {
                const trDoc = await t.get(translationsRef);
                if (!trDoc) throw "Document does not exist!";

                const newCategoriesArr = trDoc.get('input');
                newCategoriesArr.push(name);
                t.set(translationsRef, { input: newCategoriesArr }, { merge: true });
            });

            if (description) {
                const translationsDescrsRef = doc(db, "translations", "descriptions");

                await runTransaction(db, async (t) => {
                    const trDescDoc = await t.get(translationsDescrsRef);
                    if (!trDescDoc) throw "Document does not exist!";

                    let newDescrsMap = trDescDoc.get('input');
                    newDescrsMap[name] = description;
                    t.set(translationsDescrsRef, { input: newDescrsMap }, { merge: true });
                });
            }
            
            console.log("Transaction successfully committed!");
        } catch (e) {
            console.log("Transaction failed: ", e);
        }
    }

    const fullDeleteCategory = async () => {
        try {
            const res = await deleteCategory(deletedCategory?.id).unwrap();

            //if (!res) return;

            await deleteCategoryTranslations(deletedCategory.category);

        } catch (error) {
            console.error(error);
        }
    }

    const deleteCategoryTranslations = async (name) => {
        try {
            const translationsRef = doc(db, "translations", "categories");

            await runTransaction(db, async (t) => {
                const trDoc = await t.get(translationsRef);
                if (!trDoc) throw "Document does not exist!";

                let oldCategoriesArr = trDoc.get('input');
                let newCategoriesArr = [];
                for (const c of oldCategoriesArr) {
                    if (c != name) {
                        newCategoriesArr.push(c);
                    }
                }
                t.set(translationsRef, { input: newCategoriesArr }, { merge: false });
            });
            
            const translationsDescrsRef = doc(db, "translations", "descriptions");

            await runTransaction(db, async (t) => {
                const trDescDoc = await t.get(translationsDescrsRef);
                if (!trDescDoc) throw "Document does not exist!";

                let newDescrsMap = trDescDoc.get('input');
                if (newDescrsMap[name]) {                    
                    delete newDescrsMap[name];
                    t.set(translationsDescrsRef, { input: newDescrsMap }, { merge: false });
                }
            });            
            
            console.log("Transaction successfully committed!");
        } catch (e) {
            console.log("Transaction failed: ", e);
        }
    }

    useEffect(() => {
        if (isDelete) {
            fullDeleteCategory();

            setIsDelete(false);
            setDeletedCategory(null);
            setIsSuccess(true);
        } else {
            
        }
    }, [isDelete]);

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const data = {
                name,
                description
            };

            await insertNewCategoryTranslations(name, description);
            const res = await createNewCategory(data).unwrap();
            if (!res) return;

            setTimeout(() => fireCategoriesTr(setTrCategoriesArr), 3000);

            setIsSuccess(true);
            setName('');
            setDescription('');
        } catch (error) {
            console.error(error);
        }
    };

    return <div className='container'>
        <div className='row'>
            <div className="col-xl-6 col-md-6">
                <form onSubmit={onSubmit} id='create-new-category-form'>
                    <div className="section-headline margin-bottom-30">
                        <h4>{t("NewCategory")}</h4>
                    </div>
                    <input name='name' 
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    required autoComplete='off'
                    placeholder="Plumbing"
                    title='please fill in this field in English'/>

                    <div className="section-headline margin-top-25 margin-bottom-12">
                        <h5>{t("Description")}</h5>
                    </div>
                    <textarea name='description' 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder={t('NewCategory')} autoComplete='off' 
                        title='please fill in this field in English'>
                    </textarea>

                    <div className="margin-bottom-12 margin-top-25">
                        <button type='sumbit' form='create-new-category-form' className="button ripple-effect">{t("Create")}</button>
                    </div>
                </form>
            </div>

            <div className="col-xl-6 col-md-6">
                <div className="section-headline margin-bottom-30">
                    <h4>{t("AllCategories")}</h4>
                </div>
                <div className="numbered color">
                    <ol style={{width: '100%'}}>
                        {
                            !isLoading && 
                            categories?.map(c => {
                                let index = trCategoriesArr?.input?.indexOf(c.category);
                                return <li key={c.id} style={{ display: 'flex', alignItems: 'center' }}>

                                    <div style={{display: 'flex', justifyContent: 'space-between', width: 'inherit', cursor: 'pointer'}}>
                                        {(trCategoriesArr?.translated && trCategoriesArr.translated[index]) ? trCategoriesArr.translated[index][lang] : c.category}
                                        <i style={{ fontSize: '26px' }} className='icon-material-outline-delete' 
                                        //onClick={() => deleteClick(c.category)}
                                        onClick={() => {
                                            setDeletedCategory({ id: c.id, category: c.category });
                                            setIsOpen(true);
                                        }}
                                        ></i>
                                    </div>
                                </li>;
                            })
                        }
                    </ol>
                </div>
            </div>

            <Modal open={isOpen} onClose={() => setIsOpen(false)} tabs={[]} >
                <div className="container">
                    <div className="col margin-bottom-30 margin-top-20">
                        <div className="">
                            <div className="welcome-text">
                                <h3><span>{t('DeleteCategory')} <strong style={{color: '#2a41e8'}} className='color'>{deletedCategory?.category}</strong>?</span></h3>
                            </div>
                            <div className='row'>
                                <div className="col-xl-6 col-md-6">
                                    <button onClick={() => {
                                        setIsDelete(true);
                                        setIsOpen(false);
                                    }} className="button big full-width ripple-effect margin-top-10" type="button">
                                        {t('Yes')} 
                                    </button>
                                </div>
                                <div className="col-xl-6 col-md-6">
                                    <button onClick={() => {
                                        setIsOpen(false);
                                        setDeletedCategory(null);
                                    }} className="button big full-width ripple-effect margin-top-10" type="button">
                                        {t('No')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal tabs={[t('Success')]} open={isSuccess}>
                <Success mainText={t('YourDataHasBeenSuccessfullyUpdated')} onClose={() => setIsSuccess(false)} />
            </Modal>
        </div>
    </div>;
};

export default AddCategory;
