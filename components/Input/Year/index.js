import SuggestInput from '../Suggest';

export default props => {
  const options = [];

  if (!props.start) {
    throw new Error('Year input expects a start year');
  }
  if (!props.end) {
    throw new Error('Year input expects an end year');
  }

  for (let i = parseInt(props.start, 10); i <= parseInt(props.end, 10); i++) {
    options.push({
      label: i,
      value: i
    });
  }

  const carriedProps = Object.assign({}, props, {
    start: null,
    end: null
  });

  return (
    <SuggestInput
      options={options}
      defaultSuggestions={options}
      {...carriedProps}
    />
  );
};
