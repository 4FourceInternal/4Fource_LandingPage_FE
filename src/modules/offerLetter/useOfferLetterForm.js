import { useState, useCallback } from 'react';
import { createDefaultOfferLetterData } from './defaults';
import { validateOfferLetterData } from './validateOfferLetter';

/**
 * @param {Partial<import('./types').OfferLetterData>} [initialData]
 */
export const useOfferLetterForm = (initialData = {}) => {
  const [data, setData] = useState(() => ({
    ...createDefaultOfferLetterData(),
    ...initialData,
  }));
  const [errors, setErrors] = useState({});

  const setField = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const resetForm = useCallback(() => {
    setData({ ...createDefaultOfferLetterData(), ...initialData });
    setErrors({});
  }, [initialData]);

  const validate = useCallback(() => {
    const result = validateOfferLetterData(data);
    setErrors(result.errors);
    return result.isValid;
  }, [data]);

  return { data, setField, setData, errors, resetForm, validate };
};

export default useOfferLetterForm;
