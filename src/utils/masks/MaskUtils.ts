export default class MaskUtils {
  static applyNumberOnlyMask(value: string) {
    return value.replace(/\D/g, '');
  }

  static applyBirthDateMask(value: string) {
    let numberOnly = this.applyNumberOnlyMask(value);

    if (numberOnly.length > 2 && numberOnly.length <= 4) {
      numberOnly = numberOnly.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    } else if (numberOnly.length > 4) {
      numberOnly = numberOnly.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    }

    return numberOnly;
  }

  static applyIsoDateMask = (value: string) => {
    // Verifica se a data está no formato DD/MM/AAAA
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [day, month, year] = value.split('/');
      return `${year}-${month}-${day}`;
    }

    return ''; // Retorna string vazia se o formato for inválido
  };

  static applyIsoDateMaskToIsoDateString = (value: string) => {
    return value.split('T')[0];
  };
}
