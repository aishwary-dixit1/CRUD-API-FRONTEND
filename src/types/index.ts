export interface User {
    id: string
    name: string
    email: string
    apiKey: string
    apiUrl: string
    credits: number
    recharged: boolean
  }
  
  export interface ApiResponse {
    message: string
    [key: string]: any
  }
  