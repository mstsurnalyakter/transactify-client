import axios from "axios"

export const axiosCommon = axios.create({
    baseURL:import.meta.env.VITE_URL,
})

const useAxiosCommon = props => {
  return axiosCommon;
}



export default useAxiosCommon