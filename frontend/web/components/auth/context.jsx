import { createContext, useContext } from "react"

export const UserContext = createContext(false)

export const useUser = () => {
  return useContext(UserContext)
}