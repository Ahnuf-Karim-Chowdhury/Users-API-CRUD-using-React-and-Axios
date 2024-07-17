import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import useUsers from "./hooks/useUsers";
import userService , {User} from "./services/user-service";   
 
function App() {
  const {users,setUsers, error,setError , isLoading , newUserName,setNewUserName  , isDarkMode,setIsDarkMode,  isAddingUser,setIsAddingUser } =useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService.delete(user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];
    if (!newUserName.trim()) {
      setError("User name cannot be empty");
      return;
    }

    const newUser = { id: 0, name: newUserName };

    userService.create(newUser)
      .then((res) => {
        setUsers((prevUsers) => [res.data, ...prevUsers]);
        setNewUserName(""); // Clear the input field
        setError(""); // Clear any previous error
        setIsAddingUser(false); // Hide the input field
      })
      .catch((err) => {
        setError(err.message);
        console.error("Error adding user:", err);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user : User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user , name: user.name + '!'};
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));

    userService.update(updatedUser)
    .catch( err => {
      setError(err.message);
      setUsers(originalUsers);
    });
  }

  return (
    <> 
      <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          Toggle Dark Mode
        </button>
      <div className="p-4 min-h-screen">
      <div >
          {isAddingUser ? (
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter user name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <button className="btn btn-primary mt-2" onClick={addUser}>
                Add
              </button>
              <button
                className="btn btn-secondary mt-2 ml-2"
                onClick={() => setIsAddingUser(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-primary mb-3" onClick={() => setIsAddingUser(true)}>
              Add User
            </button>
          )}
        </div>
        {error && <p className="text-danger">{error}</p>}
        {isLoading && (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}



        <ul className="list-group">
          {users.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between dark:bg-dark-card dark:text-dark-text"
            >
              {user.name}
               <div>
               <button 
               className="btn btn-outline-secondary mx-1"
               onClick={()=> updateUser(user)}
               >
                Update
                </button>

              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
               </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
