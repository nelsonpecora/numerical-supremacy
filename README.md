# numerical-supremacy

A small web app that allows the user to query the difference between:

1. the sum of the squares of the first `n` natural numbers
2. the square of the sum of the same first `n` natural numbers

`n` is defined as any integer greater than 0 and less than or equal to 100.

## Installation

```bash
git clone git@github.com:nelsonpecora/numerical-supremacy.git
cd numerical-supremacy
npm start
```

## Usage

Enter a number between 1 and 100 into the form and press enter (or click the submit button). The app will send a (fake) API call to the server, which will handle the heavy lifting of the two calculations (sum-of-the-squares and square-of-the-sum) then find and return the difference between the resulting values.

For example, the sum of the squares of the first ten natural numbers is:

```
1^2 + 2^2 + ... + 10^2 = 385
```

The square of the sum of the first ten natural numbers is:

```
(1 + 2 + ... + 10)^2 = 3025
```

The difference between those values is `2640`, which will be displayed underneath the form.

## Tests

Tests are run with `npm test`. As the calculations are intended to be performed on the server-side, I've elected to split each of them into separate files to represent how their functionality might be spread across different modules.
