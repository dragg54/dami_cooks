import Axios from "../apiClient";

export const getUnreadNotifications = async() =>{
   try{
    const response = await Axios.get(`/notifications`);
    return response;
   }
   catch(err){
    throw new Error(err.message)
   }
}

export const updateNotificationStatus = async(formData) =>{
    try{
        const response = await Axios.put(`/notifications`, {notifications: formData});
        return response;
       }
       catch(err){
        throw new Error(err.message)
       }
}