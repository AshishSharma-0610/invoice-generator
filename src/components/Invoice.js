import React from 'react';
import { usePDF } from 'react-to-pdf';
import '../styles/Invoice.css';

const Invoice = ({ data }) => {
    const { toPDF, targetRef } = usePDF({ filename: 'invoice.pdf' });

    const calculateNetAmount = (item) => {
        return item.unitPrice * item.quantity - item.discount;
    };

    const calculateTaxAmount = (item) => {
        return calculateNetAmount(item) * (item.taxRate / 100);
    };

    const calculateTotalAmount = (item) => {
        return calculateNetAmount(item) + calculateTaxAmount(item);
    };

    const totalAmount = data.items.reduce((sum, item) => sum + calculateTotalAmount(item), 0);
    const numberToWords = (number) => {
        const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        function convert(n) {
            if (n < 10) return units[n];
            if (n < 20) return teens[n - 10];
            if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
            if (n < 1000) return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convert(n % 100) : '');
            return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + convert(n % 1000) : '');
        }

        const wholePart = Math.floor(number);
        const decimalPart = Math.round((number - wholePart) * 100);

        let result = convert(wholePart) + ' Rupees';
        if (decimalPart > 0) {
            result += ' and ' + convert(decimalPart) + ' Paise';
        }

        return result;
    };

    return (
        <div className="invoice-container">
            <div className="invoice" ref={targetRef}>
                <div className="header">
                    <div className="logo-placeholder">
                        {data.logoUrl ? (
                            <img src={data.logoUrl} alt="Company Logo" />
                        ) : (
                            <div className="placeholder-text">Company Logo</div>
                        )}
                    </div>
                    <div className="invoice-type">
                        <h2>Tax Invoice/Bill of Supply/Cash Memo</h2>
                        <p>(Original for Recipient)</p>
                    </div>
                </div>

                <div className="invoice-body">
                    <div className="seller-details">
                        <h3>Sold By:</h3>
                        <p>{data.sellerDetails.name}</p>
                        <p>{data.sellerDetails.address}</p>
                        <p>{data.sellerDetails.city}, {data.sellerDetails.state}, {data.sellerDetails.pincode}</p>
                        <p>PAN No: {data.sellerDetails.panNo}</p>
                        <p>GST Registration No: {data.sellerDetails.gstNo}</p>
                    </div>

                    <div className="buyer-details">
                        <div className="billing-address">
                            <h3>Billing Address:</h3>
                            <p>{data.billingDetails.name}</p>
                            <p>{data.billingDetails.address}</p>
                            <p>{data.billingDetails.city}, {data.billingDetails.state}, {data.billingDetails.pincode}</p>
                            <p>State/UT Code: {data.billingDetails.stateCode}</p>
                        </div>
                        <div className="shipping-address">
                            <h3>Shipping Address:</h3>
                            <p>{data.shippingDetails.name}</p>
                            <p>{data.shippingDetails.address}</p>
                            <p>{data.shippingDetails.city}, {data.shippingDetails.state}, {data.shippingDetails.pincode}</p>
                            <p>State/UT Code: {data.shippingDetails.stateCode}</p>
                        </div>
                    </div>

                    <div className="order-details">
                        <p>Order Number: {data.orderDetails.orderNo}</p>
                        <p>Order Date: {data.orderDetails.orderDate}</p>
                        <p>Invoice Number: {data.invoiceDetails.invoiceNo}</p>
                        <p>Invoice Details: {data.invoiceDetails.invoiceDetails}</p>
                        <p>Invoice Date: {data.invoiceDetails.invoiceDate}</p>
                        <p>Place of Supply: {data.placeOfSupply}</p>
                        <p>Place of Delivery: {data.placeOfDelivery}</p>
                    </div>

                    <table className="items-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Discount</th>
                                <th>Net Amount</th>
                                <th>Tax Rate</th>
                                <th>Tax Amount</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.description}</td>
                                    <td>₹{item.unitPrice.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.discount.toFixed(2)}</td>
                                    <td>₹{calculateNetAmount(item).toFixed(2)}</td>
                                    <td>{item.taxRate}%</td>
                                    <td>₹{calculateTaxAmount(item).toFixed(2)}</td>
                                    <td>₹{calculateTotalAmount(item).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="7" align="right"><strong>Total:</strong></td>
                                <td><strong>₹{totalAmount.toFixed(2)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="footer">
                        <p><strong>Amount in Words:</strong> {numberToWords(totalAmount)}</p>
                        <p>Reverse Charge: {data.reverseCharge}</p>
                        <div className="signature">
                            <p>For {data.sellerDetails.name}:</p>
                            {data.signatureImage ? (
                                <img src={data.signatureImage} alt="Authorized Signature" />
                            ) : (
                                <div className="signature-placeholder">Authorized Signature</div>
                            )}
                            <p>Authorized Signatory</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="download-button-container">
                <button onClick={() => toPDF()}>Download PDF</button>
            </div>
        </div>
    );
};

export default Invoice;