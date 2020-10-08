import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Topmenu from '../menubar/topmenu'
import 'antd/dist/antd.css';
import './home.css'
import ShoeContainer from './ShoeContainer'

const { Header, Content, Footer } = Layout;

function Landing() {
    const [data,setData] = useState(null);
    const[loading,setLoading] = useState(true);
    const uid = "user10000";

    useEffect(()=>{
        fetch('/api/sneakers/')
            .then(reply => reply.json())
            .then(jsonData => {
                console.log(jsonData);
                setData(jsonData);
                setLoading(false);
            })
            .catch(error => console.log(error))
    },[]);

    //call api using use effect 
    const leftClick = () => {
        const postData = {
            winner:data[0].id,
            loser:data[1].id,
            uid:uid
        };
        const dataCopy = data;
        
        fetch('/api/vote/',{
            method:'POST',
            cache:'no-cache',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(postData)
        }).then(reply => console.log(reply));

        fetch(`api/recommend?sneaker=${postData.winner}&uid=${uid}`)
            .then(reply=>reply.json())
            .then(jsonData=>{
                const winner = dataCopy[0];
                setData([winner,jsonData]);
                console.log(jsonData);
            })
            .catch(error => console.log(error));

        console.log("left click")
    }

    const rightClick = () =>{
        //setLoading(true);
        const postData = {
            winner:data[1].id,
            loser:data[0].id,
            uid:uid
        };
        const dataCopy = data;

        fetch('/api/vote/',{
            method:'POST',
            cache:'no-cache',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(postData)
        }).then(reply => console.log(reply));

        fetch(`api/recommend?sneaker=${postData.winner}&uid=${uid}`)
            .then(reply=>reply.json())
            .then(jsonData=>{
                const winner = dataCopy[1];
                setData([jsonData,winner]);
                console.log(jsonData);
            })
            .catch(error => console.log(error));

        console.log("right click");    
    }

    return (
        <Layout style={{ backgroundColor: "white" }}>
            <Header>
                <Topmenu />
            </Header>
            <Content>
                <div className="preach">
                    <h1>Left or Right , Bitch ?</h1>
                </div>
                <div className="holy-div">
                    {loading ? <div>loading</div> : <ShoeContainer shoe1={data[0]} shoe2={data[1]} leftClick={leftClick} rightClick={rightClick}/>}
                </div>
            </Content>
        </Layout>
    );
}

export default Landing;
