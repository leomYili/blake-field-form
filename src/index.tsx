import { Rule, RuleObject, RuleRender } from 'rc-field-form/lib/interface';
import InternalForm, { useForm, FormInstance, FormProps } from './Form';
import Item, { FormItemProps } from './FormItem';
import List, { FormListProps } from './FormList';
import { FormProvider } from './context';

type InternalFormType = typeof InternalForm;

export interface FormInterface extends InternalFormType {
  useForm: typeof useForm;
  Item: typeof Item;
  List: typeof List;
  Provider: typeof FormProvider;
}

const Form = InternalForm as FormInterface;

Form.Item = Item;
Form.List = List;
Form.useForm = useForm;
Form.Provider = FormProvider;

export { FormInstance, FormProps, FormItemProps, FormListProps, Rule, RuleObject, RuleRender };

export default Form;
