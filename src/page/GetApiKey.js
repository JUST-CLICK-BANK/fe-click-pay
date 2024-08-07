import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GetApiKey = () => {
    const navigate = useNavigate();
    const { key, ceo } = {...useLocation().state};
    const [ nextButtonState, setNextButtonState ] = useState(true);

    setTimeout(() => {
        setNextButtonState(false);
    }, 2000);

    return (
        <div className='mainContatiner'>
            <div className='loginContainer'>
                <div style={{fontSize:"36px", fontWeight:"500", marginBottom:"40px"}}>
                    {`${ceo}님, 가맹점 등록을 환영합니다!`}
                </div>
                <div style={{display:"flex", alignItems:"center", flexDirection:"column", fontSize:"20px"}}>
                    <div style={{marginBottom:"10px"}}>
                        API 키
                    </div>
                    <div style={{fontSize:"22px", fontWeight:"600", textAlign:"center", borderRadius:"10px", backgroundColor:"#eee", padding:"10px", paddingLeft:"16px", paddingRight:"16px", width:"fit-content"}}>
                        {key}
                    </div>
                </div>
                <div style={{color:"red", fontSize:"20px", fontWeight:"600", textAlign:"center", marginTop:"36px"}}>
                    이 페이지를 벗어나면 API키를 다시 확인할 수 없습니다.
                </div>
                
                <div style={{display:"flex", alignItems:"center", flexDirection:"column", fontSize:"20px"}}>
                    <button 
                        onClick={() => navigate('/login')}
                        style={{width:"160px", height:"32px", marginTop:"40px", backgroundColor:"#fff", borderRadius:"3px", border:"1px solid gray", cursor:"pointer"}}
                        disabled={nextButtonState}
                    >
                        로그인 페이지로 이동
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GetApiKey;
