import {useState, useEffect } from "react";
import userService,{ User } from "../services/user-service"


const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  
  

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        console.log(res.data); // Check if data is being logged
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError(err.message);
        setLoading(false);
      });

    return () => cancel(); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);


  return {users,setUsers, error,setError , isLoading,setLoading , newUserName,setNewUserName  , isDarkMode,setIsDarkMode,  isAddingUser,setIsAddingUser };
};

export default useUsers;
