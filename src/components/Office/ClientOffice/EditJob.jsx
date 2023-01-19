import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import { useGetOptionCategoriesQuery } from "../../../features/details/detailsApiSlice";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {  yupResolver } from '@hookform/resolvers/yup';
import { useGetJobByIdQuery, useEditJobMutation } from "../../../features/jobs/jobsApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const schema = yup
  .object()
  .shape({
      // name: yup.string().required(),
      // age: yup.number().required(),
    //   photos: yup.mixed()
    //       .test("fileSize", "File Size is too large", (value) => {
    //           return value.length && value[0].size <= 5242880;
    //       })
    //       .test("fileType", "Unsupported File Format", (value) => {
    //           return value.length && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
    //       })
  })
  .required();

let EditJob = (props) => {
    const location = useLocation();
    const { data: job, isLoading } = useGetJobByIdQuery(location.state.id);
    
    const { register, handleSubmit, reset, watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });
    const { data: categoriesOptions } = useGetOptionCategoriesQuery();
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    const user = useSelector(selectCurrentUser);
    const [editJob] = useEditJobMutation();

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0]);
        console.log(ll);

        setAddress(value);
        setCoordinates(ll);
    };

    const onSubmit = async data => {
        try {
            let formData = new FormData();
            {/*edit photos(delete)*/}
            // Object.keys(data?.photos).forEach(key => 
            //     formData.append(data?.photos?.item(key).name, data?.photos?.item(key))
            // );

            let categoryFK = parseInt(data?.categoryFK);
            let minPayment = parseInt(data?.minPayment);
            let maxPayment = parseInt(data?.maxPayment);

            let jobEditData = {
                clientFK: user.id,
                ...data,
                categoryFK,
                minPayment,
                maxPayment,
                ...coordinates
            };
            delete jobEditData.photos;

            console.log(jobEditData);

            // Object.keys(jobEditData).forEach(key => 
            //     formData.append(key, jobEditData[key])
            // );
            
            // let formEntries = Array.from(formData.entries());
            // console.log("formEntries " , formEntries); 

            // const jobData = await editJob(location.state.id, formData).unwrap();
            // if (!jobData) return;

            // navigate(`manage-jobs/job/${jobEditData.title}`, 
            // { 
            //     replace: true,
            //     state: {name: 'Job', page: 'Job'} 
            // },
            // );
            // console.log('navigate');
            
        } catch (error) {
            console.error(error);
        }
    };

    const dateForDateTimeInputValue = date => {
        if (date) {
            return new Date(date.getTime() 
            + new Date().getTimezoneOffset() * -60 * 1000)
            .toISOString().slice(0, 19);
        } else return '';
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    
    function formatDate(date) {
    return (
        [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        // padTo2Digits(date.getSeconds()),  // 👈️ can also add seconds
        ].join(':')
    );
    }

    useEffect(() => {
        if(!isLoading) {
            console.log(job);
            const [date, time] = formatDate(new Date(job.jobDateTime)).split(' ');
            const datetimeLocalInput = document.getElementById('jobDateTime');
            console.log(date, time);
            datetimeLocalInput.value = date + 'T' + time;
            //datetimeLocalInput.value = job.jobDateTime;

            //"2021-12-31T10:09"
            console.log('dateTimeLocalInput value: ', datetimeLocalInput.value);
        }
    }, [isLoading]);



    return <div className="row">
        {!isLoading &&
        <form onSubmit={handleSubmit(onSubmit)} method="post" id="editJobForm">
            <div className="col-xl-12">
                <div className="dashboard-box margin-top-0">
    
                    <div className="headline">
                        <h3><i className="icon-feather-folder-plus"></i> Job Edit Form</h3>
                    </div>
    
                    <div className="content with-padding padding-bottom-10">
                        <div className="row">
    
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Job Title</h5>
                                    <input name="title" value={job?.title}
                                    {...register('title', { required: true })}
                                    type="text" className="with-border" placeholder="Cleaner" />
                                </div>
                            </div>
    
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Job Category</h5>
                                    <div className="input-with-icon">
                                        <select name="categoryFK"
                                        {...register('categoryFK', { required: true })}
                                        className="with-border" data-size="7" placeholder="Select Category" title="Select Category">
                                            {
                                                !job
                                                    ? <option>Loading...</option>
                                                    : categoriesOptions?.map(c =>
                                                        <option key={c.id} value={c.id}
                                                            selected={(job?.category === c.category) ? true : false}>
                                                            {c.category}
                                                        </option>
                                                    )
                                            }
                                        </select>
                                        <i className="icon-material-outline-arrow-drop-down"></i>
                                    </div>
                                </div>
                            </div>
    
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Location</h5>
    
                                    <PlacesAutocomplete
                                        value={address}
                                        onChange={setAddress}
                                        onSelect={handleSelect}>
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            
                                                <>
                                                    <div className="input-with-icon">
                                                        <input 
                                                        //{...register('location', { required: true })}
                                                        id="autocomplete-input" type="text"
                                                            {...getInputProps({
                                                                placeholder: 'Type Address',
                                                                className: 'with-border',
                                                            })} />
                                                        <i className="icon-material-outline-location-on"></i>
                                                    </div>
        
                                                    <ul className="autocomplete-dropdown-container" 
                                                    style={{ position: 'relative', marginTop: 0 }}>
                                                        {loading && <li style={{ backgroundColor: '#ffffff', cursor: 'pointer', textAlign: 'center' }}>Loading...</li>}
                                                        {suggestions.map((suggestion, i) => {
                                                            const className = suggestion.active
                                                                ? 'suggestion-item--active'
                                                                : 'suggestion-item';
                                                            // inline style for demonstration purpose
                                                            const style = suggestion.active
                                                                ? { backgroundColor: '#fafafa', cursor: 'pointer', padding: '5px', paddingLeft: '20px', paddingRight: '45px' }
                                                                : { backgroundColor: '#ffffff', cursor: 'pointer', padding: '5px', paddingLeft: '20px', paddingRight: '45px' }
                                                            return (
                                                                <li key={i}
                                                                    {...getSuggestionItemProps(suggestion, {
                                                                        className,
                                                                        style,
                                                                    })}
                                                                >
                                                                    <span>{suggestion.description}</span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </>
                                        )}
                                    </PlacesAutocomplete>
                                </div>
                            </div>
    
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Payment</h5>
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <div className="input-with-icon">
                                                <input name="minPayment" value={job?.minPayment}
                                                {...register('minPayment', { required: true })}
                                                className="with-border" type="text" placeholder="Min" />
                                                <i className="currency">USD</i>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="input-with-icon">
                                                <input name="maxPayment" value={job?.maxPayment}
                                                {...register('maxPayment', { required: true })}
                                                className="with-border" type="text" placeholder="Max" />
                                                <i className="currency">USD</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            {job &&
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Date and Time</h5>
                                    <input name="jobDateTime" id={'jobDateTime'}
                                    {...register('jobDateTime', { required: true })}
                                    type={'datetime-local'} />
                                </div>
                            </div>}
    
                            <div className="col-xl-12">
                                <div className="submit-field">
                                    <h5>Job Description</h5>
                                    <textarea name="description"
                                    {...register('description')}
                                     cols="30" rows="5" className="with-border"
                                     defaultValue={job?.description}></textarea>
                                     
                                    {/*edit photos*/}
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="col-xl-12">
                <button type="submit" 
                form="editJobForm"
                 className="button ripple-effect big margin-top-30"><i className="icon-feather-plus"></i> Save changes</button>
            </div>
        </form>}

    </div>
;
}

export default EditJob;