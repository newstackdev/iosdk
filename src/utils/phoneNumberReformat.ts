import { FormInstance } from "antd";

export const phoneNumberReformat = (values: React.ChangeEvent<HTMLInputElement>, form: FormInstance<any>) => {
  if (!values.target.value.includes("+") && values.target.value.length > 0) {
    form.setFieldsValue({
      // phone matching the Form.item name - needs to be exact
      phone: "+" + values.target.value,
    });
  }
};
