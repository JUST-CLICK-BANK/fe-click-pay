import axios from 'axios';
import { useEffect, useState } from 'react';
import './MyInfo.css';
import Loading from "../component/Loading";

const SERVER = "https://payment.just-click.shop/api/v1/businesses";

const MyInfo = () => {
    const [onLoading, setOnLoading] = useState(true);
    const [storeData, setStoreData] = useState();
    const [urlData, setUrlData] = useState();
    const [insertUrl, setInsertUrl] = useState([]);
    const [deleteUrl, setDeleteUrl] = useState([]);

    // test data
    const testData1 = {
        id: "1234",
        name: "물팔이",
        ceo: "김선달",
        account: "123-123-123456",
    };
    const testData2 = [
        "http://192.168.0.99:8080",
        "http://localhost:8080",
        "https://easy-money.xyz",
    ];

    const checkValidUrl = (string) => {
        try {
            const getUrl = new URL(string);
            return getUrl.protocol == 'http:' || getUrl.protocol == 'https:';
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const addUrl = () => {
        const urlElement = document.getElementsByClassName('inputUrl').item(0);
        if (!checkValidUrl(urlElement.value)) {
            alert("유효한 주소를 입력 해 주세요.");
            return;
        }
        const editData = [...urlData];
        editData.push(urlElement.value);
        setUrlData(editData);
        const insertData = [...insertUrl];
        insertData.push(urlElement.value);
        setInsertUrl(insertData);
        urlElement.value = "";
    };

    const removeUrl = (index) => {
        const editData = [...urlData];
        const removedData = editData.splice(index, 1);
        setUrlData(editData);
        const insertData = [...insertUrl];
        if (insertData.includes(removedData[0])) {
            insertData.splice(insertData.indexOf(removedData[0]),1);
            setInsertUrl(insertData);
        } else {
            const deleteData = [...deleteUrl];
            deleteData.push(removedData[0]);
            setDeleteUrl(deleteData);
        }
    };

    const UrlList = (url, index) => {
        return (
            <div style={{display:'flex', flexDirection:'row', padding:'8px', paddingBottom:'0px'}} key={index}>
                <div style={{flex:1}}>{url}</div>
                <div className='inputUrlButton' onClick={() => removeUrl(index)}>삭제</div>
            </div>
        );
    }

    const sendUpdataData = async (e) => {
        e.preventDefault();
        setOnLoading(true);
        try {
            deleteUrl.forEach(async (e) => {
                const response = await axios.delete(SERVER+"/redirect/"+storeData.id);
            });

            insertUrl.forEach(async () => {
                const request = {
                    businessId: storeData.id,
                    redirUrl: e
                }
                const response = await axios.post(SERVER+"/redirect", request);
            });

            const request = {
                businessName: storeData.name,
                businessCeo: storeData.ceo,
                businessAccount: storeData.account,
            }
            const response = await axios.put(SERVER+"/"+storeData.id, request);

            alert('정보가 업데이트 되었습니다.');

        } catch (error) {
            console.log(error);
            alert('서버와 연결중 오류가 발생했습니다.');
        }
        setOnLoading(false);
    }

    const getData = async () => {
        try {
            // const response = await axios.get(SERVER+"");
            const response = testData1;
            setStoreData(response);
        } catch (error) {
            console.log(error);
            alert('서버와 연결중 오류가 발생했습니다.');
        }
        try {
            // const response = await axios.get(SERVER+"");
            const response = testData2;
            setUrlData(response);
        } catch (error) {
            console.log(error);
            alert('서버와 연결중 오류가 발생했습니다.');
        }
        setOnLoading(false);
    }

    useEffect(() => {
        getData();
    },[])

    return (
        <div className='infoMainContatiner'>
            <form className='infoContainer' onSubmit={(e) => sendUpdataData(e)}>
                <div className='infoName'>
                    가맹점 이름
                </div>
                <input id='storeName' className='inputText' defaultValue={storeData?.name}/>
                <div className='infoName'>
                    가맹점 대표
                </div>
                <input id='storeCeo' className='inputText' defaultValue={storeData?.ceo}/>
                <div className='infoName'>
                    연동 계좌
                </div>
                <input id='storeAccount' className='inputText' defaultValue={storeData?.account}/>
                <div className='infoName'>
                    등록된 Redirect URL
                </div>
                <div className='urlContainer'>
                    {urlData?.map(UrlList)}
                    <div style={{display:'flex', flexDirection:'row', padding:'8px'}}>
                        <input className='inputUrl'/>
                        <div className='inputUrlButton' onClick={addUrl}>추가</div>
                    </div>
                </div>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <input
                        className='submitButton'
                        type="submit"
                        value={"변경내역 저장"}
                    />
                </div>
            </form>
            {onLoading? <Loading /> : ""}
        </div>
    )
}
export default MyInfo