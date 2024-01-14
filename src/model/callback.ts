// Callback of code actions
import {DraftFunction} from "use-immer";

export type Callback<T> = (updater: DraftFunction<T>) => void