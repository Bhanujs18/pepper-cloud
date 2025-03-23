import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { deleteForm, getForms } from '../apis/form'

const Homepage = () => {

    const [forms, setForms] = useState()

    const fetchForms = async()=>{
        const res = await getForms();
        console.log(res.data)
        if(res){
            setForms(res.data)
        }
    }

    const delForm = async(id) => {
        const res = await deleteForm(id);
        // if(res.status === 200){
        //     alert("Deleted")
        // }
        fetchForms();
    }

    useEffect(()=>{
        fetchForms()
    },[])

  return (
    <div className='homepage'>
        <h1 className='icon'>Welcome to FormBuilder.com</h1>
        <p className='icon'>This is a simple form builder</p>
        <NavLink to='/create-new-form'><button>Create New Form</button></NavLink>

        <div> 
           {forms ? 
           <div className='forms'>
            {forms.map((cur, index)=>(
                <div className='form'>
                <h3>{cur.formName}</h3>
                <div style={{display:'flex' , gap:'1rem' , flexWrap:'wrap'}}>
                <NavLink to={`/view-form/${cur._id}`}><button>View</button></NavLink>
                <NavLink to={`/edit-form/${cur._id}`}><button>Edit</button></NavLink>
                <button onClick={()=>delForm(cur._id)}>Delete</button>
                </div>
                </div>
            ))}
           </div>
        :
        <h1>No Forms Yet</h1>}
        </div>
    </div>
  )
}

export default Homepage