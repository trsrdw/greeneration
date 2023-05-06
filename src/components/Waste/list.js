import './styles/list.scss';
import React, { useState, useEffect } from "react";
import { Button, Form, Alert, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function WasteList() {

    const [show, setShow] = useState(false);
    const [errMsg, setErrorMsg] = useState('');
    const [deleteId, setDeleteId] = useState(null);
    const [wasteData, setWasteData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://6453b11ae9ac46cedf2cd38a.mockapi.io/wastelist").then((res) => {
            return res.json();
        }).then((resp) => {
            setWasteData(resp);
            const uniqueCategories = [...new Set(resp.map((opt) => opt.category))];
            setCategories(uniqueCategories);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    const gotoCreate = () => {
        navigate("/wastelist/create");
    }

    const gotoEdit = (id) => {
        navigate("/wastelist/edit/" + id);
    }

    const promptClose = () => {
        setShow(false);
        setDeleteId(null);
    }
    const promptShow = (id) => {
        setShow(true);
        setDeleteId(id);
    };

    const removeData = () => {
        fetch("https://6453b11ae9ac46cedf2cd38a.mockapi.io/wastelist/" + deleteId, {
            method: "DELETE"
        }).then(() => {
            promptClose();
            window.location.reload();
        }).catch((err) => {
            setErrorMsg(err.message);
        })
    }

    const filteredData = selectedCategory
        ? wasteData.filter(item => item.category === selectedCategory)
        : wasteData;

    return (
        <div className="px-4 list-wrapper">

            {
                errMsg !== '' ?
                    <div className="alert-area">
                        <Alert variant="danger" dismissible>
                            {errMsg}
                        </Alert>
                    </div>
                    : null
            }

            <div className="table-header mt-4 mb-2">
                <div className="select-wrapper">
                    <Form.Select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="select-custom" aria-label="Default select example">
                        <option value={''}>Show All</option>
                        {
                            categories.map((category) => <option key={category}>{category}</option>)
                        }
                    </Form.Select>
                </div>
                <div className="add-btn mb-2"><Button variant="primary" onClick={gotoCreate}>Add +</Button></div>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Waste Name</th>
                        <th>Waste Category</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData &&
                        filteredData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>
                                    <div className="group-btn">
                                        <div><Button variant="success" onClick={() => { gotoEdit(item.id) }}>Edit</Button></div>
                                        <div><Button variant="danger" onClick={() => { promptShow(item.id) }}>Delete</Button>
                                            <Modal className="deleteModal" show={show} onHide={promptClose}>
                                                <Modal.Header>
                                                    <Modal.Title>Are you sure?</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>If you proceed, you will lose this set of data. Are you sure you want to continue?</Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={promptClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button variant="danger" onClick={removeData}>
                                                        Confirm
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}