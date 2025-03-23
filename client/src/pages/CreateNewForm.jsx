import React, { useEffect, useState } from "react";
import { editForm, saveForm, viewForm } from "../apis/form";
import { NavLink, useParams } from "react-router-dom";
import { Draggable } from "react-drag-reorder";

const CreateNewForm = () => {
  const [showInputs, setShowInputs] = useState(false);
  const [form, setForm] = useState({
    formName: "Untitled Form",
    fields: {},
  });

  const { formId } = useParams();

  const fetchForm = async () => {
    if (formId) {
      const res = await viewForm(formId);
      if (res?.data?.length) {
        setForm(res.data[0]);
      }
    }
  };

  useEffect(() => {
    fetchForm();
  }, [formId]);

  const [editField, setEditField] = useState("");

  const addField = (type) => {
    const fieldId = `${type}${Object.keys(form.fields).length}`;
    setForm((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [fieldId]: { value: "", type, placeholder: "Enter value" },
      },
    }));
  };

  const deleteField = (cur) => {
    const { [cur]: _, ...remainingFields } = form.fields;
    setForm((prev) => ({
      ...prev,
      fields: remainingFields,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (formId) {
        const res = await editForm(form, formId);
        if (res.status === 200) alert("Edits Saved");
      } else {
        const res = await saveForm(form);
        if (res.status === 200) alert("Saved");
      }
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };


  const eg = () => {
    Object.keys(form.fields).map((cur, index) => console.log(cur));
  };
  eg();

  return (
    <div className="homepage">
      <h1>{formId ? "Edit Form" : "Create New Form"}</h1>

      <div className="createForm">
        <div
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h1>
            {form.formName}
            <img
              width="30"
              height="30"
              style={{ cursor: "pointer" }}
              src="https://img.icons8.com/pastel-glyph/128/edit--v1.png"
              alt="edit"
              onClick={() => setEditField("formName")}
            />
          </h1>

          <div className="inputs">
              {Object.keys(form.fields).map((cur, index) => (
                <div className="input-main" key={index}>
                  <input
                    type={form.fields[cur]?.type}
                    value={cur.match(/[a-zA-Z]+/)[0]}
                    readOnly
                    onClick={() => setEditField(cur)}
                    placeholder={
                      form.fields[cur]?.placeholder || `Enter ${cur}`
                    }
                  />
                  <img
                    width="24"
                    height="24"
                    onClick={() => deleteField(cur)}
                    src="https://img.icons8.com/material-rounded/FF6B08/filled-trash.png"
                    alt="delete"
                  />
                </div>
              ))}
          </div>

          {!showInputs ? (
            <button className="button" onClick={() => setShowInputs(true)}>
              Add Input
            </button>
          ) : (
            <div>
              <button onClick={() => setShowInputs(false)} className="close">
                Close Add Input
              </button>
              <div className="options-buttons">
                <button onClick={() => addField("text")}>Text</button>
                <button onClick={() => addField("number")}>Number</button>
                <button onClick={() => addField("email")}>Email</button>
                <button onClick={() => addField("password")}>Password</button>
                <button onClick={() => addField("date")}>Date</button>
              </div>
            </div>
          )}

          <button
            className="button"
            style={{ background: "#91C924", color: "white" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <div>
          <h1>Form Editor</h1>
          {!editField ? (
            <h3>Select a field to edit</h3>
          ) : (
            <div className="editFields">
              <p>{String(editField.match(/[a-zA-Z]+/)[0]).toUpperCase()}</p>
              <input
                className="input"
                value={
                  editField === "formName"
                    ? form.formName
                    : form.fields[editField]?.value
                }
                placeholder="Enter value"
                onChange={(e) => {
                  if (editField === "formName") {
                    setForm((prev) => ({ ...prev, formName: e.target.value }));
                  } else {
                    setForm((prev) => ({
                      ...prev,
                      fields: {
                        ...prev.fields,
                        [editField]: {
                          ...prev.fields[editField],
                          value: e.target.value,
                        },
                      },
                    }));
                  }
                }}
              />
              {editField !== "formName" && (
                <input
                  className="input"
                  value={form.fields[editField]?.placeholder}
                  placeholder="Placeholder"
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      fields: {
                        ...prev.fields,
                        [editField]: {
                          ...prev.fields[editField],
                          placeholder: e.target.value,
                        },
                      },
                    }));
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <NavLink to={"/"}>
        <button>Home</button>
      </NavLink>
    </div>
  );
};

export default CreateNewForm;
