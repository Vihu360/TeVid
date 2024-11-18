// context/userDataDetailsContext.tsx
import { User } from "@/configs/types";
import { createContext } from "react";

interface UserDataContextType {
	userDetail: User | undefined;
	setUserDetail: (value: User | undefined) => void;
}

export const userDataDetailsContext = createContext<UserDataContextType>({
	userDetail: undefined,
	setUserDetail: () => { },
});
