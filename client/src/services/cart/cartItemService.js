import Axios from "../apiClient";

export const deleteCartItem = async(id) =>{
   try{
    const response = await Axios.delete(`/cartItems/${id}`);
    return response;
   }
   catch(err){
    throw new Error(err.message)
   }
}