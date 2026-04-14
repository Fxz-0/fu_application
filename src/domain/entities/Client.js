export class Client {
  constructor({
    id,
    expediente,
    documentNumber,
    paternalLastName,
    maternalLastName,
    firstName,
    secondName,
    ruc,
    businessName,
    jefeBBVA,
    createdAt,
    updatedAt
  }) {
    this.id = id
    this.expediente = expediente
    this.documentNumber = documentNumber
    this.paternalLastName = paternalLastName
    this.maternalLastName = maternalLastName
    this.firstName = firstName
    this.secondName = secondName
    this.ruc = ruc
    this.businessName = businessName
    this.jefeBBVA = jefeBBVA
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  get fullName() {
    return `${this.paternalLastName} ${this.maternalLastName} ${this.firstName} ${this.secondName || ''}`.trim()
  }

  isValid() {
    return this.documentNumber && this.paternalLastName && this.firstName
  }
}
