/**
 * Formats a number as currency.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The currency code (e.g., 'USD', 'EUR', 'SAR').
 * @param {string} locale - The locale (e.g., 'en-US', 'ar-SA').
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

// const formatted = formatCurrency(1234.56, "USD", "en-US");
// console.log(formatted);
// Example usage:
