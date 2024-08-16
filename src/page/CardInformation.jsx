import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardInformation.css';
import { createCardProduct } from '../api/CardApi';

export default function CardInformation() {
    const navigate = useNavigate();
    const [entry, setEntry] = useState({
        cardProductName: "",
        cardAnnualFee: "",
        cardImg: null,
        cardBenefits: ""
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'cardImg') {
            setEntry({ ...entry, [name]: files[0] });
        } else {
            setEntry({ ...entry, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('cardProductRequest', JSON.stringify({
                cardProductName: entry.cardProductName,
                cardAnnualFee: entry.cardAnnualFee,
                cardBenefits: entry.cardBenefits,
            }));
            if (entry.cardImg) {
                formData.append('cardImg', entry.cardImg);
            }
            await createCardProduct(formData);
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
                        {/* <img className="cardImage" src="https://via.placeholder.com/150x250" alt="Card" /> */}
                        <div className="fileInputContainer">
                    <input
                        type="file"
                        name="cardImg"
                        onChange={handleChange}
                        className="fileInput"
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



