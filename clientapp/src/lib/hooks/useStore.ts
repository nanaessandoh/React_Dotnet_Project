import { useContext } from "react"
import { StoreContext } from "../stores/store";

export const useStore = () => {
    return useContext(StoreContext);
}