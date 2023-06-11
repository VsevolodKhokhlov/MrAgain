import get from "lodash/get";
import { useCallback, useEffect } from "react";

import {
  ErrorWrap,
  FieldWrap,
  FieldWrapAdmin,
} from "@/components/styled/Forms";

import { useFormContext } from ".";

export function parseNativeEvent(ev) {
  if (!ev?.target) {
    return ev;
  }

  if (["checkbox", "radio"].includes(ev.target.type)) {
    return typeof ev.target.value !== "undefined"
      ? ev.target.value
      : ev.target.checked;
  }

  return ev.target.value;
}

export function Field({
  name,
  label,
  noBorder,
  flexRow,
  simple,
  adminInput = false,
  optional = false,
  children,
  as = "input",
  style,
  disabled,
  ...rest
}) {
  const { state, actions } = useFormContext();
  const { errors, values } = state;
  const { validateField, onFieldChange } = actions;

  const error = get(errors, name);
  const value = get(values, name);

  const onChange = useCallback(
    (ev) => {
      const value = parseNativeEvent(ev);
      onFieldChange({ name, value });
    },
    [name, onFieldChange]
  );

  const onBlur = useCallback(() => {
    validateField({ name });
  }, [name, validateField]);

  const Component = as;

  if (simple) {
    return (
      <Component value={value} onChange={onChange} onBlur={onBlur} {...rest}>
        {children}
      </Component>
    );
  }

  if (adminInput) {
    return (
      <FieldWrapAdmin
        disabled={disabled}
        noBorder={noBorder}
        flexRow={flexRow}
        style={style}
      >
        {label ? (
          <label>
            {label}
            {optional ? "(Optional)" : ""}
          </label>
        ) : null}
        <Component
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          {...rest}
        >
          {children}
        </Component>
        {error ? <ErrorWrap>{error}</ErrorWrap> : null}
      </FieldWrapAdmin>
    );
  }

  return (
    <FieldWrap style={style} disabled={disabled}>
      {label ? (
        <label>
          {label}
          {optional ? "(Optional)" : ""}
        </label>
      ) : null}
      <Component
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      >
        {children}
      </Component>
      {error ? <ErrorWrap>{error}</ErrorWrap> : null}
    </FieldWrap>
  );
}

Field.FieldWrap = FieldWrap;

export function SyncFormValues({ onChange }) {
  const { state } = useFormContext();
  const values = state.values;
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
}

export function ReadValue({ name }) {
  const { state } = useFormContext();
  const { values } = state;
  const value = get(values, name);

  return value;
}
