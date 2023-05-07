import './styles/edit.scss';
import React, { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export default function WasteEdit() {
    const { wstid } = useParams();

    const [editname, setEditName] = useState('');
    const [editcategory, setEditCategory] = useState('');
    const [errMsg, setErrorMsg] = useState('');
    const [success, setSuccessMsg] = useState('');

    useEffect(() => {
        fetch("https://6453b11ae9ac46cedf2cd38a.mockapi.io/wastelist/" + wstid).then((res) => {
            return res.json();
        }).then((resp) => {
            setEditName(resp.name);
            setEditCategory(resp.category);
        }).catch((err) => {
            setErrorMsg(err.message);
        })
    }, [wstid]);

    const handleSubmit = (e, updatedName, updatedCategory) => {
        e.preventDefault();
        const wasteData = { name: updatedName, category: updatedCategory };

        fetch("https://6453b11ae9ac46cedf2cd38a.mockapi.io/wastelist/" + wstid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(wasteData)
        }).then(() => {
            setSuccessMsg("Updated successfully.");
            //navigate("/wastelist");
        }).catch((err) => {
            setErrorMsg(err.message);
        })
    }

    return (
        <div className="px-4 wrapper">
            <Link className="backtoList" as={Link} to="/wastelist">🡠</Link>
            <h4 className="text-center mb-4">Edit waste data</h4>

            {
                errMsg !== '' ?
                    <div className="alert-area">
                        <Alert variant="danger" dismissible>
                            {errMsg}
                        </Alert>
                    </div>
                    : null
            }

            {
                success !== '' ?
                    <div className="alert-area">
                        <Alert variant="success" dismissible>
                            {success}
                        </Alert>
                    </div>
                    : null
            }

            <div className="create-container">
                <div className="create-form">
                    <Form noValidate onSubmit={(e)=>handleSubmit(e, editname, editcategory)}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Control value={editname} onChange={e => setEditName(e.target.value)} className="input-custom" required type="text" placeholder="Waste Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Select value={editcategory} onChange={e => setEditCategory(e.target.value)} className="select-custom" aria-label="Default select example">
                                <option>Waste Category</option>
                                <option>Organic</option>
                                <option>Metal</option>
                                <option>Plastic</option>
                                <option>E-Waste</option>
                                <option>Paper</option>
                                <option>Glass</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" className="button-primary mt-3">
                            Update
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}