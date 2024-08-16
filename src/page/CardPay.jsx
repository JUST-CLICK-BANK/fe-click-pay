import './CardPay.css';
import { useNavigate } from "react-router-dom";

export default function CardPay() {
    const navigate = useNavigate();
    return(
        <div className="container">
            <button onClick={() => {navigate('/login')}} className="login">
              페이 로그인
            </button>
            <button onClick={() => {navigate('/card-login')}} className="card">
              카드 상품 등록
            </button>
        </div>
    );
}
