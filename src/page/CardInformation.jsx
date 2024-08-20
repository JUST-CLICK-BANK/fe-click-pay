
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardInformation.css';
import { createCardProduct } from '../api/CardApi';
import axios from 'axios';
// import AWS from "aws-sdk"

export default function CardInformation() {
    const navigate = useNavigate();
    const [entry, setEntry] = useState({
        cardProductName: "",
        cardAnnualFee: "",
        cardImg: null,
        cardBenefits: ""
    });
    const [selectedFile, setSelectedFile] = useState(null);
        const [uploadStatus, setUploadStatus] = useState('');
    
        const handleFileChange = (event) => {
            setSelectedFile(event.target.files[0]);
        };
    
        // const handleUpload = async () => {
        //     if (!selectedFile) {
        //         setUploadStatus('No file selected');
        //         return;
        //     }
    
        //     const formData = new FormData();
        //     formData.append('file', selectedFile);  // 'file'은 Lambda 함수에서 처리할 키와 동일해야 합니다.
    
        //     try {
        //         const response = await axios.post('https://yxacaqq2yg.execute-api.ap-northeast-2.amazonaws.com/cards/product', formData, {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         });
    
        //         if (response.status === 200) {
        //             setUploadStatus('Image uploaded successfully: ' + response.data.url);
        //         } else {
        //             setUploadStatus('Image upload failed: ' + response.data.error);
        //         }
        //     } catch (error) {
        //         setUploadStatus('Image upload failed: ' + error.message);
        //     }
        // };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'cardImg' && files.length > 0) {
            setSelectedFile(files[0]);
        } else {
            setEntry({ ...entry, [name]: value });
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const formData = new FormData();
    //         formData.append('cardProductRequest', JSON.stringify({
    //             cardProductName: entry.cardProductName,
    //             cardAnnualFee: entry.cardAnnualFee,
    //             cardBenefits: entry.cardBenefits,
    //             // cardImg: entry.cardImg

    //         }));
    //         if (entry.cardImg) {
    //             formData.append('cardImg', entry.cardImg);
    //         }
    //         await createCardProduct(formData);
    //         alert('카드 상품이 성공적으로 생성되었습니다.');
    //         navigate('/'); // 원하는 경로로 이동
    //     } catch (error) {
    //         console.error('Error creating card product:', error);
    //         alert('카드 상품 생성에 실패했습니다.');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = null;
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                const uploadResponse = await axios.post('https://yxacaqq2yg.execute-api.ap-northeast-2.amazonaws.com/cards/product', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (uploadResponse.status === 200) {
                    imageUrl = uploadResponse.data.url;
                    setUploadStatus('Image uploaded successfully: ' + imageUrl);
                } else {
                    setUploadStatus('Image upload failed: ' + uploadResponse.data.error);
                    return;
                }
            }

            // 이미지 URL을 entry 상태에 저장
            setEntry((prevEntry) => ({
                ...prevEntry,
                cardImg: imageUrl
            }));

            // 서버에 최종 데이터 제출
            const finalData = {
                cardProductName: entry.cardProductName,
                cardAnnualFee: entry.cardAnnualFee,
                cardBenefits: entry.cardBenefits,
                cardImg: imageUrl // 업로드된 이미지의 URL 포함
            };

            await createCardProduct(finalData);
            alert('카드 상품이 성공적으로 생성되었습니다.');
            navigate('/'); // 원하는 경로로 이동
        } catch (error) {
            console.error('Error creating card product:', error);
            alert('카드 상품 생성에 실패했습니다.');
        }
    };



    return (
        <div className="container">
            <form className="innerContainer" onSubmit={handleSubmit}>
                <div className="nameContainer">
                    <h1 className="cardText">카드 상품</h1>
                </div>
                <div className="header">
                    <div className="cardImageContainer">
                        <div className="fileInputContainer">
                            {/* <input
                                type="file"
                                name="cardImg"
                                onChange={handleChange}
                                className="fileInput"
                                accept="image/jpeg"
                            /> */}
                            {/* <input type="file" onChange={handleFileChange} />
                            <button onClick={handleUpload}>Upload Image</button>
                            <p>{uploadStatus}</p> */}
                             <input 
                                type="file" 
                                name="cardImg" 
                                onChange={handleChange} 
                                className="fileInput" 
                                accept="image/jpeg"
                            />
                            <p>{uploadStatus}</p>
                        </div>
                    </div>
                    <div className="cardInformation">
                        <div className="cardContainer">
                            <h2 className="cardName">카드명</h2>
                            <input
                                type="text"
                                name="cardProductName"
                                value={entry.cardProductName}
                                onChange={handleChange}
                                placeholder="카드명을 입력하세요"
                                className="inputField"
                            />
                            <p className="cardDescription">카드 설명</p>
                        </div>
                        <div className="cardBenefits">
                            <p className="cardBenefitsText">카드 혜택</p>
                            <input
                                type="text"
                                name="cardBenefits"
                                value={entry.cardBenefits}
                                onChange={handleChange}
                                placeholder="카드 혜택을 입력하세요"
                                className="inputField"
                            />
                        </div>
                    </div>
                </div>
                <div className="feeContainer">
                    <span className="feeText">연회비</span>
                    <input
                        type="text"
                        name="cardAnnualFee"
                        value={entry.cardAnnualFee}
                        onChange={handleChange}
                        placeholder="연회비를 입력하세요"
                        className="feeInput"
                    />
                </div>
                <textarea
                    className="cardDetailDescription"
                    readOnly
                    value="카드 상세 설명"
                />
                <button className="applyButton" type="submit">
                    <span className="applyButtonText">신청하기</span>
                </button>
            </form>
        </div>
    );
}

// import React, { useState } from 'react';
// import axios from 'axios';

// export default function ImageUpload() {
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
//             const fileName = selectedFile.name;

//             try {
//                 const response = await axios.post('https://yxacaqq2yg.execute-api.ap-northeast-2.amazonaws.com/cards/product', {
//                     file: fileName,
//                     // headers:
//                     // content: base64String,
//                     // contentType: selectedFile.type // 파일의 MIME 타입
//                 });

//                 if (response.status === 200) {
//                     setUploadStatus('Image uploaded successfully: ' + response.data.file);
//                 } else {
//                     setUploadStatus('Image upload failed: ' + response.data.error);
//                 }
//             } catch (error) {
//                 setUploadStatus('Image upload failed: ' + error.message);
//             }
//         };

//         reader.readAsDataURL(selectedFile);
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload Image</button>
//             <p>{uploadStatus}</p>
//         </div>
//     );
// }

// import React, { useState } from 'react';
// import axios from 'axios';

// export default function ImageUpload() {
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

//         const formData = new FormData();
//         formData.append('file', selectedFile);  // 'file'은 Lambda 함수에서 처리할 키와 동일해야 합니다.

//         try {
//             const response = await axios.post('https://yxacaqq2yg.execute-api.ap-northeast-2.amazonaws.com/cards/product', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             if (response.status === 200) {
//                 setUploadStatus('Image uploaded successfully: ' + response.data.url);
//             } else {
//                 setUploadStatus('Image upload failed: ' + response.data.error);
//             }
//         } catch (error) {
//             setUploadStatus('Image upload failed: ' + error.message);
//         }
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload Image</button>
//             <p>{uploadStatus}</p>
//         </div>
//     );
// }

