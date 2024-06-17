import { useEffect, useState } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersPage = () => {
    const [users, setUsers] = useState([])

   useEffect(() => {
    const fetchUsers = async() => { 
        const allUsers = await userService.getAll()
        setUsers(allUsers)
    } 
    fetchUsers()
   }, [])

   return (
    <div>
        <h2>Users</h2> 
        
        <Table striped>
            <tbody> 
                {users.map(user => {
                    return (<tr key = {user.id}>
                        <td><Link to = {`/users/${user.id}`}>{user.name}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>)
                })}  
            </tbody>
        </Table>
    </div> 
   )
}
export default UsersPage