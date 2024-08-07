import axios from "axios";
import { useState } from "react";
import Loading from "../component/Loading";
import { useNavigate } from "react-router-dom";

const SERVER = "https://just-click.shop/api/v1/businesses";

const NewStore = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(
                SERVER,
                {
                    businessName: document.getElementById("input_name").value,
                    businessCeo: document.getElementById("input_ceo").value,
                    businessAccount: document.getElementById("input_account").value,
                    businessPassword: document.getElementById("input_password").value,
                }
            );
            navigate('/new/key', {state: {key: response.data, ceo: document.getElementById("input_ceo").value}});
        } catch (error) {
            console.log(error);
            alert('서버와 연결중 오류가 발생했습니다.');
        }
        document.getElementById("input_password").value = "";
        setLoading(false);
    }

    return (
        <>
            <div className='mainContatiner'>
                <div className='loginContainer'>
                    <div style={{textAlign:"center", fontSize:"32px", marginBottom:"28px"}}>
                        신규 가맹점 등록
                    </div>
                    <form
                        style={{display:"flex", alignItems:'center', flexDirection:"column", gap:"10px"}}
                        onSubmit={(e) => submit(e)}
                    >
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <label style={{width:"100px"}}>가맹점 이름</label>
                            <input style={{width:"243px", height:"20px"}} required id="input_name"/>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <label style={{width:"100px"}}>가맹점 대표</label>
                            <input style={{width:"243px", height:"20px"}} required id="input_ceo"/>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <label style={{width:"100px"}}>연동 계좌</label>
                            <input style={{width:"243px", height:"20px"}} required id="input_account" onChange={(e) => {e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <label style={{width:"100px"}}>비밀번호</label>
                            <input style={{width:"243px", height:"20px"}} required id="input_password" type="password"/>
                        </div>
                        <input
                            type="submit"
                            style={{width:"120px", height:"28px", marginTop:"20px", backgroundColor:"#fff", borderRadius:"3px", border:"1px solid gray", cursor:"pointer"}}
                            value={"가맹점 등록"}
                        />
                    </form>
                </div>
            </div>
            {isLoading? <Loading /> : ""}
        </>
    )
}
export default NewStore