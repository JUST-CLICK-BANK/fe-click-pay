
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CardInformation.css';
// import { createCardProduct } from '../api/CardApi';
// import axios from 'axios';
// import AWS from "aws-sdk"

// export default function CardInformation() {
//     const navigate = useNavigate();
//     const [entry, setEntry] = useState({
//         cardProductName: "",
//         cardAnnualFee: "",
//         cardImg: null,
//         cardBenefits: ""
//     });
//     // const [selectedFile, setSelectedFile] = useState(null);

//     // // AWS S3 설정
//     // AWS.config.update({
//     //     accessKeyId: process.env.ACCESSKEYID,
//     //     secretAccessKey:process.env.SECRETACCESSKEY,
//     //     region: process.env.REGION
//     // });

//     const s3 = new AWS.S3();

//     // 이미지 파일을 S3에 업로드하는 함수
//     const uploadImageToS3 = async () => {
//         const uploadParams = {
//             Bucket: 'click-card',  // S3 버킷 이름 입력
//             Key: `folder/${selectedFile.name}`, // S3에 저장될 경로와 파일명
//             Body: selectedFile,
//         };

//         try {
//             const data = await s3.upload(uploadParams).promise();
//             console.log('파일이 성공적으로 업로드되었습니다:', data.Location);
//             return data.Location; // 업로드된 파일의 URL 반환
//         } catch (err) {
//             console.error('파일 업로드 중 오류 발생:', err);
//             return null;
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'cardImg' && files.length > 0) {
//             setSelectedFile(files[0]);
//         } else {
//             setEntry({ ...entry, [name]: value });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             let imageUrl = null;
//             if (selectedFile) {
//                 imageUrl = await uploadImageToS3();
//                 if (!imageUrl) {
//                     alert('이미지 업로드에 실패했습니다.');
//                     return;
//                 }
//             }

//             const formData = new FormData();
//             formData.append('cardProductRequest', JSON.stringify({
//                 cardProductName: entry.cardProductName,
//                 cardAnnualFee: entry.cardAnnualFee,
//                 cardBenefits: entry.cardBenefits,
//             }));
//             if (imageUrl) {
//                 formData.append('cardImg', imageUrl);
//             }
            
//             await axios.post('https://your-api-endpoint/cards/product', formData);
//             alert('카드 상품이 성공적으로 생성되었습니다.');
//             navigate('/');
//         } catch (error) {
//             console.error('카드 상품 생성 중 오류 발생:', error);
//             alert('카드 상품 생성에 실패했습니다.');
//         }
//     };


//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploadStatus, setUploadStatus] = useState('');

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             setUploadStatus('No file selected');
//             return;
//         }

//         const reader = new FileReader();
//         reader.onloadend = async () => {
//             const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

//             try {
//                 const response = await fetch('https://your-api-endpoint/cards/product', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ image: base64String })
//                 });

//                 const data = await response.json();

//                 if (response.ok) {
//                     setUploadStatus('Image uploaded successfully: ' + data.key);
//                 } else {
//                     setUploadStatus('Image upload failed: ' + data.message);
//                 }
//             } catch (error) {
//                 setUploadStatus('Image upload failed: ' + error.message);
//             }
//         };

//         reader.readAsDataURL(selectedFile);
//     };

//     return (
//         <div className="container">
//             <form className="innerContainer" onSubmit={handleSubmit}>
//                 <div className="nameContainer">
//                     <h1 className="cardText">카드 상품</h1>
//                 </div>
//                 <div className="header">
//                     <div className="cardImageContainer">
//                         <div className="fileInputContainer">
//                             <input
//                                 type="file"
//                                 name="cardImg"
//                                 onChange={handleChange}
//                                 className="fileInput"
//                                 accept="image/jpeg"
//                             />
//                             {/* <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload Image</button>
//             <p>{uploadStatus}</p> */}
//                         </div>
//                     </div>
//                     <div className="cardInformation">
//                         <div className="cardContainer">
//                             <h2 className="cardName">카드명</h2>
//                             <input
//                                 type="text"
//                                 name="cardProductName"
//                                 value={entry.cardProductName}
//                                 onChange={handleChange}
//                                 placeholder="카드명을 입력하세요"
//                                 className="inputField"
//                             />
//                             <p className="cardDescription">카드 설명</p>
//                         </div>
//                         <div className="cardBenefits">
//                             <p className="cardBenefitsText">카드 혜택</p>
//                             <input
//                                 type="text"
//                                 name="cardBenefits"
//                                 value={entry.cardBenefits}
//                                 onChange={handleChange}
//                                 placeholder="카드 혜택을 입력하세요"
//                                 className="inputField"
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="feeContainer">
//                     <span className="feeText">연회비</span>
//                     <input
//                         type="text"
//                         name="cardAnnualFee"
//                         value={entry.cardAnnualFee}
//                         onChange={handleChange}
//                         placeholder="연회비를 입력하세요"
//                         className="feeInput"
//                     />
//                 </div>
//                 <textarea
//                     className="cardDetailDescription"
//                     readOnly
//                     value="카드 상세 설명"
//                 />
//                 <button className="applyButton" type="submit">
//                     <span className="applyButtonText">신청하기</span>
//                 </button>
//             </form>
//         </div>
//     );
// }

import React, { useState } from 'react';
import axios from 'axios';

export default function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('No file selected');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            const fileName = selectedFile.name;

            try {
                const response = await axios.post('https://yxacaqq2yg.execute-api.ap-northeast-2.amazonaws.com/cards/product', {
                    file: fileName,
                    content: base64String,
                    contentType: selectedFile.type // 파일의 MIME 타입
                });

                if (response.status === 200) {
                    setUploadStatus('Image uploaded successfully: ' + response.data.file);
                } else {
                    setUploadStatus('Image upload failed: ' + response.data.error);
                }
            } catch (error) {
                setUploadStatus('Image upload failed: ' + error.message);
            }
        };

        reader.readAsDataURL(selectedFile);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
            <p>{uploadStatus}</p>
        </div>
    );
}
