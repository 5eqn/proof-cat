/********
 SAMPLE
 ********/
import {Term} from "./model/term";

// Sample composition
export const sample: Term = {
    term: 'let',
    id: 'yys',
    body: {
        term: 'num',
        num: 114,
    },
    next: {
        term: 'let',
        id: 'wys',
        body: {
            term: 'num',
            num: 514,
        },
        next: {
            term: 'app',
            func: {
                term: 'func',
                param: [
                    {
                        term: 'type',
                        type: 'number',
                    },
                    {
                        term: 'type',
                        type: 'number',
                    },
                ],
                paramID: [
                    'x',
                    'y',
                ],
                body: {
                    term: 'var',
                    id: 'x',
                    ix: 0
                },
            },
            argIX: [1, 0],
            argID: [
                'x',
                'y',
            ]
        },
    },
}