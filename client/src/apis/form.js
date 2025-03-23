export const saveForm = async(form) => {
    try {
        await fetch(' http://localhost:3000/save-form' , {
            method : "POST",
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(form)
        })
    } catch (error) {
        
    }
}

export const editForm = async(form , formId) => {
    try {
        const res = await fetch( `http://localhost:3000/edit-form/${formId}` , {
            method : "Put",
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(form)
        })
        return res;
    } catch (error) {
        
    }
}


export const getForms = async () => {
    try {
        const res = await fetch('http://localhost:3000/get-forms', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched Forms:", data);
        return data;
    } catch (error) {
        console.error("Error fetching forms:", error);
        return null; 
    }
};

export const viewForm = async(id) => {
    try {
        const res = await fetch(`http://localhost:3000/view-form/${id}` , {
            method : "Get",
            headers : {"Content-Type" : "application/json"},
        })
        if(res){
           return await res.json();
        }
        return "Error"
    } catch (error) {
        
    }
}


export const deleteForm = async(id) => {
    try {
        const res = await fetch(`http://localhost:3000/delete-form/${id}` , {
            method : "Delete",
            headers : {"Content-Type" : "application/json"},
        })
        if(res){
           return res;
        }
        return "Error"
    } catch (error) {
        
    }
}