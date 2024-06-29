import React, { useState, useEffect } from 'react';
import '../styles/InvoiceForm.css';

const InvoiceForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        sellerDetails: {
            name: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            panNo: '',
            gstNo: ''
        },
        signatureImage: null,
        placeOfSupply: '',
        billingDetails: {
            name: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            stateCode: ''
        },
        shippingDetails: {
            name: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            stateCode: ''
        },
        placeOfDelivery: '',
        orderDetails: {
            orderNo: '',
            orderDate: ''
        },
        invoiceDetails: {
            invoiceNo: '',
            invoiceDetails: '',
            invoiceDate: ''
        },
        reverseCharge: false,
        items: [
            {
                description: '',
                unitPrice: 0,
                quantity: 1,
                discount: 0,
                taxRate: 18
            }
        ]
    });
    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            placeOfSupply: prevData.sellerDetails.state
        }));
    }, [formData.sellerDetails.state]);

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            placeOfDelivery: prevData.shippingDetails.state
        }));
    }, [formData.shippingDetails.state]);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevData => ({
                    ...prevData,
                    signatureImage: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e, section, field) => {
        const { value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value
            }
        }));
    };

    const handleItemChange = (index, field, value) => {
        setFormData(prevData => ({
            ...prevData,
            items: prevData.items.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addItem = () => {
        setFormData(prevData => ({
            ...prevData,
            items: [
                ...prevData.items,
                { description: '', unitPrice: 0, quantity: 1, discount: 0, taxRate: 18 }
            ]
        }));
    };

    const removeItem = (index) => {
        setFormData(prevData => ({
            ...prevData,
            items: prevData.items.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="invoice-form">
            <h2>Seller Details</h2>
            <input
                type="text"
                placeholder="Name"
                value={formData.sellerDetails.name}
                onChange={(e) => handleChange(e, 'sellerDetails', 'name')}
                required
            />
            <input
                type="text"
                placeholder="Address"
                value={formData.sellerDetails.address}
                onChange={(e) => handleChange(e, 'sellerDetails', 'address')}
                required
            />
            <input
                type="text"
                placeholder="City"
                value={formData.sellerDetails.city}
                onChange={(e) => handleChange(e, 'sellerDetails', 'city')}
                required
            />
            <input
                type="text"
                placeholder="State"
                value={formData.sellerDetails.state}
                onChange={(e) => handleChange(e, 'sellerDetails', 'state')}
                required
            />
            <input
                type="text"
                placeholder="Pincode"
                value={formData.sellerDetails.pincode}
                onChange={(e) => handleChange(e, 'sellerDetails', 'pincode')}
                required
            />
            <input
                type="text"
                placeholder="PAN No."
                value={formData.sellerDetails.panNo}
                onChange={(e) => handleChange(e, 'sellerDetails', 'panNo')}
                required
            />
            <input
                type="text"
                placeholder="GST Registration No."
                value={formData.sellerDetails.gstNo}
                onChange={(e) => handleChange(e, 'sellerDetails', 'gstNo')}
                required
            />

            <h2>Billing Details</h2>
            <input
                type="text"
                placeholder="Name"
                value={formData.billingDetails.name}
                onChange={(e) => handleChange(e, 'billingDetails', 'name')}
                required
            />
            <input
                type="text"
                placeholder="Address"
                value={formData.billingDetails.address}
                onChange={(e) => handleChange(e, 'billingDetails', 'address')}
                required
            />
            <input
                type="text"
                placeholder="City"
                value={formData.billingDetails.city}
                onChange={(e) => handleChange(e, 'billingDetails', 'city')}
                required
            />
            <input
                type="text"
                placeholder="State"
                value={formData.billingDetails.state}
                onChange={(e) => handleChange(e, 'billingDetails', 'state')}
                required
            />
            <input
                type="text"
                placeholder="Pincode"
                value={formData.billingDetails.pincode}
                onChange={(e) => handleChange(e, 'billingDetails', 'pincode')}
                required
            />
            <input
                type="text"
                placeholder="State Code"
                value={formData.billingDetails.stateCode}
                onChange={(e) => handleChange(e, 'billingDetails', 'stateCode')}
                required
            />


            <h2>Shipping Details</h2>
            <input
                type="text"
                placeholder="Name"
                value={formData.shippingDetails.name}
                onChange={(e) => handleChange(e, 'shippingDetails', 'name')}
                required
            />
            <input
                type="text"
                placeholder="Address"
                value={formData.shippingDetails.address}
                onChange={(e) => handleChange(e, 'shippingDetails', 'address')}
                required
            />
            <input
                type="text"
                placeholder="City"
                value={formData.shippingDetails.city}
                onChange={(e) => handleChange(e, 'shippingDetails', 'city')}
                required
            />
            <input
                type="text"
                placeholder="State"
                value={formData.shippingDetails.state}
                onChange={(e) => handleChange(e, 'shippingDetails', 'state')}
                required
            />
            <input
                type="text"
                placeholder="Pincode"
                value={formData.shippingDetails.pincode}
                onChange={(e) => handleChange(e, 'shippingDetails', 'pincode')}
                required
            />
            <input
                type="text"
                placeholder="State Code"
                value={formData.shippingDetails.stateCode}
                onChange={(e) => handleChange(e, 'shippingDetails', 'stateCode')}
                required
            />


            <h2>Order Details</h2>
            <input
                type="text"
                placeholder="Order No."
                value={formData.orderDetails.orderNo}
                onChange={(e) => handleChange(e, 'orderDetails', 'orderNo')}
                required
            />
            <input
                type="date"
                value={formData.orderDetails.orderDate}
                onChange={(e) => handleChange(e, 'orderDetails', 'orderDate')}
                required
            />
            <input
                type="checkbox"
                checked={formData.reverseCharge}
                onChange={(e) => setFormData(prevData => ({
                    ...prevData, reverseCharge: e.target.checked
                }))}
            />
            <label htmlFor="reverseCharge">Reverse Charge</label>

            <h2>Invoice Details</h2>
            <input
                type="text"
                placeholder="Invoice No."
                value={formData.invoiceDetails.invoiceNo}
                onChange={(e) => handleChange(e, 'invoiceDetails', 'invoiceNo')}
                required
            />
            <input
                type="text"
                placeholder="Invoice Details"
                value={formData.invoiceDetails.invoiceDetails}
                onChange={(e) => handleChange(e, 'invoiceDetails', 'invoiceDetails')}
                required
            />
            <input
                type="date"
                value={formData.invoiceDetails.invoiceDate}
                onChange={(e) => handleChange(e, 'invoiceDetails', 'invoiceDate')}
                required
            />

            <h2>Signature Image</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            {formData.signatureImage && (
                <img
                    src={formData.signatureImage}
                    alt="Signature Preview"
                    style={{ maxWidth: '200px', maxHeight: '100px' }}
                />
            )}


            <h2>Items</h2>
            {formData.items.map((item, index) => (
                <div key={index} className="item-inputs">
                    <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Unit Price"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Discount"
                        value={item.discount}
                        onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value))}
                    />
                    <input
                        type="number"
                        placeholder="Tax Rate"
                        value={item.taxRate}
                        onChange={(e) => handleItemChange(index, 'taxRate', parseFloat(e.target.value))}
                        required
                    />
                    <button type="button" onClick={() => removeItem(index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={addItem}>Add Item</button>

            <button type="submit">Generate Invoice</button>
        </form>
    );
};

export default InvoiceForm;