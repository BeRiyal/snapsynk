import { useState } from "react"
import axiosClient from "../config/axios";

const useMutation = ({url , method = "PUT"}) => {
    const [state , setState] = useState({
        isLoading : false,
        error : '',
    });

    const fn = async data => {
        setState(prev => ({
            ...prev, isLoading:true,
        }));

        axiosClient({url, method,data})
        .then(() => {
            setState({ isLoading:false,error:''});
        }) 
        .catch(error => {
            setState({ isLoading:false,error});
        });

    };

    return {mutate:fn ,...state} ;
}

export default useMutation;