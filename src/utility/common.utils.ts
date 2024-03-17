import { randomBytes } from 'crypto';
import { generate } from 'rxjs';

export const generateSKU = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const genDigit = randomBytes(3).toString('hex');
  const sku = `CRATOR${year}${month}${genDigit}`;

  return sku;
};
