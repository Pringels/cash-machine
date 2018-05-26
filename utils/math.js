module.exports = {
  isDivisibleBy: numerator => denominator => numerator % denominator === 0,
  isPositiveFloat: n =>
    !Number.isNaN(parseFloat(n)) && Number.isFinite(n) && n > 0
}
