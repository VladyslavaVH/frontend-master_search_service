import React, { useState, useEffect } from 'react';
import { useGetFaqsQuery } from '../../../features/faqs/faqsApiSlice';
import { useChangeFaqsMutation } from '../../../features/admin/adminApiSlice';

const EDIT_BTN_STYLES = { 
    width: '100px', 
    paddingTop: 0, 
    paddingBottom: 0, 
    color: '#fff',
    cursor: 'pointer'
};

const EditFAQs = (props) => {
    const [accordionData, setAccordionData] = useState([]);
    const { data, isLoading } = useGetFaqsQuery();
    const [newFaqs, setNewFaqs] = useState([]);
    const [changeFaqs] = useChangeFaqsMutation();

    useEffect(() => {
        if (!isLoading && accordionData.length !== data.faqs.length) {
            for (let i = 0; i < data.faqs.length; i++) {
                accordionData.push(false);  
                setNewFaqs(data.faqs);
            }
        }
    }, [isLoading]);

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

        //console.log(res);
    }

    return <>
        <div className="accordion js-accordion">
    
            {!isLoading && newFaqs?.map((faq, i) =>
                <div key={faq.id} onClick={onAccordionClick} data-index={i} className={`accordion__item js-accordion-item ${accordionData[i] ? 'active' : ''}`}>
                    <div className="accordion-header js-accordion-header">{faq.question}</div>
    
                    <div className="accordion-body js-accordion-body" style={{ display: accordionData[i] ? 'block' : 'none' }}>
    
                        <div className="accordion-body__contents">
                            <div className='margin-bottom-15'>
                                <div style={{ color: '#2a41e8' }}><i className='icon-line-awesome-question'>Question:</i></div>
                                <div data-info="question">{faq.question}</div>
                                <button onClick={editFaqs} type='button' className="button ripple-effect button-sliding-icon" style={EDIT_BTN_STYLES}>Edit <i className="icon-feather-edit"></i></button>
                            </div>
                            <hr />
                            <div>
                                <div style={{ color: '#2a41e8' }}><i className='icon-material-outline-question-answer'></i> Answer:</div>
                                <div data-info="answer">{faq.answer}</div>
                                <button onClick={editFaqs} type='button' className="button ripple-effect button-sliding-icon" style={EDIT_BTN_STYLES}>Edit <i className="icon-feather-edit"></i></button>
                            </div>
                        </div>
    
                    </div>
                </div>)
            }
        </div>

        <button onClick={saveChanges} type='button' className="button ripple-effect button-sliding-icon margin-top-15" style={{ width: '170px' }}>Save changes <i className="icon-feather-check"></i></button>
    </>;
};

export default EditFAQs;
