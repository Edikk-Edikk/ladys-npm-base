const setValue = ([field, value], state, { changeValue }) => {
  changeValue(state, field, () => value);
  // eslint-disable-next-line
  state.formState.active = field;
};

export { setValue };
