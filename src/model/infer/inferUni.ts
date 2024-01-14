import {InferRequest, InferResult} from "./model";
import {TUni} from "../term";
import {Val} from "../value";
import {TermUni} from "../../view/TermUni";

export function inferUni(req: InferRequest<TUni>): InferResult {
    // U has type U
    const val: Val = {
        val: 'uni',
    }
    return {
        val,
        element: TermUni({req, type: val})
    }
}