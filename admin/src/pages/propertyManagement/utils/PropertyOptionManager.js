import saleOption1 from "../../../utils/forms/sale-residential/option1-sale-res-flat-apartment.json";
import saleOption2 from "../../../utils/forms/sale-residential/option2-sale-res-residential-house.json";
import saleOption3 from "../../../utils/forms/sale-residential/option3-sale-res-villa.json";
import saleOption4 from "../../../utils/forms/sale-residential/option4-sale-res-builder-floor-apartment.json";
import saleOption5 from "../../../utils/forms/sale-residential/option5-sale-res-residential-land-plot-.json";
import saleOption6 from "../../../utils/forms/sale-residential/option6-sale-res-penthouse.json";
import saleOption7 from "../../../utils/forms/sale-residential/option7-sale-res-studio-apartment.json";
// Sale- Commercial
import saleOption8 from "../../../utils/forms/sale-commercial/option1-sale-com-office-space.json";
import saleOption9 from "../../../utils/forms/sale-commercial/option2-sale-com-office-it-park-sez.json";
import saleOption10 from "../../../utils/forms/sale-commercial/option3-sale-com-shop.json";
import saleOption11 from "../../../utils/forms/sale-commercial/option4-sale-com-showroom.json";
import saleOption12 from "../../../utils/forms/sale-commercial/option5-sale-com-land.json";
import saleOption13 from "../../../utils/forms/sale-commercial/option6-sale-com-warehouse-godown.json";
import saleOption14 from "../../../utils/forms/sale-commercial/option7-sale-com-industrial-land.json";
import saleOption15 from "../../../utils/forms/sale-commercial/option8-sale-com-industrial-building.json";

class PropertyOptionManager {
  static getFormFieldsBySelectedPropertyType(propertyTypeId = 0) {
    let option;
    const id = propertyTypeId;

    switch (id) {
      case "RESIDENTIAL":
        option = saleOption1;
        break;
      case "COMMERCIAL":
        option = saleOption2;
        break;
      case 3:
        option = saleOption3;
        break;
      case 4:
        option = saleOption4;
        break;
      case 5:
        option = saleOption5;
        break;
      case 6:
        option = saleOption6;
        break;
      case 7:
        option = saleOption7;
        break;
      case 8:
        option = saleOption8;
        break;
      case 9:
        option = saleOption9;
        break;
      case 10:
        option = saleOption10;
        break;
      case 11:
        option = saleOption11;
        break;
      case 12:
        option = saleOption12;
        break;
      case 13:
        option = saleOption13;
        break;
      case 14:
        option = saleOption14;
        break;
      case 15:
        option = saleOption15;
        break;
      default:
        option = saleOption1;
    }

    return option;
  }
}

export default PropertyOptionManager;
