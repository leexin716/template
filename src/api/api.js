import { get, post } from './http';

export const getList = p => get('area/cityArea', p);//获取列表

export const getLists = p => post('area/cityArea', p);


// const array = [
//     {
//         name:'login',
//         method:'post',
//         url:'mall/diversion/login'
//     },
//     {
//         name:'getList',
//         method:'get',
//         url:'mall/diversion/list'
//     }
// ]
