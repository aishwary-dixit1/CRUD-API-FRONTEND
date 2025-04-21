import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

export const rechargeCredits = async (email: string) => {
  try {
    const response = await api.post("/api/credits", { email })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
    throw new Error("Failed to recharge credits")
  }
}
