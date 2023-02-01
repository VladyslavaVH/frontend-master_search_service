import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetOptionCategoriesQuery } from '../../../features/details/detailsApiSlice';
import { useCreateNewCategoryMutation } from '../../../features/admin/adminApiSlice';

const AddCategory = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPopular, setIsPopular] = useState(false);
    const { data: categories, isLoading } = useGetOptionCategoriesQuery();
    const [createNewCategory] = useCreateNewCategoryMutation();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();    

    const onSubmit = async (data) => {
        try {
            const res = await createNewCategory(data).unwrap();
            if (!res) return ;

            setName('');
            setDescription('');
            setIsPopular(false);
            window.location.reload(true);
        } catch (error) {
            console.error(error);
        }
    };

    return <div className='container'>
        <div className='row'>
            <div className="col-xl-6 col-md-6">
                <form onSubmit={handleSubmit(onSubmit)} id='create-new-category-form'>
                    <div className="section-headline margin-bottom-30">
                        <h4>New Category</h4>
                    </div>
                    <input name='name' 
                    //value={name}
                    //onChange={e => setName(e.target.value)} 
                    required
                    {...register('name', { required: true })}
                     placeholder="Plumbing"></input>
                    <div className="section-headline margin-top-25 margin-bottom-12">
                        <h5>Description</h5>
                    </div>
                    <textarea name='description' 
                    //value={description}
                    //onChange={e => setDescription(e.target.value)}
                    {...register('description')}
                     placeholder='New category'>
                    </textarea>
                    <div className="checkbox margin-top-25 margin-bottom-12">
                        <input name='isPopular' onChange={() => setIsPopular(!isPopular)}
                        onClick={() => setIsPopular(!isPopular)}
                        {...register('isPopular', { required: true })}
                         type="checkbox" id="chekcbox1" checked={isPopular} />
                        <label htmlFor="chekcbox1"><span className="checkbox-icon"></span> is popular</label>
                    </div>
                    <div className="margin-bottom-12">
                        <button type='sumbit' form='create-new-category-form' className="button ripple-effect">Create</button>
                    </div>
                </form>
            </div>

            <div className="col-xl-6 col-md-6">
                <div className="section-headline margin-bottom-30">
                    <h4>AllCategories</h4>
                </div>
                <div className="numbered color">
                    <ol>
                        {
                            !isLoading && 
                            categories?.map(c => <li key={c.id}>{c.category}</li>)
                        }
                    </ol>
                </div>
            </div>
        </div>
    </div>;
};

export default AddCategory;
