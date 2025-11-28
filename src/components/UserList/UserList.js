import React, { useEffect, useState } from "react";

const UserList = () => {
    const [data, setData] = useState([]);
    const[searchText,setSearchText]=useState('');
    const[debouncedSearch,setDebouncedSearch]=useState('');
    useEffect(()=>{
        const timeInterval= setTimeout(()=>{

            setDebouncedSearch(searchText);
        },500)
        return ()=>clearInterval(timeInterval);

    },[searchText])

    async function getUserData() {
        try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const users = await response.json();
        setData(users);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const filterData= data.filter((user)=>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase)
    )

    return <>
    <input type="text" placeholder="Search user" onChange={(e)=>setSearchText(e.target.value)}/>
    <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Street</th>
            <th>Suite</th>
            <th>City</th>
            <th>Zipcode</th>
            <th>Company</th>
            </tr>
        </thead>

        <tbody>
            {filterData.map((value) => (
            <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.username}</td>
                <td>{value.email}</td>
                <td>{value.phone}</td>
                <td>{value.website}</td>
                <td>{value.address.street}</td>
                <td>{value.address.suite}</td>
                <td>{value.address.city}</td>
                <td>{value.address.zipcode}</td>
                <td>{value.company.name}</td>
            </tr>
            ))}
        </tbody>
    </table>

    
    </>;
};

export default UserList;
