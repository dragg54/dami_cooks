const emailRateMap = new Map();

export const canSendEmailMemory = (email, limit = 10, windowMs = 3600000, emailType) => {
  const now = Date.now();
  const records = emailRateMap.get(email) || [];

  const valid = records.filter(t => now - t < windowMs && emailType == t.emailType);

  if (valid.length >= limit) return false;

  valid.push(now);
  emailRateMap.set(email, valid);
  return true;
};
