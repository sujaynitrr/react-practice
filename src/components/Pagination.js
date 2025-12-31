import React, { useEffect, useState } from 'react';

const ProductCard =({image,title})=>{
    return(
        <>
            <div>
                <img src={image} alt={title}/>
                <span>{title}</span>
            </div>
        </>
    )
}

const Pagination=()=>{
    const[products,setProducts]=useState([]);
    const[currentPage,setCurrentPage]=useState(0);

    async function fetchData(){
        const response = await fetch("https://dummyjson.com/products?limit=500");
        const data = await response.json()
        setProducts(data?.products)
    }

    useEffect(()=>{
        fetchData()
    },[]);

    useEffect(()=>{
        console.log(products,"data")

    },[products])
    const PAGE_SIZE=10;

    const totalProducts= products.length;
    const noOfPage= Math.ceil(totalProducts/PAGE_SIZE);
    const start = currentPage + PAGE_SIZE;
    const end = start+PAGE_SIZE;

    const goToNextPage=()=>{
        setCurrentPage((prev)=>prev+1);
    }
    const goToPreviousPage=()=>{
        setCurrentPage((prev)=>prev-1)
    }

    const handleOnChange=(n)=>{
        setCurrentPage(n)

    }


    return(
        <>
            <h1>Pagination</h1>
            {!products.length ?(<>
            <h4>Products not  found</h4>

            </>):(<>
                <div>
                    <div>
                        <button disabled ={currentPage===0} onClick={()=>goToPreviousPage()}>Prev</button>
                        {
                            [...Array(noOfPage).keys()].map((n)=>(
                                <button onClick={()=>handleOnChange(n)}>{n}</button>
                            ))
                        }

                        <button disabled={currentPage === noOfPage} onClick={()=>goToNextPage()}>next</button>
                    </div>
                    <div>
                        {
                            products.slice(start,end).map((p)=>(
                                <ProductCard key ={p.id} image={p.thumbnail} title={p.title}/>
                            ))
                        }
                    </div>
                </div>
            
            </>)}
        </>
    )
}

export default Pagination;

