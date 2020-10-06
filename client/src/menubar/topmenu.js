import React from 'react';
import {Menu} from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import 'antd/dist/antd.css';
import {Link} from  'react-router-dom';
import {BarChartOutlined,HeatMapOutlined} from '@ant-design/icons';

function Topmenu(){
    return (
        <Menu mode="horizontal" theme="dark">
            <MenuItem icon={<HeatMapOutlined />}>
                <Link to='/'>Rate Kicks</Link>
            </MenuItem>
            <MenuItem style={{float:"right"}}>Some Shit</MenuItem>
            <MenuItem style={{float:"right"}} icon={<BarChartOutlined/>} >
                <Link to='/ranks'>Rankings</Link>
            </MenuItem>
        </Menu>
    );
}

export default Topmenu;

//add flair
//highlight selected and shit 
//  https://codesandbox.io/s/238p1?file=/index.js:61-89
