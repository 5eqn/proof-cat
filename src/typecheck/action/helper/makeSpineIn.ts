// Make spine
import {Val} from "../../model/value";

export const makeSpineIn = (len: number) => (id: string, ix: number) => ({
    val: 'var',
    id,
    lvl: len - ix - 1,
} as Val)