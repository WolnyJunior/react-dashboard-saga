import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

//Hook tipado do dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

//Hook tipado para selectors(evita ter que passar RootState manualmente)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector