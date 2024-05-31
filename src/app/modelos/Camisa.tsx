export class Camisa {
  public codCamisa: number;
  public nombreCamisa: string;
  public codMarcaCamisa: string;
  public tallaCamisa: string;
  public imagenCamisa: string;
  public imagenCamisaBase64: string;

  constructor(
    codc: number,
    nomc: string,
    marc: string,
    tall: string,
    imag: string,
    base: string
  ) {
    this.codCamisa = codc;
    this.nombreCamisa = nomc;
    this.codMarcaCamisa = marc;
    this.tallaCamisa = tall;
    this.imagenCamisa = imag;
    this.imagenCamisaBase64 = base;
  }
}
