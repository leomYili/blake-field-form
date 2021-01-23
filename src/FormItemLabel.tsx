import * as React from 'react';
import classNames from 'classnames';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import { Col, ColProps } from 'antd/lib/grid';
import { FormLabelAlign } from './interface';
import { FormContext, FormContextProps } from './context';
import Tooltip, { TooltipProps } from 'antd/lib/tooltip';

export type WrapperTooltipProps = TooltipProps & {
  icon?: React.ReactElement;
};

export type LabelTooltipType = WrapperTooltipProps | React.ReactNode;

function toTooltipProps(tooltip: LabelTooltipType): WrapperTooltipProps | null {
  if (!tooltip) {
    return null;
  }

  if (typeof tooltip === 'object' && !React.isValidElement(tooltip)) {
    return tooltip as WrapperTooltipProps;
  }

  return {
    title: tooltip,
  };
}

export interface FormItemLabelProps {
  colon?: boolean;
  htmlFor?: string;
  label?: React.ReactNode;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  tooltip?: LabelTooltipType;
}

const FormItemLabel: React.FC<FormItemLabelProps & { required?: boolean; prefixCls: string }> = ({
  prefixCls,
  label,
  htmlFor,
  labelCol,
  labelAlign,
  colon,
  required,
  tooltip,
}) => {
  if (!label) return null;

  return (
    <FormContext.Consumer key="label">
      {({
        vertical,
        labelAlign: contextLabelAlign,
        labelCol: contextLabelCol,
        colon: contextColon,
      }: FormContextProps) => {
        const mergedLabelCol: ColProps = labelCol || contextLabelCol || {};

        const mergedLabelAlign: FormLabelAlign | undefined = labelAlign || contextLabelAlign;

        const labelClsBasic = `${prefixCls}-item-label`;
        const labelColClassName = classNames(
          labelClsBasic,
          mergedLabelAlign === 'left' && `${labelClsBasic}-left`,
          mergedLabelCol.className,
        );

        let labelChildren = label;
        // Keep label is original where there should have no colon
        const computedColon = colon === true || (contextColon !== false && colon !== false);
        const haveColon = computedColon && !vertical;
        // Remove duplicated user input colon
        if (haveColon && typeof label === 'string' && (label as string).trim() !== '') {
          labelChildren = (label as string).replace(/[:|：]\s*$/, '');
        }

        // Tooltip
        const tooltipProps = toTooltipProps(tooltip);
        if (tooltipProps) {
          const {
            icon = (
              <span
                style={{
                  marginInlineStart: '4px',
                }}
              >
                <QuestionCircleOutlined />
              </span>
            ),
            ...restTooltipProps
          } = tooltipProps;
          const tooltipNode = (
            <Tooltip {...restTooltipProps}>
              {React.cloneElement(icon, { className: `${prefixCls}-item-tooltip` })}
            </Tooltip>
          );

          labelChildren = (
            <>
              {labelChildren}
              {tooltipNode}
            </>
          );
        }

        const labelClassName = classNames({
          [`${prefixCls}-item-required`]: required,
          [`${prefixCls}-item-no-colon`]: !computedColon,
        });

        return (
          <Col {...mergedLabelCol} className={labelColClassName}>
            <label htmlFor={htmlFor} className={labelClassName} title={typeof label === 'string' ? label : ''}>
              {labelChildren}
            </label>
          </Col>
        );
      }}
    </FormContext.Consumer>
  );
};

export default FormItemLabel;
