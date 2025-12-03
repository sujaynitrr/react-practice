// import React, { useEffect, useState } from "react";

// const UserList = () => {
//     const [data, setData] = useState([]);
//     const[searchText,setSearchText]=useState('');
//     const[debouncedSearch,setDebouncedSearch]=useState('');
//     useEffect(()=>{
//         const timeInterval= setTimeout(()=>{

//             setDebouncedSearch(searchText);
//         },500)
//         return ()=>clearInterval(timeInterval);

//     },[searchText])

//     async function getUserData() {
//         try {
//         const response = await fetch("https://jsonplaceholder.typicode.com/users");
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         const users = await response.json();
//         setData(users);
//         } catch (error) {
//         console.error("Error fetching data:", error);
//         }
//     }

//     useEffect(() => {
//         getUserData();
//     }, []);

//     useEffect(() => {
//         console.log(data);
//     }, [data]);

//     const filterData= data.filter((user)=>
//         user.name.toLowerCase().includes(debouncedSearch.toLowerCase)
//     )

//     return <>
//     <input type="text" placeholder="Search user" onChange={(e)=>setSearchText(e.target.value)}/>
//     <table>
//         <thead>
//             <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Website</th>
//             <th>Street</th>
//             <th>Suite</th>
//             <th>City</th>
//             <th>Zipcode</th>
//             <th>Company</th>
//             </tr>
//         </thead>

//         <tbody>
//             {filterData.map((value) => (
//             <tr key={value.id}>
//                 <td>{value.id}</td>
//                 <td>{value.name}</td>
//                 <td>{value.username}</td>
//                 <td>{value.email}</td>
//                 <td>{value.phone}</td>
//                 <td>{value.website}</td>
//                 <td>{value.address.street}</td>
//                 <td>{value.address.suite}</td>
//                 <td>{value.address.city}</td>
//                 <td>{value.address.zipcode}</td>
//                 <td>{value.company.name}</td>
//             </tr>
//             ))}
//         </tbody>
//     </table>

    
//     </>;
// };

// export default UserList;


import React, { useContext, useEffect, useState } from 'react';


const UserList=()=>{
    // const{user}=useContext(myCon)
const[data,setData]=useState();
const[isLoading,setIsLoading]=useState(false);
const[searchText,setSearchText]=useState('');
const[debounce,setDebounce]=useState('')
    async function getUser(){
        try {
        setIsLoading(true);
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setData(data);
        setIsLoading(false);
            
        } catch (error) {
            setIsLoading(false)
            
        }
        

    }
    
    useEffect(()=>{
        getUser();
    },[])

    useEffect(()=>{
        const timeId =setTimeout(()=>{
            setDebounce(searchText)
        },500)

        return ()=>clearTimeout(timeId)

    },[searchText])

    const filterdata = data?.filter((user)=>user.name.toLowerCase().includes(debounce.toLowerCase()));
    return(
        <>
        <input placeholder='Search' onChange={(e)=>setSearchText(e.target.value)}/>
        <h4>{user}</h4>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                </tr>
                {
                    filterdata?.map((user)=>(
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.address.city}</td>
                        </tr>
                    ))
                }
            </thead>
        </table>
        </>
    )
}

export default UserList;
