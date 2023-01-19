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
import { usePostJobMutation } from "../../../features/jobs/jobsApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object()
  .shape({
      // name: yup.string().required(),
      // age: yup.number().required(),
      photos: yup.mixed()
          .test("fileSize", "File Size is too large", (value) => {
              return value.length && value[0].size <= 5242880;
          })
          .test("fileType", "Unsupported File Format", (value) => {
              return value.length && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
          })
  })
  .required();

let JobPosting = (props) => {
    const { register, handleSubmit, reset, watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });
    const { data: categoriesOptions, isLoading } = useGetOptionCategoriesQuery();
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    const user = useSelector(selectCurrentUser);
    const [postJob] = usePostJobMutation();

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
            Object.keys(data?.photos).forEach(key => 
                formData.append(data?.photos?.item(key).name, data?.photos?.item(key))
            );

            let categoryFK = parseInt(data?.categoryFK);
            let minPayment = parseInt(data?.minPayment);
            let maxPayment = parseInt(data?.maxPayment);

            let jobPostData = {
                clientFK: user.id,
                ...data,
                categoryFK,
                minPayment,
                maxPayment,
                ...coordinates
            };
            delete jobPostData.photos;

            Object.keys(jobPostData).forEach(key => 
                formData.append(key, jobPostData[key])
            );
            
            let formEntries = Array.from(formData.entries());
            console.log("formEntries " , formEntries); 

            const jobData = await postJob(formData).unwrap();
            if (!jobData) return;

            navigate('/client-office/manage-jobs', 
            { 
                replace: true,
                state: {name: 'Manage Jobs', page: 'Manage Jobs'} 
            },
            );
            console.log('navigate');
            
        } catch (error) {
            console.error(error);
        }
    };

    return <div className="row">

        {/*encType="multipart/form-data"*/}
        <form onSubmit={handleSubmit(onSubmit)} method="post" id="postJobForm">
            <div className="col-xl-12">
                <div className="dashboard-box margin-top-0">
    
                    {/* <!-- Headline --> */}
                    <div className="headline">
                        <h3><i className="icon-feather-folder-plus"></i> Job Submission Form</h3>
                    </div>
    
                    <div className="content with-padding padding-bottom-10">
                        <div className="row">
    
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Job Title</h5>
                                    <input name="title" 
                                    {...register('title', { required: true })}
                                    type="text" className="with-border" placeholder="Cleaner" />
                                </div>
                            </div>
    
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Job Category</h5>
                                    {/* <Autocomplete
                                        id="category-input"
                                        sx={{ width: '100%', padding: 0, margin: 0, border: "none",
                                        '& input': {
                                            padding: 0,
                                            margin: 0,
                                            width: 'inherit'
                                        },
                                        ":root": {
                                            padding: 0,
                                            margin: 0
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            padding: 0
                                        },
                                        '& :hover': {
                                            border: 'none'
                                        }
                                        }}
                                        className="with-border"
                                        open={open}
                                        onOpen={() => setOpen(true)}
                                        onClose={() => setOpen(false)}
                                        isOptionEqualToValue={(option, value) => option.name === value.name}
                                        getOptionLabel={(option) => option.name}
                                        options={options}
                                        loading={loading}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                // label="Asynchronous"
                                                sx={{ padding: 0, margin: 0 }}
                                                style={{ margin: 0, padding: 0 }}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <React.Fragment>
                                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    /> */}
                                    <div className="input-with-icon">
                                        <select name="categoryFK" 
                                        {...register('categoryFK', { required: true })}
                                        className="with-border" data-size="7" placeholder="Select Category" title="Select Category">
                                            {
                                                isLoading 
                                                ?<option>Loading...</option>
                                                : categoriesOptions?.map(c => 
                                                    <option key={c.id} value={c.id}>{c.category}</option>
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
                                    {/* <div className="input-with-icon">
                                        <div id="autocomplete-container">
                                            <input id="autocomplete-input" className="with-border" type="text" placeholder="Type Address" />
                                        </div>
                                        <i className="icon-material-outline-location-on"></i>
                                    </div> */}
    
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
                                                <input name="minPayment" 
                                                {...register('minPayment', { required: true })}
                                                className="with-border" type="text" placeholder="Min" />
                                                <i className="currency">USD</i>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="input-with-icon">
                                                <input name="maxPayment" 
                                                {...register('maxPayment', { required: true })}
                                                className="with-border" type="text" placeholder="Max" />
                                                <i className="currency">USD</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Date</h5>
                                    <div className="input-with-icon">
                                        <div id="date-autocomplete-container">
                                            <input id="date-autocomplete-input" className="with-border" type="text" placeholder="01-02-2022" />
                                        </div>
                                        <i className="icon-material-outline-date-range"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Time</h5>
                                    <div className="input-with-icon">
                                        <div id="time-autocomplete-container">
                                            <input id="time-autocomplete-input" className="with-border" type="text" placeholder="09:00" />
                                        </div>
                                        <i className="icon-material-outline-access-time"></i>
                                    </div>
                                </div>
                            </div> */}
    
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Date and Time</h5>
                                    <input name="jobDateTime"
                                    {...register('jobDateTime', { required: true })}
                                    type={'datetime-local'} />
                                </div>
                            </div>
    
                            <div className="col-xl-12">
                                <div className="submit-field">
                                    <h5>Job Description</h5>
                                    <textarea name="description"
                                    {...register('description')}
                                     cols="30" rows="5" className="with-border"></textarea>
                                     
                                    {
                                        !watch('photos') || watch('photos').length === 0
                                            ? <div className="uploadButton margin-top-30">
                                                <input name="photos"
                                                    {...register('photos')}
                                                    className="uploadButton-input" type="file" accept="image/*" id="upload" multiple />
                                                <label className="uploadButton-button ripple-effect" htmlFor="upload">Upload Photos</label>
                                                <span className="uploadButton-file-name">
                                                    {
                                                        errors.photos
                                                            ? errors.photos.messages
                                                            : 'Images that might be helpful in describing your job'
                                                    }
                                                </span>
                                            </div>
                                            : <strong>{watch('photos')[0].name}</strong>
                                    }
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="col-xl-12">
                <button type="submit" 
                form="postJobForm"
                onClick={() => console.log('click')}
                 className="button ripple-effect big margin-top-30"><i className="icon-feather-plus"></i> Post a Job</button>
            </div>
        </form>

    </div>
;
}

export default JobPosting;