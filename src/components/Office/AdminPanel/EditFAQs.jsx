import React, { useState, useEffect } from 'react';
import { useGetFaqsQuery } from '../../../features/faqs/faqsApiSlice';
import { useChangeFaqsMutation } from '../../../features/admin/adminApiSlice';
import { useTranslation } from 'react-i18next';
import Success from './../Settings/Success';
import Modal from './../../HeaderContainer/Popup/Modal';
import { useCreateFaqMutation } from '../../../features/admin/adminApiSlice';
import { logOut } from '../../../features/auth/authSlice';

const EDIT_BTN_STYLES = { 
    minWidth: '100px', 
    paddingTop: 0, 
    paddingBottom: 0, 
    color: '#fff',
    cursor: 'pointer'
};

const EditFAQs = (props) => {
    const { t } = useTranslation();
    const [createFaq] = useCreateFaqMutation();
    const [isSuccess, setIsSuccess] = useState(false);
    const [accordionData, setAccordionData] = useState([]);
    const { data, isLoading } = useGetFaqsQuery();
    const [newFaqs, setNewFaqs] = useState([]);
    const [changeFaqs] = useChangeFaqsMutation();
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    useEffect(() => {
        if (!isLoading && accordionData.length !== data.faqs.length) {
            for (let i = 0; i < data.faqs.length; i++) {
                accordionData.push(false);  
                setNewFaqs(data.faqs);
            }
        }
    }, [isLoading, data]);

    const onAccordionClick = e => {
        const accordionIndex = e.target.parentNode.getAttribute('data-index');
        const tmp = accordionData[accordionIndex];
        accordionData[accordionIndex] = !tmp;
        setAccordionData([...accordionData]);
    }

    const editFaqs = (e) => {
        let parentNode = null;
        if (e.target.tagName === 'I') {
            parentNode = e.target.parentNode.parentNode;
        } else {
            parentNode = e.target.parentNode;
        }

        if (parentNode) {
            const editEl = parentNode.children[1];
            const dataIndex = parentNode.parentNode.parentNode.parentNode.getAttribute('data-index');
            
            const dataInfo = editEl.getAttribute('data-info');
            if (editEl?.outerHTML.includes('div')) {
                editEl.outerHTML = `<textarea data-info="${dataInfo}">${editEl?.innerText}</textarea>`;
            } else {
                let prevFaq = newFaqs[dataIndex];
                let newFaq = null;
                let newArr = null;

                if (editEl.getAttribute('data-info') === 'question') {
                    newFaq = { ...prevFaq, question: editEl.value };
                } else if (editEl.getAttribute('data-info') === 'answer') {
                    newFaq = { ...prevFaq, answer: editEl.value };
                }

                newArr = [...newFaqs].filter(f => f.id !== newFaq.id);
                setNewFaqs([newFaq, ...newArr]);

                editEl.outerHTML = `<div data-info="${dataInfo}">${editEl?.value}</div>`;
            }
        }
        
    }

    const saveChanges = async () => {
        const res = await changeFaqs({ faqs: newFaqs }).unwrap();
        if (!res) return;

        setIsSuccess(true);
    }

    const createNewFaqClick = async () => {
        try {
            const data = {
                newQuestion,
                newAnswer
            };

            const res = await createFaq(data).unwrap();
            console.log(res);

            setNewQuestion('');
            setNewAnswer('');
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
        }
    };

    return <>
        <div className="accordion js-accordion">
    
            {!isLoading && newFaqs?.map((faq, i) =>
                <div key={faq.id} onClick={onAccordionClick} data-index={i} className={`accordion__item js-accordion-item ${accordionData[i] ? 'active' : ''}`}>
                    <div className="accordion-header js-accordion-header">{faq.question}</div>
    
                    <div className="accordion-body js-accordion-body" style={{ display: accordionData[i] ? 'block' : 'none' }}>
    
                        <div className="accordion-body__contents">
                            <div className='margin-bottom-15'>
                                <div style={{ color: '#2a41e8' }}><i className='icon-line-awesome-question'>{t("Question")}:</i></div>
                                <div data-info="question">{faq.question}</div>
                                <button onClick={editFaqs} type='button' className="button ripple-effect button-sliding-icon" style={EDIT_BTN_STYLES}>{t("Edit")} <i className="icon-feather-edit"></i></button>
                            </div>
                            <hr />
                            <div>
                                <div style={{ color: '#2a41e8' }}><i className='icon-material-outline-question-answer'></i> {t("Answer")}:</div>
                                <div data-info="answer">{faq.answer}</div>
                                <button onClick={editFaqs} type='button' className="button ripple-effect button-sliding-icon" style={EDIT_BTN_STYLES}>{t("Edit")} <i className="icon-feather-edit"></i></button>
                            </div>
                        </div>
    
                    </div>
                </div>)
            }
        </div>

        <button onClick={saveChanges} type='button' className="button ripple-effect button-sliding-icon margin-top-15" style={{ minWidth: '170px' }}>{t('SaveChanges')}<i className="icon-feather-check"></i></button>

        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="section-headline border-top margin-top-45 padding-top-45 margin-bottom-12">
                        <h4>{t('CreateNewFAQ')}</h4>
                    </div>
                </div>

                <div className="col-xl-12">
                    <div className="section-headline margin-top-25 margin-bottom-12">
                        <h5>{t('Question')}</h5>
                    </div>
                    <input value={newQuestion} onChange={(e) => {setNewQuestion(e.target.value)}}
                    type='text' name='newQuestion'/>
                </div>

                <div className="col-xl-12">
                    <div className="section-headline margin-top-25 margin-bottom-12">
                        <h5>{t('Answer')}</h5>
                    </div>
                    <textarea value={newAnswer} onChange={e => setNewAnswer(e.target.value)}
                    name="newAnswer" id="" cols="15" rows="5"></textarea>
                </div>
                <div className='col-xl-6 margin-top-15' style={{minWidth: '170px'}}>    
                    <button onClick={createNewFaqClick} type="button" className="button ripple-effect">{t('Create')}</button>
                </div>
            </div>
        </div>




        <Modal tabs={[t('Success')]} open={isSuccess}>
            <Success mainText={t('YourDataHasBeenSuccessfullyUpdated')} onClose={() => setIsSuccess(false)} />
        </Modal>
    </>;
};

export default EditFAQs;
