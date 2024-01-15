// Quote a value to a term
import {Val} from "../model/value";
import {Term} from "../model/term";
import {quoteUni} from "./uni";
import {quoteApp} from "./app";
import {quoteFunc} from "./func";
import {quotePi} from "./pi";
import {quoteVar} from "./var";
import {quoteNum} from "./num";
import {quoteType} from "./type";
import {quoteAny} from "./any";

export function quote(len: number, val: Val): Term {
    switch (val.val) {
        case 'uni':
            return quoteUni()
        case 'app':
            return quoteApp(len, val)
        case 'func':
            return quoteFunc(len, val)
        case 'pi':
            return quotePi(len, val)
        case 'var':
            return quoteVar(len, val)
        case 'num':
            return quoteNum(val)
        case 'type':
            return quoteType(val)
        case 'any':
            return quoteAny()
    }
}