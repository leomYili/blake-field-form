import { Rule, RuleObject, RuleRender } from 'rc-field-form/lib/interface';
import InternalForm, { useForm, FormInstance, FormProps } from './Form';
import Item, { FormItemProps } from './FormItem';
import ErrorList, { ErrorListProps } from './ErrorList';
import List, { FormListProps } from './FormList';
import { FormProvider } from './context';

type InternalFormType = typeof InternalForm;

export interface FormInterface extends InternalFormType {
  useForm: typeof useForm;
  Item: typeof Item;
  List: typeof List;
  ErrorList: typeof ErrorList;
  Provider: typeof FormProvider;
}

const Form = InternalForm as FormInterface;

Form.Item = Item;
Form.List = List;
Form.ErrorList = ErrorList;
Form.useForm = useForm;
Form.Provider = FormProvider;

export { FormInstance, FormProps, FormItemProps, ErrorListProps, Rule, RuleObject, RuleRender, FormListProps };

export default Form;
