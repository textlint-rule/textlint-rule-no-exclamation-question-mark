// LICENSE : MIT
"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
import rule from "../src/textlint-rule-no-exclamation-question-mark";
// ruleName, rule, { valid, invalid }
tester.run("no-exclamation-question-mark", rule, {
    valid: [
        {
            text: "text!?！？",
            options: {
                allowFullWidthExclamation: true,
                // allow to use !
                allowHalfWidthExclamation: true,
                // allow to use ？
                allowFullWidthQuestion: true,
                // allow to use ?
                allowHalfWidthQuestion: true
            }
        },
        "Yahoo!"
    ],
    invalid: [
        // single match
        {
            text: "Hey!",
            errors: [
                {
                    message: `Disallow to use "!".`,
                    line: 1,
                    column: 4
                }
            ]
        },
        // multiple match in multiple lines
        {
            text: "Hey!?\nHey！？",
            errors: [
                {
                    message: `Disallow to use "!".`,
                    line: 1,
                    column: 4
                },
                {
                    message: `Disallow to use "?".`,
                    line: 1,
                    column: 5
                },
                {
                    message: `Disallow to use "！".`,
                    line: 2,
                    column: 4
                },
                {
                    message: `Disallow to use "？".`,
                    line: 2,
                    column: 5
                }
            ]
        },
        // multiple hit items in a line
        {
            text: "Hey!?",
            errors: [
                {
                    message: `Disallow to use "!".`,
                    line: 1,
                    column: 4
                },
                {
                    message: `Disallow to use "?".`,
                    line: 1,
                    column: 5
                }
            ]
        },
        // Allow Option: !
        {
            text: "Hey!?",
            options: {
                allowHalfWidthExclamation: true
            },
            errors: [
                {
                    message: `Disallow to use "?".`,
                    line: 1,
                    column: 5
                }
            ]
        }
    ]
});