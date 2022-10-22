import { useEffect, useContext, React} from 'react';
import { AppContext } from '../Context/AppContext';
import axios from "axios";
import '../styles/left.css';

const LeftSide = () => {
    const { 
            users, setUsers, 
            selectedId, setSelectedId, 
            setSelectedUser
          } = useContext(AppContext)
    
    useEffect(() => {
        const FetchUsers = async () => {
           await axios.get("https://my-json-server.typicode.com/tsevdos/epignosis-users/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error.response);
            })
        }
        FetchUsers();
    },[setUsers])

    const handleClick = (user) => {
        setSelectedUser(user);
        setSelectedId(user.id);
    };
    
      const getSelectedUser = (id) => (
        selectedId === id ? "selected" : ""
    );

  return (
    <div className='leftSide'>
            <ul>
                {
                    users.map((user) => (
                        <li key={user.id}>
                            <div  className={`list-item ${getSelectedUser(user.id)}`}
                                    onClick={() => handleClick(user)}>
                                <div className='avatar'>
                                    <img src={`${user.photo}`} alt=''/>
                                </div>
                                <div className='user-details'>
                                    <span>{user.name}</span>
                                    <span className='email'>{user.email}</span>
                                </div>
                            </div>
                           
                        </li>
                    ))
                }
            </ul>
    </div>
  )
}

export default LeftSide