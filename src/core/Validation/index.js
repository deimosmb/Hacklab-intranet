export const validate = ({ name, value, rules, errors }, n = 0) => {
  const rule = rules[name];
  if (rule) {
    if (rule[n](value)) {
      return (errors[name] = rule[n](value));
    }
    errors[name] = null;
    if (n < rule.length - 1)
      return validate({ name, value, rules, errors }, ++n);
  }
  return (errors[name] = null);
};

export const min = (v, l, t) =>
  v.trim().length <= l
    ? t ?? `De tekst moet minimaal uit ${l} tekens bestaan!`
    : null;

export const max = (v, l, t) =>
  v.trim().length >= l
    ? t ?? `De tekst mag maximaal uit ${l} tekens bestaan!`
    : null;

export const required = (v, t) =>
  v.trim().length === 0 ? t ?? "Je moet wel iets invullen!" : null;

export const phonenumber = (v) =>
  !v.match(
    // eslint-disable-next-line no-useless-escape
    /^[\+]?[(]?[0-9]{2,4}[)]?[-\s\.]?[0-9]{2,3}?[-\s\.]?[0-9]{2,3}?[-\s\.]?[0-9]{2,3}$/
  ) || !v.replace(/-| /g, "").match(/^[0-9]{10}$/)
    ? "Het moet wel een geldig telefoonnummer zijn, zoals 06-12345678"
    : null;

export const email = (v) =>
  !v.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ? "het moet een geldig e-mailadres zijn!"
    : null;

export const itCanBeEmtpty = (v, ...callback) => {
  if (v.trim().length > 0) {
    for (let c = 0; c < callback.length; c++) {
      if (callback[c]() !== null) {
        return callback[c]();
      }
    }
  }
};
