import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";

const useCustomHooks=(url)=>{

    const[data,setData] =useState(null);
    const[loading,setLoading]=useState(true);

    async function getData(url){
        try {
            setLoading(false);
            const response = await fetch(url);
            const data= await response.json();
            setData(data);
            setLoading(true);

            
        } catch (error) {
            setLoading(true)
            
        }
        
        

    }

    useEffect(()=>{
        getData(url)

    },[url]);


    useEffect(()=>{
        fetch(url)
        .then(res=>res.json)
        .then(data=>{
            setData(data);
            setLoading(false);
        })

    },[url])


    return{data,loading}
}

export default useCustomHooks;


const myComponent = React.lazy(()=>import("./CustomHooks"))


