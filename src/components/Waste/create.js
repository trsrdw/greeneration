import './styles/create.scss';
import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function WasteCreate() {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [errMsg, setErrorMsg] = useState('');
    const [success, setSuccessMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const wasteData = { name, category };

        fetch("https://6453b11ae9ac46cedf2cd38a.mockapi.io/wastelist", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(wasteData)
        }).then(() => {
            setSuccessMsg("Saved successfully.");
            //navigate("/wastelist");
        }).catch((err) => {
            setErrorMsg(err.message);
        })
    }

    return (
        <div className="px-4 wrapper">
            <Link className="backtoList" as={Link} to="/wastelist">🡠</Link>
            <h4 className="text-center mb-4">Add waste data</h4>

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
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Control value={name} onChange={e => setName(e.target.value)} className="input-custom" required type="text" placeholder="Waste Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Select value={category} onChange={e => setCategory(e.target.value)} className="select-custom" aria-label="Default select example">
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
                            Save
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}