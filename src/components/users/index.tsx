import axios, { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";


const Users = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState();
    const labelStyles = "w-full text-sm";

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/user');
            const data = await res.data;
            setUsers(data.data);
        })()
    }, []);

    const handleDelete = async (user: any) => {
        const res = await axios.delete('/api/user', { data: { userId: user._id } });
        const data = await res.data;
        if (data.status === 200) {
            alert("Deleted successfully")
            window.location.reload();
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            console.log(formData, 111)
            const signupResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`, {
                email: formData.get("email"),
                password: "123456",
                name: formData.get("name"),
                role: formData.get("role"),
            });
            if (signupResponse.status === 200) {
                alert("Created successfully")
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.message;
                setError(errorMessage);
            }
        }
    };

    return (
        <div className="flex gap-12 font-[sans-serif] h-screen w-full">
            <ul className="min-w-[230px] bg-gray-100 inline-block py-5">
                <li id="users"
                    onClick={() => setActiveTab('users')}
                    className={`tab flex items-center text-sm font-semibold hover:text-blue-600 py-5 px-5 ${activeTab === 'users' && "text-blue-600"} cursor-pointer transition-all`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] mr-4" viewBox="0 0 512 512">
                        <path
                            d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                            data-original="#000000"></path>
                    </svg>
                    Users
                </li>
                <li id="addTab"
                    onClick={() => setActiveTab('add')}
                    className={`tab flex items-center text-sm font-semibold bg-white ${activeTab === 'add' && "text-blue-600 hover:text-blue-600"} py-5 px-5 cursor-pointer transition-all`}>
                    <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="w-[18px] mr-4"
                        viewBox="0 0 682.667 682.667">
                        <defs>
                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                            </clipPath>
                        </defs>
                        <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                            <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                                stroke-width="40"
                                d="M256 334.666c-43.446 0-78.667-35.22-78.667-78.667 0-43.446 35.221-78.666 78.667-78.666 43.446 0 78.667 35.22 78.667 78.666 0 43.447-35.221 78.667-78.667 78.667Zm220.802-22.53-21.299-17.534c-24.296-20.001-24.296-57.204 0-77.205l21.299-17.534c7.548-6.214 9.497-16.974 4.609-25.441l-42.057-72.845c-4.889-8.467-15.182-12.159-24.337-8.729l-25.835 9.678c-29.469 11.04-61.688-7.561-66.862-38.602l-4.535-27.213c-1.607-9.643-9.951-16.712-19.727-16.712h-84.116c-9.776 0-18.12 7.069-19.727 16.712l-4.536 27.213c-5.173 31.041-37.392 49.642-66.861 38.602l-25.834-9.678c-9.156-3.43-19.449.262-24.338 8.729l-42.057 72.845c-4.888 8.467-2.939 19.227 4.609 25.441l21.3 17.534c24.295 20.001 24.295 57.204 0 77.205l-21.3 17.534c-7.548 6.214-9.497 16.974-4.609 25.441l42.057 72.845c4.889 8.467 15.182 12.159 24.338 8.729l25.834-9.678c29.469-11.04 61.688 7.561 66.861 38.602l4.536 27.213c1.607 9.643 9.951 16.711 19.727 16.711h84.116c9.776 0 18.12-7.068 19.727-16.711l4.535-27.213c5.174-31.041 37.393-49.642 66.862-38.602l25.835 9.678c9.155 3.43 19.448-.262 24.337-8.729l42.057-72.845c4.888-8.467 2.939-19.227-4.609-25.441z"
                                data-original="#000000"></path>
                        </g>
                    </svg>
                    Add new user
                </li>
            </ul>
            <div className="tab-content-container w-full">
                <div id="usersContent" className={`tab-content w-full ${activeTab === 'users' ? 'block' : 'hidden'} mt-8`}>
                    <h4 className="text-lg font-bold text-gray-600">Users</h4>
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="text-left">
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user: any) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td><button className="text-red-500" onClick={() => handleDelete(user)}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div id="addContent" className={`tab-content max-w-2xl ${activeTab === 'add' ? 'block' : 'hidden'} mt-8`}>
                    <h4 className="text-lg font-bold text-gray-600">Add New User</h4>
                    <section>
                        <form
                            onSubmit={handleSubmit}>
                            {error && <div className="">{error}</div>}
                            <h1 className="mb-5 w-full text-2xl	font-bold"></h1>
                            <div className="mt-5">
                                <label className={labelStyles}>User Name:</label>
                                <input
                                    type="text"
                                    placeholder="Fullname"
                                    className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded  text-[13px]"
                                    name="name"
                                />
                            </div>
                            
                            <div className="mt-5">
                                <label className={labelStyles}>Email:</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded  text-[13px]"
                                    name="email"
                                />
                            </div>
                            
                            <div className="mt-5 mb-5">
                                <label className={labelStyles}>Role:</label>
                                <select id="role" name="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Choose a role</option>
                                    <option value="editor" defaultValue={"editor"}>Editor</option>
                                    <option value="access">Access</option>
                                    <option value="auditor">Auditor</option>
                                </select>
                            </div>        
                            
                            <button className="w-full  border border-solid border-[#242424] py-1.5 mt-2.5 rounded
        transition duration-150  text-[13px]">
                                Save
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Users;

function useSWR(apiClinicUrl: string, fetcher: any): { data: any; error: any; } {
    throw new Error("Function not implemented.");
}
