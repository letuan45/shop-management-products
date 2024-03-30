export class UpdateProductServiceDto {
  constructor(
    name: string,
    image: string,
    status: number,
    importPrice: number,
    exportPrice: number,
    discount: number,
    categoryId: number,
  ) {
    this.name = name;
    this.image = image;
    this.status = status;
    this.importPrice = importPrice;
    this.exportPrice = exportPrice;
    this.discount = discount;
    this.categoryId = categoryId;
  }

  name: string;
  image: string;
  status: number;
  importPrice: number;
  exportPrice: number;
  discount: number;
  categoryId: number;
}
