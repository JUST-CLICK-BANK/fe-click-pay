// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CardInformation.css';
// import { createCardProduct } from '../api/CardApi';
// import axios from 'axios';

// export default function CardInformation() {
//     const navigate = useNavigate();
//     const [entry, setEntry] = useState({
//         cardProductName: "",
//         cardAnnualFee: "",
//         cardImg: null,
//         cardBenefits: ""
//     });
//     const [image, setImage] = useState('');
//     const [uploadURL, setUploadURL] = useState('');
//     const API_ENDPOINT = 'https://dsut3aszqe.execute-api.ap-northeast-2.amazonaws.com/test/cards/product';
//     const uploadImage = async () => {
//         try {
//           const response = await axios.get(API_ENDPOINT);
//           console.log('Response: ', response);
    
//           const binary = atob(image.split(',')[1]);
//           const array = [];
//           for (let i = 0; i < binary.length; i++) {
//             array.push(binary.charCodeAt(i));
//           }
//           const blobData = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    
//           console.log('Uploading to: ', response.data.uploadURL);
//           const result = await fetch(response.data.uploadURL, {
//             method: 'PUT',
//             body: blobData,
//           });
//           console.log('Result: ', result);
    
//           setUploadURL(response.data.uploadURL.split('?')[0]);
//         } catch (error) {
//           console.error('Upload failed', error);
//         }
//       };
    

//     // const uploadImage = async () => {
//     //     try {
//     //       const response = await axios.get(API_ENDPOINT);
//     //       console.log('Response: ', response);
    
//     //       const blob = await fetch(imageUri).then(r => r.blob());
    
//     //       const result = await fetch(response.data.uploadURL, {
//     //         method: 'PUT',
//     //         body: blob,
//     //         headers: {
//     //           'Content-Type': 'image/jpeg',
//     //         },
//     //       });
    
//     //       console.log('Result: ', result);
//     //       setUploadURL(response.data.uploadURL.split('?')[0]);
//     //     } catch (error) {
//     //       console.error('Upload failed', error);
//     //     }
//     //   };
    

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'cardImg') {
//             setEntry({ ...entry, [name]: files[0] });
//         } else {
//             setEntry({ ...entry, [name]: value });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = new FormData();
//             formData.append('cardProductRequest', JSON.stringify({
//                 cardProductName: entry.cardProductName,
//                 cardAnnualFee: entry.cardAnnualFee,
//                 cardBenefits: entry.cardBenefits,
//             }));
//             if (entry.cardImg) {
//                 formData.append('cardImg', entry.cardImg);
//             }
//             await createCardProduct(formData);
//             alert('카드 상품이 성공적으로 생성되었습니다.');
//             navigate('/'); 
//         } catch (error) {
//             console.error('Error creating card product:', error);
//             alert('카드 상품 생성에 실패했습니다.');
//         }
//     };

//     return (
//         <div className="container">
//             <form className="innerContainer" onSubmit={handleSubmit}>
//                 <div className="nameContainer">
//                     <h1 className="cardText">카드 상품</h1>
//                 </div>
//                 <div className="header">
//                     <div className="cardImageContainer">
//                         {/* <img className="cardImage" src="https://via.placeholder.com/150x250" alt="Card" /> */}
//                         <div className="fileInputContainer">
//                     {/* <input
//                         type="file"
//                         name="cardImg"
//                         onChange={handleChange}
//                         className="fileInput"
//                     /> */}
//                     <button onClick={uploadImage}>이미지 업로드</button>

//                 </div>
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
import { useNavigate } from 'react-router-dom';
import './CardInformation.css';
import { createCardProduct } from '../api/CardApi';
import axios from 'axios';

export default function CardInformation() {
    const navigate = useNavigate();
    const [entry, setEntry] = useState({
        cardProductName: "",
        cardAnnualFee: "",
        cardImg: null,
        cardBenefits: ""
    });

    // const API_ENDPOINT = 'https://dsut3aszqe.execute-api.ap-northeast-2.amazonaws.com/test2/cards/product';
    const API_ENDPOINT = "https://yxacaqq2yg.execute-api.ap-northeast-2.amazonaws.com/test/product"
    const uploadImage = async () => {
        try {
            const response = await axios.post(API_ENDPOINT);
            console.log('Response: ', response);

            const binary = atob(entry.cardImg.split(',')[1]);
            const array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            const blobData = new Blob([new Uint8Array(array)], { type: 'mutipart/form-data' });

            console.log('Uploading to: ', response.data.uploadURL);
            const result = await fetch(response.data.uploadURL, {
                method: 'PUT',
                body: blobData,
            });
            console.log('Result: ', result);

            const uploadedURL = response.data.uploadURL.split('?')[0];
            return uploadedURL;
        } catch (error) {
            console.error('Upload failed', error);
            return null;
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'cardImg' && files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEntry({ ...entry, cardImg: reader.result });
            };
            reader.readAsDataURL(files[0]);
        } else {
            setEntry({ ...entry, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = null;
            if (entry.cardImg) {
                imageUrl = await uploadImage();
                if (!imageUrl) {
                    alert('이미지 업로드에 실패했습니다.');
                    return;
                }
            }

            const formData = new FormData();
            formData.append('cardProductRequest', JSON.stringify({
                cardProductName: entry.cardProductName,
                cardAnnualFee: entry.cardAnnualFee,
                cardBenefits: entry.cardBenefits,
            }));
            if (imageUrl) {
                formData.append('cardImg', imageUrl);
            }
            
            await createCardProduct(formData);
            alert('카드 상품이 성공적으로 생성되었습니다.');
            navigate('/'); 
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
                            <input
                                type="file"
                                name="cardImg"
                                onChange={handleChange}
                                className="fileInput"
                                accept="image/jpeg"
                            />
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
