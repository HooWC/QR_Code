import React, { useState } from 'react';
import axios from 'axios';
import './QRCodeGenerator.css';  // 引入 CSS 文件

const QRCodeGenerator = () => {
    const [url, setUrl] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setUrl(event.target.value);
    };

    const generateQRCode = async () => {
        const fullUrl = `https://${url}.com`;

        try {
            setError('');
            setQrCodeUrl('');

            // 使用 GoQR.me API 来生成二维码
            const response = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(fullUrl)}&size=150x150`);

            // 判断返回的 URL 是否有效
            if (response.config.url) {
                setQrCodeUrl(response.config.url);
            } else {
                setError('Error generating QR code');
            }
        } catch (error) {
            setError('Error generating QR code');
            console.error("Error generating QR code:", error);
        }
    };

    return (
        <div className="qr-code-generator">
            <h1>QR Code Generator</h1>
            <input
                type="text"
                placeholder="Enter domain name"
                value={url}
                onChange={handleInputChange}
            />
            <button onClick={generateQRCode}>Generate QR Code</button>
            {error && <p>{error}</p>}
            {qrCodeUrl && (
                <div>
                    <h2>Your QR Code:</h2>
                    <img src={qrCodeUrl} alt="QR Code" />
                </div>
            )}
        </div>
    );
};

export default QRCodeGenerator;
