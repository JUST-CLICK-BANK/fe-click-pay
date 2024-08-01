import axios from "axios";
import ClickLogo from '../component/logo';
import './Login.css';
import { useState } from "react";
import Loading from "../component/Loading";

const URL = "https://payment.just-click.shop/api/v1/payment";

const Login = () => {
    const [isLoading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(
                URL+"",
                {
                    name: document.getElementById("input_name").value,
                    text: document.getElementById("input_password").value,
                }
            );
            console.log(response.data);
            document.getElementById("input_password").value = "";
        } catch (error) {
            console.log(error);
            alert('서버와 연결중 오류가 발생했습니다.');
        }
        setLoading(false);
    }

    return (
        <>
            <div className='mainContatiner'>
                <ClickLogo />
                <div className='loginContainer'>
                    <form
                        style={{display:"flex", alignItems:'center', flexDirection:"column", gap:"10px"}}
                        onSubmit={(e) => submit(e)}
                    >
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <label style={{width:"100px"}}>가맹점 이름</label>
                            <input style={{width:"243px", height:"20px"}} required id="input_name"/>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <label style={{width:"100px"}}>비밀번호</label>
                            <input style={{width:"243px", height:"20px"}} required id="input_password" type="password"/>
                        </div>
                        <input
                            type="submit"
                            style={{width:"80px", height:"28px", marginTop:"20px", backgroundColor:"#fff", borderRadius:"3px", cursor:"pointer"}}
                            value={"로그인"}
                        />
                    </form>
                </div>
            </div>
            {isLoading? <Loading /> : ""}
        </>
    )
}
export default Login