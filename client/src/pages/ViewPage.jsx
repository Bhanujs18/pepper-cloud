import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { viewForm } from '../apis/form';

const ViewPage = () => {
    const {formId} = useParams();
    console.log(formId)
    const [form , setForm] = useState();

    const fetchForm = async() => {
    const res = await viewForm(formId);
    if(res){
        setForm(res.data[0])
    }
    console.log(res.data[0])
    }

    useEffect(()=>{
      fetchForm();
    },[])

  return (
    <div className='view-form'>
        <h1>{form?.formName}</h1>
        {form ? 
        <div className='fields'>
           {Object.values(form?.fields).map((cur , index)=> (
            <label>
            {cur.value}
           <input key={index} type={String(cur)?.toLowerCase()} />      
           </label>  
        ))}
        </div>
       : null}
       <button>Submit</button>
    </div>
  )
}

export default ViewPage