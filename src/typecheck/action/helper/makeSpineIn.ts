// Make spine
import { Val } from "../../model/value";

export const makeSpineIn = (len: number) => (_: string, ix: number) => ({
  val: 'var',
  lvl: len - ix - 1,
} as Val)
