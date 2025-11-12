import { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { userReducer, initialUserState } from "../reducers/userReducer";
import * as api from "../services/api";


const UserStateContext = createContext();
const UserDispatchContext = createContext();


export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialUserState);

    const fetchUsers = useCallback(async () => {
        dispatch({ type: "START_LOADING" });
        try {
            const data = await api.getUsers();
            dispatch({ type: "SET_USERS", payload: data });
        } catch (error) {
            console.error("❌ Lỗi khi tải users:", error);
            dispatch({ type: "SET_ERROR", payload: error.message });
        }
    }, []);

    const fetchUserById = useCallback(async (id) => {
        dispatch({ type: "START_LOADING" });
        try {
            const data = await api.getUserById(id);
            dispatch({ type: "SET_USER", payload: data });
        } catch (error) {
            console.error("❌ Lỗi khi tải user by id:", error);
            dispatch({ type: "SET_ERROR", payload: error.message });
        }
    }, []);

    const createUser = useCallback(async (newUser) => {
        dispatch({ type: "START_LOADING" });
        try {
            const data = await api.createUser(newUser);
            dispatch({ type: "ADD_USER", payload: data });
        } catch (error) {
            console.error("❌ Lỗi khi thêm user:", error);
            dispatch({ type: "SET_ERROR", payload: error.message });
        }
    }, []);

    const updateUser = useCallback(async (id, updatedData) => {
        dispatch({ type: "START_LOADING" });
        try {
            const data = await api.updateUser(id, updatedData);
            dispatch({ type: "UPDATE_USER", payload: data });
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật user:", error);
            dispatch({ type: "SET_ERROR", payload: error.message });
        }
    }, []);

    const updateUserStatus = useCallback(async (id, updatedData) => {
      dispatch({ type: "START_LOADING" });
      try {
        await api.updateUser(id, updatedData); // chỉ cần gọi API, không cần lấy data
        dispatch({
          type: "UPDATE_USER_STATUS",
          payload: {
            id,
            status: updatedData.status,
          },
        });
      } catch (error) {
        console.error("❌ Lỗi khi cập nhật status user:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    }, []);


    const deleteUser = useCallback(async (id) => {
        dispatch({ type: "START_LOADING" });
        try {
            const data = await api.deleteUser(id);
            dispatch({ type: "DELETE_USER", payload: data });
        } catch (error) {
            console.error("❌ Lỗi khi xóa user:", error);
            dispatch({ type: "SET_ERROR", payload: error.message });
        }
    }, []);


    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (    
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={{
                dispatch,
                fetchUsers,
                fetchUserById,
                createUser,
                updateUser,
                deleteUser,
                updateUserStatus,
            }}>
      {children}
    </UserDispatchContext.Provider>
  </UserStateContext.Provider>
);
};

export const useUserState = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);