import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import { AppContext } from '../Context/AppContext'
import '../styles/right.css';


const RightSide = () => {

    const { selectedId } = useContext(AppContext)

    const [ changed, setChanged ] = useState(false);
    const [ reset, setReset ] = useState(false);
    const [ name , setName] = useState('');
    const [ email , setEmail] = useState('');
    const [ phone , setPhone] = useState('');
    const [ address , setAddress] = useState('');
    const [ company , setCompany] = useState('');
    const [ loadingSubmit, setLoadingSubmit] = useState(false);
    const [ loadingFetch, setLoadingFetch] = useState(false);

    useEffect(() => {
        let id = selectedId;
        const FetchUser = async () => {
            if(reset || id.length !== 0){
                setLoadingFetch(true);
                await axios.get(`https://my-json-server.typicode.com/tsevdos/epignosis-users/users/${id}`)
                .then((response) => {
                    setName(response.data.name);
                    setEmail(response.data.email);
                    setPhone(response.data.phone);
                    setAddress(response.data.address);
                    setCompany(response.data.company);
                })
                .catch((error) => {
                    console.log(error.response);
                })
                 setReset(false);
                 setLoadingFetch(false);
            }
        }
        FetchUser();
    },[selectedId, reset])
    
    
    const handleCancel = () => {
        setReset(true)
        setChanged(false);
    }

    const handleSubmit = async (e) => {
        setLoadingSubmit(true);
        e.preventDefault();
        let id = selectedId;
        await axios.put(`https://my-json-server.typicode.com/tsevdos/epignosis-users/users/${id}`,
                {
                    name: name, 
                    email: email, 
                    phone: phone, 
                    address: address, 
                    company: company
                })
        .then((response) => {
            console.log(response.data);
            setLoadingSubmit(false);
            setChanged(false)
        })
        .catch((error) => {
            console.log(error.response);
        })
    }
  return (
    <div className='rightSide'>
        <div className='container'> 
            {
                loadingSubmit
                ?
                    <>
                        <div className="spinner-container">
                            <div className="loading-spinner"></div>
                        </div>
                    </>
                :
                    <> 
                        {
                            loadingFetch
                            ?
                            <> 
                                <div className="spinner-container">
                                    <div className="loading-spinner"></div>
                                </div>
                            </>
                            :
                            <>
                                <form className='form' onSubmit={handleSubmit}>
                                    <div className='form-input'>
                                        <label className='label'>Name</label>
                                        <input  placeholder='Enter Name'
                                                required
                                                name="name"
                                                value={name}
                                                onChange={(e) => {setName(e.target.value); setChanged(true);}}/>
                                    </div>
                                    <div className='form-input'>
                                        <label className='label'>Email address</label>
                                        <input  placeholder='Enter Email address'
                                                type="email"
                                                name="email"
                                                value={email}
                                                required
                                                onChange={(e) => {setEmail(e.target.value); setChanged(true);}}/>
                                    </div>
                                    <div className='form-input'>
                                        <label className='label'>Phone</label>
                                        <input  placeholder='Enter Phone'
                                                required
                                                name="phone"
                                                value={phone}
                                                onChange={(e) => {setPhone(e.target.value); setChanged(true);}}/> 
                                    </div>
                                    <div className='form-input'>
                                        <label className='label'>Address</label>
                                        <input  placeholder='Enter Address'
                                                name="address"
                                                value={address}
                                                onChange={(e) => {setAddress(e.target.value); setChanged(true);}}
                                        />
                                    </div>
                                    <div className='form-input'>
                                        <label className='label'>Company</label>
                                        <input  placeholder='Enter Company'
                                                value={company}
                                                onChange={(e) => {setCompany(e.target.value); setChanged(true);}}/>
                                    </div>
                                        
                                    {
                                        changed 
                                        ? 
                                            <div className='actions'>
                                                <button type='button' onClick={handleCancel} className='cancel-button'>Cancel</button>
                                                <button type='submit' className='save-button'>Save</button>
                                            </div>
                                        :
                                            <div className='actions'>
                                                <button type='button' className='save-button' disabled>Save</button>
                                            </div>
                                    }
                                </form>
                            </>
                        }
                </>
           }
        </div>
    </div>
  )
}

export default RightSide